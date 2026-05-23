/*
 * Multi code gerador pro qr barcode
 * Copyright (C) 2026 [Marcio Alexandre O. Ferreira]
 * * Este programa é um software livre: você pode redistribuí-lo e/ou modificá-lo
 * sob os termos da Licença Pública Geral GNU conforme publicada pela
 * Free Software Foundation, tanto a versão 3 da licença, ou (a seu critério)
 * qualquer versão posterior.
 */
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
        case 'pix': html = `
            <input type="text" id="val1" placeholder="Chave PIX (E-mail, CPF ou Celular)">
            <input type="text" id="val2" placeholder="Nome do Beneficiário">
            <input type="text" id="val3" placeholder="Cidade (Sem acentos)">`; break;
        case 'wifi': html = `
            <input type="text" id="val1" placeholder="Nome da Rede (SSID)">
            <input type="password" id="val2" placeholder="Senha da Rede">`; break;
        case 'whatsapp': html = `<input type="text" id="val1" placeholder="Número com DDD (ex: 5511999999999)">`; break;
        case 'linkedin': html = `<input type="text" id="val1" placeholder="Nome de usuário do LinkedIn">`; break;
        case 'facebook': html = `<input type="text" id="val1" placeholder="ID ou nome de usuário do Facebook">`; break;
        case 'instagram': html = `<input type="text" id="val1" placeholder="Seu @ do Instagram">`; break;
        case 'email': html = `
            <input type="email" id="val1" placeholder="Endereço de e-mail">
            <input type="text" id="val2" placeholder="Assunto da mensagem">`; break;
    }
    container.innerHTML = html;
}

function gerarTudo() {
    const val1 = document.getElementById('val1')?.value.trim();
    const val2 = document.getElementById('val2')?.value.trim();
    const val3 = document.getElementById('val3')?.value.trim();
    
    if (!val1) return alert("Preencha o campo principal!");

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
