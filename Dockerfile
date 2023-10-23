# Use a basic Python image as a base image
FROM python:3.7-slim

# Install TensorFlow and other necessary libraries
RUN pip install tensorflow==2.10.0 transformers flask

#Install Flask Cors
RUN pip install flask-cors

# Set the working directory in the container to /usr/src/app
WORKDIR /usr/src/app

# Expose the port the app runs on
EXPOSE 4500 

# Copy your model and other necessary files to the working directory
COPY ./bestModel /usr/src/app/bestModel
COPY entrypoint.py /usr/src/app/entrypoint.py

# Set the environment variable for Flask
ENV FLASK_APP=entrypoint.py

# Set the command to run your entry script
CMD ["python", "entrypoint.py"]