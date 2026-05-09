let modoAtual = 'texto';

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

    // LIMPA QR CODE ANTES DE GERAR
    const qrDiv = document.getElementById("qrcode-canvas");
    qrDiv.innerHTML = "";

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

    // GERA APENAS UM QR CODE
    const qr = new QRCode(qrDiv, { text: link, width: 150, height: 150 });
    // REMOVE CANVAS EXTRA, deixa só IMG
    const canvasExtra = qrDiv.querySelector("canvas");
    if (canvasExtra) canvasExtra.remove();

    // LIMPA BARCODE ANTES DE GERAR
    const barcodeSvg = document.getElementById("barcode");
    barcodeSvg.innerHTML = "";

    // GERA APENAS UM BARCODE
    JsBarcode(barcodeSvg, v1.substring(0, 20), {
        format: "CODE128",
        width: 1.5,
        height: 50,
        displayValue: true
    });
}

function downloadQR() {
    const img = document.querySelector("#qrcode-canvas img");
    if (img) {
        const a = document.createElement("a");
        a.href = img.src;
        a.download = "qr.png";
        a.click();
    }
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
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "barras.png";
        a.click();
    };
}

configurar('texto');    JsBarcode(barcodeSvg, v1.substring(0, 20), {
        format: "CODE128",
        width: 1.5,
        height: 50,
        displayValue: true
    });
}
