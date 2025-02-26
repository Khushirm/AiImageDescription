from flask import Flask, render_template, request
import google.generativeai as genai
import markdown
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

genai.configure(api_key=os.getenv("API_KEY"))
model = genai.GenerativeModel('gemini-2.0-flash')


@app.get("/")
def homepage():
    return render_template("index.html")


@app.post("/api/generate-description")
def generateDescription():
    base64 = request.get_json()["image"]

    response = model.generate_content(["Describe this image", {"inline_data": {
                                      "data": base64, "mime_type": "image/png"}}])

    return {"description": markdown.markdown(response.text)}


if __name__ == "__main__":
    app.run(debug=True)
