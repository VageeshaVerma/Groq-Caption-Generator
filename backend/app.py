from flask import Flask, request, jsonify
from flask_cors import CORS
from caption_generator import generate_caption

# ✅ First define the app
app = Flask(__name__)
CORS(app, resources={r"/generate": {"origins": "*"}})

# ✅ Then add route
@app.route('/generate', methods=['POST'])
def generate():
    try:
        data = request.get_json()

        if not data or 'prompt' not in data:
            return jsonify({'error': 'Prompt is required'}), 400

        prompt = data['prompt']
        caption = generate_caption(prompt)
        return jsonify({'caption': caption})
    
    except Exception as e:
        print(f"🔥 ERROR: {e}")
        return jsonify({'error': str(e)}), 500

# ✅ Entry point
if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)






