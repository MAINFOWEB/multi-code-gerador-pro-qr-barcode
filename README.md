# 🛠️ Multi-Code Generator Pro (QR & Barcode)

Uma ferramenta web poderosa e responsiva para geração instantânea de **QR Codes** e **Códigos de Barras**. Desenvolvido com foco em utilidade e produtividade, o projeto permite criar códigos personalizados para diversas finalidades, desde redes sociais até configurações de rede Wi-Fi.

## 🚀 Funcionalidades

* **QR Code Multi-uso:**
    * **Texto/Nome:** Codifica qualquer informação textual.
    * **Wi-Fi:** Gera configuração automática para conexão de rede (SSID/Senha).
    * **WhatsApp:** Cria links diretos para conversas com número pré-definido.
    * **Social Media:** Templates prontos para LinkedIn, Instagram e Facebook.
    * **E-mail:** Formata comandos `mailto:` com assunto automático.
* **Código de Barras (CODE128):** Gera códigos de barras padrão industrial para nomes ou IDs técnicos.
* **Download Instantâneo:** Opção de baixar ambos os códigos gerados em formato `.png` para uso imediato.
* **Tratamento de Dados:** Filtros via JavaScript para garantir que links e números de telefone sejam formatados corretamente.

## 🛠️ Tecnologias Utilizadas

* **HTML5 & CSS3:** Interface moderna com design responsivo e Dark Mode.
* **JavaScript (ES6+):** Lógica de alternância de modos e manipulação de DOM.
* **QRCode.js:** Biblioteca para renderização precisa de códigos QR.
* **JsBarcode:** Biblioteca para geração de códigos de barras de alta legibilidade.

## 📂 Estrutura de Arquivos

```text
├── index.html        # Interface e estrutura dos campos
├── style.css         # Estilização Pro (Gradientes e UI)
├── script.js         # Lógica de geração e funções de download
└── README.md         # Documentação do projeto
