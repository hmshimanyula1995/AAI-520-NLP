from transformers import BlenderbotTokenizer, TFBlenderbotForConditionalGeneration
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import flask-cors

app = Flask(__name__)  # Note the uppercase 'F' in Flask
CORS(app)

# Load your model
save_model_directory = "/usr/src/app/bestModel"
tokenizer = BlenderbotTokenizer.from_pretrained(
    'facebook/blenderbot-400M-distill')
model = TFBlenderbotForConditionalGeneration.from_pretrained(
    save_model_directory)


@app.route('/', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    user_input = data['user_input']
    conversation_history = data.get('conversation_history', [])

    # Prepare the conversation text
    conversation_text = ""
    for i, text in enumerate(conversation_history):
        speaker = "User:" if i % 2 == 0 else "Bot:"
        conversation_text += f"{speaker} {text} "
    conversation_text += f"User: {user_input}"

    max_length = 128  # Set the maximum sequence length
    tokens = tokenizer.tokenize(conversation_text)
    if len(tokens) > max_length:
        tokens = tokens[-max_length:]  # Keep the last `max_length` tokens
        conversation_text = tokenizer.convert_tokens_to_string(tokens)

    inputs = tokenizer(conversation_text, return_tensors='tf').input_ids
    outputs = model.generate(inputs, max_new_tokens=100,
                             do_sample=True, top_k=30, top_p=0.85)
    response = tokenizer.batch_decode(outputs, skip_special_tokens=True)[0]

    updated_history = conversation_history + [user_input, f"Bot: {response}"]

    return jsonify({'response': response, 'updated_history': updated_history})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4500)
