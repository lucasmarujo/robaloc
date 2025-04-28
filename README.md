# RobaLoc

Um projeto que simula um comprovante de pagamento via PIX, mas que na verdade coleta e envia a localização do usuário via Telegram.

## Funcionalidades

- Exibe uma página falsa de comprovante de transferência Pix do Nubank
- Solicita permissão de localização do navegador do usuário
- Envia as coordenadas de geolocalização para um bot do Telegram
- Inclui link do Google Maps para visualização fácil da localização

## Tecnologias Utilizadas

- **Flask** - Framework web em Python para servir a aplicação
- **HTML/CSS** - Frontend que simula o comprovante de pagamento
- **JavaScript** - Coleta dados de geolocalização do navegador
- **API Telegram** - Envio de mensagens com a localização do usuário

## Como Funciona

1. O usuário acessa o site que parece um comprovante de pagamento do Nubank
2. O navegador solicita permissão para acessar a localização
3. Quando o usuário permite, o JavaScript captura as coordenadas
4. Os dados são enviados para um endpoint Flask (/send_location)
5. O servidor envia uma mensagem pelo Telegram com a localização exata

## Configuração

O projeto utiliza as seguintes variáveis para configuração:

```python
TELEGRAM_BOT_TOKEN = 'seu_token_aqui'
TELEGRAM_CHAT_ID = 'seu_chat_id_aqui'
```

## Executando o Projeto

```bash
python app.py
```

O servidor será iniciado na porta 5000.

---

**⚠️ AVISO**: Este projeto foi criado apenas para fins educacionais. O uso desta ferramenta para enganar pessoas ou coletar dados sem consentimento pode ser ilegal em muitas jurisdições.
