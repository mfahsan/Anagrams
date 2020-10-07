import time
import json
from flask import Flask
from flask import request
from flask import jsonify

app = Flask(__name__)


# global variable for popular words 
words = [""]


# this function returns whether the words sent through api call are anagrams 
@app.route('/api', methods=['POST', 'GET'])
def anagrams():
	data = json.loads(request.get_data().decode('utf8'))
	word1 = data['word1'] #extract word 1
	word2 = data['word2'] #extract word 2
	words.append(word1)  
	words.append(word2)
	sorted1 = sorted(word1) #sort word 1
	sorted2 = sorted(word2)	#sort word 2 
	if sorted1 == sorted2: # return "1" if the sorted words are exactly the same
		return "1"
	return "0"


# this function 
@app.route('/popular', methods=['POST', 'GET'])
def popularWords():
	words.pop(0)
	words1 = sorted(words, key = words.count, reverse=True) # sort by frequency of words 
	output = []
	for x in words1:										# remove duplicates
		if x not in output:
			output.append(x)
	return jsonify(output[:10])								# return the first 10
