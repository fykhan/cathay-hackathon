from flask import Flask, render_template, request, jsonify
import api
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    user_input = request.json['user_input']
    
    response = process_input(user_input)
    return jsonify({'response': response})

def process_input(user_input):

    return api.getResponse(user_input)

if __name__ == '__main__':
    app.run(debug=True)