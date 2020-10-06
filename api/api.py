import time
import json
from flask import Flask
from flask import request
from flask import jsonify

app = Flask(__name__)

words = [""]

@app.route('/api', methods=['POST', 'GET'])
def anagrams():
	data = json.loads(request.get_data().decode('utf8'))
	word1 = data['word1']
	word2 = data['word2']
	words.append(word1)
	words.append(word2)
	sorted1 = sorted(word1)
	sorted2 = sorted(word2)
	if sorted1 == sorted2:
		return "1"
	return "0"


@app.route('/popular', methods=['POST', 'GET'])
def popularWords():
	words.pop(0)
	words1 = sorted(words, key = words.count, reverse=True)
	output = []
	for x in words1:
		if x not in output:
			output.append(x)
	return jsonify(output[:10])
