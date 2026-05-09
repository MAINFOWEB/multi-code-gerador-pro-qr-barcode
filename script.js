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

    // GERA APENAS UM QR CODE (só imagem, sem canvas extra)
    new QRCode(qrDiv, {
        text: link,
        width: 150,
        height: 150,
        useSVG: true // força gerar apenas <svg> ou <img>, sem canvas
    });

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
