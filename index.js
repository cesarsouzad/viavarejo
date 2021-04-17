window.onload = () => { getdata(); showData(); calculo();}


var produtos = [];


var form = document.getElementById('formulario');


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
        document.querySelector('select').style.filter = "drop-shadow(0px 1px 2px red)"
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
        document.getElementById('merca').style.filter = "drop-shadow(0px 1px 2px red)"
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
        document.getElementById('dinheiro').style.filter = "drop-shadow(0px 1px 2px red)"
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
        dimdim.style.filter = "drop-shadow(0px 1px 2px red)"
        alert('Somente valor positivo +')

        return false
    }

    addTransacao();
    showData();
    calculo();

 

};
// função ao digitar no campos esquecidos tirar a borda de erro
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
    var confir = window.confirm('Deseja apagar todos os dados?')
    if(confir == true){
    localStorage.clear();
    var limpo = document.getElementById('corpotabela');
    limpo.innerHTML = ``;
    }  
    produtos = []

};

//---função para addicionar no localstorage----------
function addTransacao() {
    getdata()
    
    var tipodatransação = document.querySelector('select').value;

    if (tipodatransação == "1") {
        tipodatransação = '-';
    }
    if (tipodatransação == "2") {
        tipodatransação = "+";
    }
    var tipomercadoria = document.getElementById('merca').value;
    var tipodovalor = document.getElementById('dinheiro').value;


var novoProduto = {saldo: tipodatransação, prod: tipomercadoria, valor: tipodovalor};
localStorage.getItem(produtos);
produtos.push(novoProduto);
localStorage.setItem("produtos", JSON.stringify(produtos));

form.reset();
somar()


};
//---------------------------------------------------



//-------------mascara do input valor-------------------
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
        if (valor_pronto.length >= 11){
            const ultimosdez = valor_pronto.substr(-10);
            const resto = valor_pronto.substr(0, valor_pronto.length - 10);
            valor_pronto = resto + '.' + ultimosdez;
        }
    }
    return  valor_pronto;

}
//--------------fim da mascara valor------------------



//-----pega os dados do localstorage e insere no html-------
function showData(){
    
    document.getElementById("corpotabela").innerHTML = ""

for (let i = 0; i < produtos.length; i ++){
    
    document.querySelector("#corpotabela").innerHTML +=`
    <tr>
       <td id="tipotabela" name="saldo">${produtos[i].saldo}</td>
       <td id="tipodamercadoria" name="prod">${produtos[i].prod}</td>
       <td id="valortabela" class="endt" name="valor">R$${produtos[i].valor}</td>
     </tr>
    `    
}
if (produtos.length == 0) {
    document.querySelector("#corpotabela").innerHTML =`
    <tr>
       <td id="tipotabela" > Sem transações adicionadas !</td>
     </tr>
    `    
}
}
//-----------------------------------------------------------

//--------variavel igual localstorage se diferente de nulo produto recebe localstorage tratado
function getdata(){
    somar()
    var str = localStorage.getItem('produtos');
    if (str != null)
    produtos = JSON.parse(str)
}
//-----------------------------------------------------------

function somar(){
    
    var total = 0
    for(let i = 0; i < produtos.length; i++){
        let valorUm = parseFloat(produtos[i].valor.replace(/\./g, "").replace(/,/g, "."))
        if(produtos[i].saldo != "+"){
            valorUm *= -1
        }
        total += valorUm
    }
    return total    
}

function calculo(){  
   var totaltabela = document.getElementById('endt')
    if (somar() > 0 ){
        totaltabela.innerHTML =  "R$ " + somar().toLocaleString("pt-BR",) + "<br> [Lucro]"
        
    }else {
        totaltabela.innerHTML = "R$ " + somar().toLocaleString("pt-BR",) + "<br> [Prejuízo]"
        
    }
}