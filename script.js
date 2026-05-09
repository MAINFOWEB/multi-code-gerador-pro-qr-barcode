let modoAtual = 'texto';
const qrcodeContainer = document.getElementById("qrcode-canvas");

function configurar(modo) {
    modoAtual = modo;
    const container = document.getElementById('campos-input');
    document.querySelectorAll('.menu-botoes button').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${modo}`).classList.add('active');
    
    let html = "";
    switch(modo) {
        case 'texto': html = `<input type="text" id="val1" placeholder="Digite seu nome ou texto...">`; break;
        case 'wifi': html = `
            <input type="text" id="val1" placeholder="Nome da Rede (SSID)">
            <input type="password" id="val2" placeholder="Senha da Rede">`; break;
        case 'whatsapp': html = `<input type="text" id="val1" placeholder="Ex: 5511999999999">`; break;
        case 'linkedin': html = `<input type="text" id="val1" placeholder="Usuário do LinkedIn">`; break;
        case 'facebook': html = `<input type="text" id="val1" placeholder="Usuário do Facebook">`; break;
        case 'instagram': html = `<input type="text" id="val1" placeholder="Usuário do Instagram">`; break;
        case 'email': html = `
            <input type="email" id="val1" placeholder="Endereço de e-mail">
            <input type="text" id="val2" placeholder="Assunto (opcional)">`; break;
    }
    container.innerHTML = html;
}

function gerarTudo() {
    const val1 = document.getElementById('val1')?.value;
    const val2 = document.getElementById('val2')?.value;
    if (!val1) return alert("Por favor, preencha o campo principal!");

    let conteudoQR = "";
    switch(modoAtual) {
        case 'texto': conteudoQR = val1; break;
        case 'wifi': conteudoQR = `WIFI:T:WPA;S:${val1};P:${val2};;`; break;
        case 'whatsapp': conteudoQR = `https://wa.me/${val1.replace(/\D/g,'')}`; break;
        case 'linkedin': conteudoQR = `https://www.linkedin.com/in/${val1}`; break;
        case 'facebook': conteudoQR = `https://www.facebook.com/${val1}`; break;
        case 'instagram': conteudoQR = `https://www.instagram.com/${val1}`; break;
        case 'email': conteudoQR = `mailto:${val1}?subject=${encodeURIComponent(val2 || '')}`; break;
    }

    // Gerar QR Code
    qrcodeContainer.innerHTML = "";
    new QRCode(qrcodeContainer, { text: conteudoQR, width: 160, height: 160 });

    // Gerar Código de Barras (Formatado para aceitar caracteres de URL se necessário)
    try {
        JsBarcode("#barcode", val1.substring(0, 30), { // Barras limitadas a 30 caracteres para leitura
            format: "CODE128",
            lineColor: "#000",
            width: 1.5,
            height: 60,
            displayValue: true
        });
    } catch(e) {
        console.error("Erro ao gerar barras: dado muito longo ou incompatível.");
    }
}

function downloadQR() {
    const img = qrcodeContainer.querySelector("img");
    if (!img) return;
    const link = document.createElement("a");
    link.href = img.src;
    link.download = `qrcode_${modoAtual}.png`;
    link.click();
}

function downloadBarcode() {
    const svg = document.getElementById("barcode");
    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = btoa(xml);
    const canvas = document.createElement("canvas");
    const image = new Image();
    image.src = 'data:image/svg+xml;base64,' + svg64;
    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext("2d").drawImage(image, 0, 0);
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `barcode_${modoAtual}.png`;
        link.click();
    };
}
