import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_caption(prompt):
    response = client.chat.completions.create(
        model="llama3-70b-8192",  # ✅ LLaMA 3 model
        messages=[
            {
                "role": "system",
                "content": "You are a creative social media expert. Write short, viral captions with emojis and hashtags.",
            },
            {
                "role": "user",
                "content": f"Write a caption for this social media post: {prompt}",
            },
        ],
        temperature=0.7,
        max_tokens=100,
    )
    return response.choices[0].message.content.strip()

