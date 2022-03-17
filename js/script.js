class Contatante {
    constructor(nome, email, assunto, mensagem){
        this.nome = nome;
        this.email = email;
        this.assunto = assunto;
        this.mensagem = mensagem;
    }

    validaNome(){
        erros = [];
        let digitos = /\d/g;
        let procuraDigitos = this.nome.match(digitos);

        if(this.nome.length == 0){
            erros.push('Por favor, insira seu nome');
        }

        if(this.nome.length > 50){
            erros.push('Excedeu o número de caracteres');
        }

        if(procuraDigitos !== null && procuraDigitos.length !== 0){
                erros.push('Não digite números nesse campo');
        }
        console.log(erros);
    }
}

let erros = [];

let campoNome = document.querySelector('.contato-nome');
let campoEmail = document.querySelector('.contato-email');
let campoAssunto = document.querySelector('.assunto');
let campoMensagem = document.querySelector('.mensagem');
let btnForm = document.querySelector('.form-btn_enviar')
let form = document.querySelector('form');
let i = 0;


btnForm.addEventListener('click', function(form){
    form.preventDefault(); 
    const novoContatante = new Contatante(campoNome.value, campoEmail.value, campoAssunto.value, campoMensagem.value);
   // console.log(novoContatante.nome);
    novoContatante.validaNome();
});


function validaNome(){
    console.log(this.nome.length)
        if(this.nome.length > 50){
            console.log('Excedeu o número de caracteres');
        }
}