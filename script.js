let modoAtual = 'texto';

function configurar(modo) {
    modoAtual = modo;
    const container = document.getElementById('campos-input');
    document.querySelectorAll('.menu-botoes button').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${modo}`).classList.add('active');
    
    let ph = "Digite o texto ou nome...";
    if(modo === 'pix') ph = "Chave PIX (CPF/E-mail)";
    if(modo === 'whatsapp') ph = "DDD + Número (ex: 11999999999)";
    
    container.innerHTML = `<input type="text" id="val1" placeholder="${ph}">`;
}

function gerarTudo() {
    const input = document.getElementById('val1');
    const valor = input.value.trim();
    
    if (!valor) {
        alert("Por favor, preencha o campo!");
        return;
    }

    // --- SEGURANÇA: LIMPA OS CAMPOS ANTES DE GERAR ---
    const qrDiv = document.getElementById("qrcode-canvas");
    qrDiv.innerHTML = ""; // Remove o QR Code anterior
    
    // O JsBarcode limpa o SVG automaticamente, mas vamos garantir:
    const svgBarras = document.getElementById("barcode");
    svgBarras.innerHTML = ""; 

    // --- GERAÇÃO DO QR CODE ---
    let textoFinal = valor;
    if(modoAtual === 'whatsapp') textoFinal = `https://wa.me/${valor.replace(/\D/g,'')}`;
    if(modoAtual === 'instagram') textoFinal = `https://instagram.com/${valor.replace('@','')}`;
    if(modoAtual === 'pix') textoFinal = `00020126330014BR.GOV.BCB.PIX0111${valor}5204000053039865802BR5910RECEBEDOR6006CIDADE62070503***6304`;

    new QRCode(qrDiv, {
        text: textoFinal,
        width: 150,
        height: 150
    });

    // --- GERAÇÃO DO CÓDIGO DE BARRAS ---
    // Limitamos a 20 caracteres para as barras não ficarem gigantes no celular
    JsBarcode("#barcode", valor.substring(0, 20), {
        format: "CODE128",
        width: 1.5,
        height: 50,
        displayValue: true,
        fontSize: 14
    });
}

function downloadQR() {
    const img = document.querySelector("#qrcode-canvas img");
    if (!img) return alert("Gere o código primeiro!");
    const link = document.createElement("a");
    link.href = img.src;
    link.download = "qrcode_marcio.png";
    link.click();
}

function downloadBarcode() {
    const svg = document.getElementById("barcode");
    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = btoa(unescape(encodeURIComponent(xml)));
    const canvas = document.createElement("canvas");
    const image = new Image();
    image.src = 'data:image/svg+xml;base64,' + svg64;
    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "white"; // Fundo branco no download
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "barras_marcio.png";
        link.click();
    };
}
    if (!img) return;
    const link = document.createElement("a");
    link.href = img.src;
    link.download = "qr.png";
    link.click();
}

function downloadBarcode() {
    const svg = document.getElementById("barcode");
    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = btoa(unescape(encodeURIComponent(xml)));
    const canvas = document.createElement("canvas");
    const image = new Image();
    image.src = 'data:image/svg+xml;base64,' + svg64;
    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext("2d").drawImage(image, 0, 0);
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "barras.png";
        link.click();
    };
}
        case 'pix': 
            const nome = (val2 || "RECEBEDOR").substring(0, 25).toUpperCase();
            const cidade = (val3 || "CIDADE").substring(0, 15).toUpperCase();
            conteudoQR = `00020126330014BR.GOV.BCB.PIX0111${val1}5204000053039865802BR59${nome.length.toString().padStart(2, '0')}${nome}60${cidade.length.toString().padStart(2, '0')}${cidade}62070503***6304`;
            break;
        case 'wifi': conteudoQR = `WIFI:T:WPA;S:${val1};P:${val2};;`; break;
        case 'whatsapp': conteudoQR = `https://wa.me/${val1.replace(/\D/g,'')}`; break;
        case 'linkedin': conteudoQR = `https://linkedin.com/in/${val1}`; break;
        case 'instagram': conteudoQR = `https://instagram.com/${val1.replace('@','')}`; break;
        default: conteudoQR = val1;
    }

    qrcodeContainer.innerHTML = "";
    new QRCode(qrcodeContainer, { text: conteudoQR, width: 150, height: 150 });

    JsBarcode("#barcode", val1.substring(0, 20), {
        format: "CODE128",
        width: 1.5,
        height: 50,
        displayValue: true
    });
}

function downloadQR() {
    const img = qrcodeContainer.querySelector("img");
    if (!img) return;
    const link = document.createElement("a");
    link.href = img.src;
    link.download = "qrcode.png";
    link.click();
}

function downloadBarcode() {
    const svg = document.getElementById("barcode");
    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = btoa(unescape(encodeURIComponent(xml)));
    const canvas = document.createElement("canvas");
    const image = new Image();
    image.src = 'data:image/svg+xml;base64,' + svg64;
    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext("2d").drawImage(image, 0, 0);
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "barcode.png";
        link.click();
    };
}
configurar('texto');

    let conteudoQR = "";
    switch(modoAtual) {
        case 'texto': conteudoQR = val1; break;
        case 'pix': 
            // Lógica simplificada de BR Code Estático
            const chave = val1;
            const nome = (val2 || "RECEBEDOR").substring(0, 25).toUpperCase();
            const cidade = (val3 || "CIDADE").substring(0, 15).toUpperCase();
            // Montagem básica do payload PIX (Modelo simplificado para QR Estático)
            conteudoQR = `00020126330014BR.GOV.BCB.PIX0111${chave}5204000053039865802BR59${nome.length.toString().padStart(2, '0')}${nome}60${cidade.length.toString().padStart(2, '0')}${cidade}62070503***6304`;
            break;
        case 'wifi': conteudoQR = `WIFI:T:WPA;S:${val1};P:${val2};;`; break;
        case 'whatsapp': conteudoQR = `https://wa.me/${val1.replace(/\D/g,'')}`; break;
        case 'linkedin': conteudoQR = `https://www.linkedin.com/in/${val1}`; break;
        case 'facebook': conteudoQR = `https://www.facebook.com/${val1}`; break;
        case 'instagram': conteudoQR = `https://www.instagram.com/${val1}`; break;
        case 'email': conteudoQR = `mailto:${val1}?subject=${encodeURIComponent(val2 || '')}`; break;
    }

    // Gerar QR Code
    qrcodeContainer.innerHTML = "";
    new QRCode(qrcodeContainer, { text: conteudoQR, width: 180, height: 180, colorDark: "#000000", colorLight: "#ffffff" });

    // Gerar Código de Barras
    try {
        JsBarcode("#barcode", val1.substring(0, 25), {
            format: "CODE128",
            lineColor: "#000",
            width: 1.5,
            height: 60,
            displayValue: true
        });
    } catch(e) {
        console.error("Erro no Barcode");
    }
}

function downloadQR() {
    const img = qrcodeContainer.querySelector("img");
    if (!img) return;
    const link = document.createElement("a");
    link.href = img.src;
    link.download = `qrcode_marcio_${modoAtual}.png`;
    link.click();
}

function downloadBarcode() {
    const svg = document.getElementById("barcode");
    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = btoa(unescape(encodeURIComponent(xml)));
    const canvas = document.createElement("canvas");
    const image = new Image();
    image.src = 'data:image/svg+xml;base64,' + svg64;
    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext("2d").drawImage(image, 0, 0);
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `barcode_marcio_${modoAtual}.png`;
        link.click();
    };
}

// Início padrão
configurar('texto');
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
