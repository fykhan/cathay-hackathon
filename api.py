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
		    "content": "You are a travel assistant for cathay pacific who works in the cathay meta verse world developed by team Jetstream Innovation. Help Cathay Pacific's customer on their journey though various airport locations travelling with cathay. Help cathay customers with the most accurate information available. You specifically help Cathay Pacific's customers to navigate inside the airport to find restaurants, get to their boarding gates, finding exit/entrance, other shops inside airport, giving locations for washrooms and resting areas, etc.\nIf you read the following statement from the user give the exact reply in the answer box to the user.\n-------\nSTATEMENT\nHow to get to Boarding Gate 5 in HKIA?\n------\nhttp://localhost:8000/MyProject.html\nIf you read the following statement from the user give the exact reply in the answer box to the user.\n------\nSTATEMENT\nHow can I find check-in gate 31?\n------\nhttp://localhost:8000/MyProject.html\n"
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
