from transformers import BlenderbotTokenizer, TFBlenderbotForConditionalGeneration
import tensorflow as tf
import flask

app = flask.Flask(__name__)

# Load your model
save_model_directory = "/usr/src/app/bestModel"
tokenizer = BlenderbotTokenizer.from_pretrained(
    'facebook/blenderbot-400M-distill')
model = TFBlenderbotForConditionalGeneration.from_pretrained(
    save_model_directory)


@app.route('/predict', methods=['POST'])
def predict():
    user_input = flask.request.json['user_input']
    inputs = tokenizer(user_input, return_tensors='tf').input_ids
    outputs = model.generate(inputs, max_new_tokens=100,
                             do_sample=True, top_k=30, top_p=0.85)
    response = tokenizer.batch_decode(outputs, skip_special_tokens=True)[0]
    return flask.jsonify({'response': response})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000)
