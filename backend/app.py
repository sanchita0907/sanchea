from flask import Flask, send_from_directory, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
import os


# =========================================================
# SANCHÉA PROJECT
# =========================================================

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)


# =========================================================
# LOAD .ENV
# =========================================================

ENV_PATH = os.path.join(
    BASE_DIR,
    ".env"
)

load_dotenv(ENV_PATH)


# =========================================================
# OPENAI CLIENT
# =========================================================

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:

    raise RuntimeError(
        "OPENAI_API_KEY was not found in .env"
    )


client = OpenAI(
    api_key=api_key
)


# =========================================================
# FLASK APP
# =========================================================

app = Flask(__name__)


# =========================================================
# HOME PAGE
# =========================================================

@app.route("/")
def home():

    return send_from_directory(
        BASE_DIR,
        "index.html"
    )


# =========================================================
# CHATGPT / SANCHÉA AI API
# =========================================================

@app.route(
    "/api/chat",
    methods=["POST"]
)
def chat():

    try:

        data = request.get_json()

        if not data:

            return jsonify({
                "error": "No JSON data received."
            }), 400


        user_message = data.get(
            "message",
            ""
        ).strip()


        if not user_message:

            return jsonify({
                "error": "Message is empty."
            }), 400


        # =================================================
        # OPENAI RESPONSE
        # =================================================

        response = client.responses.create(

            model="gpt-5.6-luna",

            instructions="""
You are SANCHÉA AI, a friendly and intelligent
personal beauty and lifestyle assistant.

You can help with:
- skincare
- haircare
- makeup
- grooming
- college looks
- office-ready appearance
- beauty routines
- confidence and presentation
- general lifestyle questions

Speak naturally like a helpful AI assistant.

Keep answers clear and practical.

Do not pretend to be a doctor or dermatologist.
For medical or serious health concerns, recommend
consulting a qualified professional.

The user may ask questions outside beauty.
You can answer general questions naturally,
while keeping the SANCHÉA personality warm,
professional and helpful.
""",

            input=user_message
        )


        # =================================================
        # GET TEXT RESPONSE
        # =================================================

        reply = response.output_text


        if not reply:

            reply = (
                "I'm sorry, I couldn't generate "
                "a response right now."
            )


        return jsonify({

            "reply": reply

        })


    except Exception as error:

        print(
            "SANCHÉA AI ERROR:",
            error
        )


        return jsonify({

            "error": str(error)

        }), 500


# =========================================================
# ALL WEBSITE FILES
# CSS / JS / IMAGES / PAGES
# =========================================================

@app.route(
    "/<path:path>"
)
def serve_files(path):

    file_path = os.path.join(
        BASE_DIR,
        path
    )


    if os.path.isfile(file_path):

        directory = os.path.dirname(
            file_path
        )

        filename = os.path.basename(
            file_path
        )

        return send_from_directory(
            directory,
            filename
        )


    return "Page not found", 404


# =========================================================
# RUN SERVER
# =========================================================

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000
    )