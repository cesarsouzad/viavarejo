//função para abrir o sidenav
function openNav() {
    document.getElementById("mySidenav").style.marginRight = "0px";
     }
//função para fechar o sidenav
function closeNav() {
    document.getElementById("mySidenav").style.marginRight = "-300px";
     };


//função para validar o formulario
function validacaoForm(){
    if(
        document.querySelector('select').value == 0
    )
    {
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
    )
    {
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
        )
        {
        //alerta erro, borda vermelha, sombra
        window.alert('Por favor, insira o valor!');
        document.getElementById('dinheiro').style.border = '1px solid red'
        document.getElementById('dinheiro').style.filter = "drop-shadow(0px 1px 2px black)"
        return false
    }
    if(
        //se o o valor do campo da id dinheiro for menor ou igual a 0
        document.getElementById('dinheiro').value <= 0
    ){
        //alerta , borda e fonte vermelho e sombra
      var dimdim =  document.getElementById('dinheiro')
      dimdim.style.color = "red"
      dimdim.style.border = "1px solid red"
      dimdim.style.filter = "drop-shadow(0px 1px 2px black)"
      alert('Somente valor positivo +')
        return false
    }

};
function cor(){
    //função cor caso o campo errado for corrigido
    document.getElementById('dinheiro').style.border = '1px solid gray'
    document.getElementById('dinheiro').style.filter = "none"
    document.getElementById('merca').style.border = '1px solid gray'
    document.getElementById('merca').style.filter = "none"
    document.querySelector('select').style.border = '1px solid gray'
    document.querySelector('select').style.filter = "none"
};
//mascara do valor 

 



//funçao adicionar transação
function addTransacao(){
    var campo1 = document.querySelector('select').value
    var campo2 = document.getElementById('merca').value
    var campo3 = document.getElementById('dinheiro').value
    //var acolhe = campo1+campo2+campo3

     console.log(campo1)
     console.log(campo2)
     console.log(campo3)
     
};
// const dinheiro = document.getElementById('dinheiro');
// dinheiro.addEventListener('input' , (e) => {
//     e.target.value = MaskVal (e.target.value);
//      });
//      function MaskVal(valor_input) {
//         valor_input = valor_input.toString().replace(/\D/g, '');
//         valor_input = parseInt(valor_input.replace(/[.,]/g, '')).toString();
//         let valor_pronto = '';
//         if  (valor_input === '0'){valor_pronto = '';}
//         else if (valor_input.lenght === 1){
//             valor_pronto += '00' + valor_input;
//         }
//         else if (valor_input.lenght === 2){
//             valor_pronto += '0' + valor_input;
//         }
//         else {valor_pronto = valor_input;}
//         if (valor_pronto.lenght > 0){
//            const last = valor_pronto.substr(-2);
//            const numero = valor_pronto.substr(0, valor_pronto.lenght - 2);
//            valor_pronto = numero + ',' + last;
//            if (valor_pronto.lenght >= 7){
//                const seisCasas = valor_pronto.substr(-6);
//                const numero = valor_pronto.substr(0, valor_pronto.lenght - 6);
//                valor_pronto = numero + '.' + seisCasas;
//            }
//         } 
//         return valor_pronto;
//     }
    
const campoFormulario = document.getElementById('dinheiro');

campoFormulario.addEventListener('input', (e) => {
    e.target.value = mascaraValor(e.target.value);
});

function mascaraValor(valorCampo) {
    valorCampo = valorCampo.toString().replace(/\D/g, '');
    valorCampo = parseInt(valorCampo.replace(/[.,]/g, '')).toString();
    let valorFormatado = '';
    if (valorCampo === '0') {
        valorFormatado = '';
    } else if (valorCampo.length === 1) {
        valorFormatado += '00' + valorCampo;
    } else if (valorCampo.length === 2) {
        valorFormatado += '0' + valorCampo;
    } else {
        valorFormatado = valorCampo;
    }
    if (valorFormatado.length > 0) {
        const doisUltimos = valorFormatado.substr(-2);
        const resto = valorFormatado.substr(0, valorFormatado.length - 2);
        valorFormatado = resto + ',' + doisUltimos;
        if (valorFormatado.length >= 7) {
            const ultimosSeis = valorFormatado.substr(-6);
            const resto = valorFormatado.substr(0, valorFormatado.length - 6);
            valorFormatado = resto + '.' + ultimosSeis;
        }
    }
    return valorFormatado;
}