async function buscaEndereco(cep){
    var mensagemErrdo = document.getElementById('erro');
    mensagemErrdo.innerHTML = '';
    try{
    //requisição enviada para a API ViaCEP
    var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    var consultaCepConvertida = await consultaCep.json()
    if(consultaCepConvertida.erro){
        throw Error('CEP não existente')
    }
    var cidade = document.getElementById('cidade');
    var logradouro = document.getElementById('endereco');
    var estado = document.getElementById('estado');
    var bairro = document.getElementById('bairro');

    cidade.value = consultaCepConvertida.localidade;
    logradouro.value = consultaCepConvertida.logradouro;
    estado.value = consultaCepConvertida.uf;
    bairro.value = consultaCepConvertida.bairro;

    console.log(consultaCepConvertida)
    return consultaCepConvertida
    } catch(erro) {
        console.log(erro)
        mensagemErrdo.innerHTML = `<p>CEP inválido, tente novamente. </p>`
    }
}

var cep = document.getElementById('cep')
cep.addEventListener('focusout', () => buscaEndereco(cep.value));

