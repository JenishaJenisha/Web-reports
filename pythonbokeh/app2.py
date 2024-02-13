from flask import Flask
app = Flask(__name__)
@app.route("/")
def home():
    return "Hello"
if __name__ == "_main_":
    app.run()