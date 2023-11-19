import os
import openai
from dotenv import load_dotenv, dotenv_values

print(dotenv_values('.env'))

def getResponse(query):
    openai.api_type = "azure"
    openai.api_key = os.getenv("AZURE_OPENAI_KEY")
    openai.api_base = os.getenv("AZURE_OPENAI_ENDPOINT")
    openai.api_version = "2023-05-15"
    messages = [
        {'role' : 'user', 'content' : query }
    ]

    chat_completion = openai.ChatCompletion.create(
        deployment_id="testing",
        model="gpt-35-turbo",
        messages=messages, 
        temperature=0.7, 
        max_tokens=1024, 
        n=1)

    chat_content = chat_completion.choices[0].message.content
    return chat_content


if __name__ == '__main__':
    getResponse(input())