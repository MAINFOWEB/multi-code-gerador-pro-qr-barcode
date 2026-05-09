let modoAtual = 'texto';
let qrCodeInstance = null; // controle para evitar duplicação

function configurar(modo) {
    modoAtual = modo;
    const container = document.getElementById('campos-input');
    document.querySelectorAll('.menu-botoes button').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${modo}`).classList.add('active');
    
    let html = "";
    switch(modo) {
        case 'texto': html = `<input type="text" id="v1" placeholder="Texto ou Nome">`; break;
        case 'pix': html = `<input type="text" id="v1" placeholder="Chave PIX"><input type="text" id="v2" placeholder="Nome"><input type="text" id="v3" placeholder="Cidade">`; break;
        case 'whatsapp': html = `<input type="text" id="v1" placeholder="Ex: 5511999999999">`; break;
        case 'wifi': html = `<input type="text" id="v1" placeholder="Nome da Rede"><input type="password" id="v2" placeholder="Senha">`; break;
        case 'linkedin': html = `<input type="text" id="v1" placeholder="Usuário LinkedIn">`; break;
        case 'facebook': html = `<input type="text" id="v1" placeholder="Usuário Facebook">`; break;
        case 'instagram': html = `<input type="text" id="v1" placeholder="@usuario">`; break;
        case 'email': html = `<input type="email" id="v1" placeholder="E-mail"><input type="text" id="v2" placeholder="Assunto">`; break;
    }
    container.innerHTML = html;
}

function gerarTudo() {
    const v1 = document.getElementById('v1')?.value.trim();
    const v2 = document.getElementById('v2')?.value.trim();
    const v3 = document.getElementById('v3')?.value.trim();
    if (!v1) return alert("Preencha o campo!");

    const qrDiv = document.getElementById("qrcode-canvas");
    qrDiv.innerHTML = ""; // limpa antes de gerar novo

    let link = v1;
    if(modoAtual === 'whatsapp') link = `https://wa.me/${v1.replace(/\D/g,'')}`;
    if(modoAtual === 'linkedin') link = `https://linkedin.com/in/${v1}`;
    if(modoAtual === 'facebook') link = `https://facebook.com/${v1}`;
    if(modoAtual === 'instagram') link = `https://instagram.com/${v1.replace('@','')}`;
    if(modoAtual === 'email') link = `mailto:${v1}?subject=${encodeURIComponent(v2 || '')}`;
    if(modoAtual === 'wifi') link = `WIFI:T:WPA;S:${v1};P:${v2};;`;
    if(modoAtual === 'pix') {
        const n = (v2 || "RECEBEDOR").toUpperCase().substring(0,25);
        const c = (v3 || "CIDADE").toUpperCase().substring(0,15);
        link = `00020126330014BR.GOV.BCB.PIX0111${v1}5204000053039865802BR59${n.length.toString().padStart(2,'0')}${n}60${c.length.toString().padStart(2,'0')}${c}62070503***6304`;
    }

    // QR Code sem duplicação
    qrCodeInstance = new QRCode(qrDiv, { text: link, width: 150, height: 150 });

    // Barcode sem duplicação
    const barcodeSvg = document.getElementById("barcode");
    barcodeSvg.innerHTML = ""; // limpa antes de gerar novo
    JsBarcode(barcodeSvg, v1.substring(0, 20), {
        format: "CODE128", width: 1.5, height: 50, displayValue: true
    });    if(modoAtual === 'email') link = `mailto:${v1}?subject=${encodeURIComponent(v2 || '')}`;
    if(modoAtual === 'wifi') link = `WIFI:T:WPA;S:${v1};P:${v2};;`;
    if(modoAtual === 'pix') {
        const n = (v2 || "RECEBEDOR").toUpperCase().substring(0,25);
        const c = (v3 || "CIDADE").toUpperCase().substring(0,15);
        link = `00020126330014BR.GOV.BCB.PIX0111${v1}5204000053039865802BR59${n.length.toString().padStart(2,'0')}${n}60${c.length.toString().padStart(2,'0')}${c}62070503***6304`;
    }

    new QRCode(qrDiv, { text: link, width: 150, height: 150 });

    JsBarcode("#barcode", v1.substring(0, 20), {
        format: "CODE128", width: 1.5, height: 50, displayValue: true
    });
}

function downloadQR() {
    const img = document.querySelector("#qrcode-canvas img");
    if (img) { const a = document.createElement("a"); a.href = img.src; a.download = "qr.png"; a.click(); }
}

function downloadBarcode() {
    const svg = document.getElementById("barcode");
    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = btoa(unescape(encodeURIComponent(xml)));
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + svg64;
    img.onload = () => {
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "white"; ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(img, 0, 0);
        const a = document.createElement("a"); a.href = canvas.toDataURL("image/png"); a.download = "barras.png"; a.click();
    };
}
configurar('texto');
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
