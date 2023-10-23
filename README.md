# AAI-520-NLP

# Project Title: AI Chatbot with Ubuntu Dialogue Corpus

## Overview

This repository hosts the code and related files for an AI chatbot powered by a model trained on the Ubuntu Dialogue Corpus. The chatbot leverages a transformer architecture via the Hugging Face library, specifically using the Blenderbot model. The trained model is containerized and hosted on AWS ECS, with traffic management handled by AWS ELB.

## Repository Structure

- `app/` - Contains the main application code for the chatbot.
- `docker/` - Dockerfile for containerizing the trained model.
- `docs/` - Additional documentation including the detailed architecture diagram.

## Dataset

The model is trained on the Ubuntu Dialogue Corpus, a large dataset containing over one million two-person conversations extracted from Ubuntu chat logs, used to train models for natural language understanding and dialogue. The dataset is accessed from the Hugging Face dataset library.

### Dataset Preparation and Usage

1. **Import Dataset**: The Ubuntu Dialogue Corpus is imported from its source.
2. **Preprocessing**: Includes converting dataframes to datasets, initializing the tokenizer and model, applying the tokenizer, and preparing the data for the model.
3. **Tokenization**: The tokenizer used is the `BlenderbotTokenizer`, and the tokenization process includes handling of decoder inputs and labels necessary for the seq2seq model.

## Model

The core of the chatbot is a model trained using the transformer architecture from Hugging Face. The specific pre-trained model utilized is `facebook/blenderbot-400M-distill`. The model training scripts handle the initialization of the tokenizer, model, data collator, and the application of tokenization to the datasets.

## AWS Deployment

The trained model is containerized using Docker and then deployed to an AWS ECS cluster. An Elastic Load Balancer (ELB) is set up in front of the ECS cluster to route incoming traffic across the deployed model instances efficiently.

## Evaluation

The model is evaluated using various metrics, including accuracy, precision, recall, and f1 score. The confusion matrix is also generated to understand the model's performance in different scenarios

## Acknowledgments

- Hugging Face for the [transformers library](https://huggingface.co/transformers/) and the [Ubuntu Dialogue Corpus](https://huggingface.co/datasets/ubuntu_dialogs_corpus)
- AWS for hosting and deployment services
