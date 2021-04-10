
//função para abrir o sidenav
function openNav() {
    document.getElementById("mySidenav").style.marginRight = "0px";
}
//função para fechar o sidenav
function closeNav() {
    document.getElementById("mySidenav").style.marginRight = "-300px";
};


//função para validar o formulario
function validacaoForm() {


    if (
        document.querySelector('select').value == 0
    ) {
        //alerta erro, borda vermelha, sombra
        window.alert('Por favor, selecione a opção compra ou venda!');
        document.querySelector('select').style.border = '1px solid red'
        document.querySelector('select').style.filter = "drop-shadow(0px 1px 2px black)"
        return false
    }
    if (
        //se a id merca == vazio ou nulo
        document.getElementById('merca').value == '' ||
        document.getElementById('merca').value == null
    ) {
        //alerta erro, borda vermelha, sombra
        window.alert('Por favor, insira o nome da mercadoria!');
        document.getElementById('merca').style.border = '1px solid red'
        document.getElementById('merca').style.filter = "drop-shadow(0px 1px 2px black)"
        return false
    }
    if (
        // se a id dinheiro == vazio ou nulo
        document.getElementById('dinheiro').value == '' ||
        document.getElementById('dinheiro').value == null
    ) {
        //alerta erro, borda vermelha, sombra
        window.alert('Por favor, insira o valor!');
        document.getElementById('dinheiro').style.border = '1px solid red'
        document.getElementById('dinheiro').style.filter = "drop-shadow(0px 1px 2px black)"
        return false
    }
    if (
        //se o o valor do campo da id dinheiro for menor ou igual a 0
        document.getElementById('dinheiro').value <= 0
    ) {
        //alerta , borda e fonte vermelho e sombra
        var dimdim = document.getElementById('dinheiro')
        dimdim.style.color = "red"
        dimdim.style.border = "1px solid red"
        dimdim.style.filter = "drop-shadow(0px 1px 2px black)"
        alert('Somente valor positivo +')

        return false
    }

    addTransacao();
    return false
};



function cor() {
    //função cor caso o campo errado for corrigido
    document.getElementById('dinheiro').style.border = '1px solid gray'
    document.getElementById('dinheiro').style.filter = "none"
    document.getElementById('merca').style.border = '1px solid gray'
    document.getElementById('merca').style.filter = "none"
    document.querySelector('select').style.border = '1px solid gray'
    document.querySelector('select').style.filter = "none"
};
//funcao para limpar os dados
function limparDados() {
    document.querySelector('tabela').innerHTML = `
                
    `
}

function addTransacao() {
    var tipodatransação = document.querySelector('select').value;

    if (tipodatransação == "1") {
        tipodatransação = '-';
    }
    if (tipodatransação == "2") {
        tipodatransação = "+";
    }


    var tipomercadoria = document.getElementById('merca').value;
    var tipodovalor = document.getElementById('dinheiro').value;
    document.getElementById('tabela').innerHTML += `
                <tr>
                  <td id="tipotabela">${tipodatransação}</td>
                  <td id="tipodamercadoria">${tipomercadoria}</td>
                  <td id="valortabela" class="endt">${tipodovalor}</td>
                </tr>
    `

    var paralocal = [{
        tipo: tipodatransação,
        mercadoria: tipomercadoria,
        valor: tipodovalor
    }];
   

        localStorage.setItem("paralocal", JSON.stringify(paralocal));

        console.log(paralocal)

        return false

    }

    //mascara do input valor
    const valdin = document.getElementById('dinheiro');

    valdin.addEventListener('input', (e) => {
        e.target.value = MaskaValo(e.target.value);
    });

    function MaskaValo(valorCampo) {
        valorCampo = valorCampo.toString().replace(/\D/g, '');
        valorCampo = parseInt(valorCampo.replace(/[.,]/g, '')).toString();
        let valor_pronto = '';
        if (valorCampo === '0') {
            valor_pronto = '';
        } else if (valorCampo.length === 1) {
            valor_pronto += '00' + valorCampo;
        } else if (valorCampo.length === 2) {
            valor_pronto += '0' + valorCampo;
        } else {
            valor_pronto = valorCampo;
        }
        if (valor_pronto.length > 0) {
            const doisUltimos = valor_pronto.substr(-2);
            const resto = valor_pronto.substr(0, valor_pronto.length - 2);
            valor_pronto = resto + ',' + doisUltimos;
            if (valor_pronto.length >= 7) {
                const ultimosSeis = valor_pronto.substr(-6);
                const resto = valor_pronto.substr(0, valor_pronto.length - 6);
                valor_pronto = resto + '.' + ultimosSeis;
            }
        }
        return "R$" + valor_pronto;

    }
//fim da mascara valor