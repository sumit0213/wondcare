from flask import Flask, request, jsonify
from wound_analyzer import WoundAnalyzer
import cv2
import numpy as np

app = Flask(__name__)
analyzer = WoundAnalyzer()

@app.route('/analyze-wound', methods=['POST'])
def analyze_wound():
    file = request.files['image']
    image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    mask = analyzer.segment_wound(image)
    analysis = analyzer.analyze_wound_color(image, mask)
    return jsonify(analysis)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)