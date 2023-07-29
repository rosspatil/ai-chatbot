# Dockerized AI Chatbot

[![License](https://img.shields.io/badge/License-Apache2.0-blue.svg)](LICENSE)

## Description

Dockerized AI Chatbot is an open-source project that provides a chatbot powered by artificial intelligence, specifically built using OpenAI's GPT-3 (Language Model) for natural language processing and understanding. The chatbot leverages Qdrant as a vector space index for efficient semantic search and similarity matching, resulting in more accurate responses.

Please note that before running the Docker container, users are required to prepare the vector space data using Qdrant. The prepared vector space data should be made available for the chatbot to access during its runtime.

The Dockerized AI Chatbot maintains the context of conversations for up to 600 seconds (10 minutes). This means that the chatbot can retain information about the ongoing conversation, allowing for more coherent and relevant responses.

This project aims to make it easy for developers to deploy and use a conversational AI system in their applications, websites, or platforms. By packaging the chatbot as a Docker container, it simplifies the deployment process, making it convenient to integrate into various environments.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)

## Installation

To run the Dockerized AI Chatbot, you must have Docker installed on your machine. If you don't have Docker yet, you can download and install it from the official website: [https://www.docker.com/](https://www.docker.com/)

Once Docker is installed, you can pull the chatbot image from Docker Hub using the following command:

```bash
docker pull roshanpatil/ai-chatbot:latest
```

## Usage

Before running the chatbot, ensure that you have already prepared the vector space data using Qdrant. Once you have the vector space data ready, you can start the AI chatbot using the following command:

```bash
docker run -p 8080:8080 --env-file .env roshanpatil/ai-chatbot:latest
```

Once the container is running, open the chatbot interface by visiting the following link in your web browser: <http://localhost:8080>

## Configuration

To Dockerized AI Chatbot, you need to prepare `.env` file with proper values in it.

| Environment Variable         | Description                          |
|------------------------------|--------------------------------------|
|  DOMAIN                      |  This is domain for which chat bot will operate.                           This will not generate answer beyond it |
|  OPENAI_API_TYPE             |  Type of OPEN AI type |
|  OPENAI_API_BASE             |  OPEN AI API host     |
|  OPENAI_API_KEY              |  OPEN AI API Key           |
|  OPENAI_API_VERSION          |  OPEN AI API Version        |
|  QDRANT_URL                  |  Qdrant Cluster URL            |
|  QDRANT_API_KEY              |  Qdrant API Key            |
|  QDRANT_COLLECTION_NAME      |  Name of collection in vector  |

## License

This project is licensed under the Apache License.
