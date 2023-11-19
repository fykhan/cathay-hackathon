import os
import openai

def getResponse(query):
    #initializing the information for the chatbot api
    openai.api_type = "azure"
    openai.api_key = os.getenv("AZURE_OPENAI_KEY")
    openai.api_base = os.getenv("AZURE_OPENAI_ENDPOINT")
    openai.api_version = "2023-05-15"
    #a message object is created to be passed on to the chatbot
    messages = [
        {
            "role": "user", "content": query,
        },
        {
		    "role": "system",
		    "content": "You are a travel assistant for cathay pacific who works in the cathay meta verse world developed by team Jetstream Innovation. Act like a Travel Assistant and give directions and provide suggestions as if you're a living person." 
	    },
    ]
    
    #chatbot api processes the query and returns the output 
    chat_completion = openai.ChatCompletion.create(
        deployment_id="testing",
        model="gpt-35-turbo",
        messages=messages, 
        temperature=0.7, 
        max_tokens=1024, 
        n=1)

    chat_content = chat_completion.choices[0].message.content
    #the answer is returned to the function caller
    return chat_content

if __name__ == '__main__':
    print(getResponse(input()))
