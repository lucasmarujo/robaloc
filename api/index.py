from http.server import BaseHTTPRequestHandler
import requests
import json

TELEGRAM_BOT_TOKEN = '7715557687:AAHvJdcOYIqjIpGpBSsv66Irb9ViN5tZvMs'
TELEGRAM_CHAT_ID = '2063662084'

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data.decode('utf-8'))
            latitude = data.get('latitude')
            longitude = data.get('longitude')

            message = f"Nova localização recebida:\nLatitude: {latitude}\nLongitude: {longitude}\nGoogle Maps: https://maps.google.com/?q={latitude},{longitude}"

            requests.post(f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage', data={
                'chat_id': TELEGRAM_CHAT_ID,
                'text': message
            })

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok"}).encode('utf-8'))
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))

    def do_GET(self):
        self.send_response(405)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"error": "Method Not Allowed"}).encode('utf-8')) 