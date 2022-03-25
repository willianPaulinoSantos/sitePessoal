let contatantes = [];
let form = document.querySelector('#contato-infos');
let errosEmail;


configuraBotaoEnviar();




function configuraBotaoEnviar(){

    let btnForm = document.querySelector('.form-btn_enviar');
    
    btnForm.addEventListener('click', function(event){
        event.preventDefault();
        let dadosContatante = obtemDadosDoFormulario(form);
        if(typeof(dadosContatante) == 'object'){
            contatantes.push(dadosContatante);
        }
        console.log(contatantes);
    });
}

function obtemDadosDoFormulario(form){
    let contatante = {
        nome: form.nome.value,
        email: form.email.value,
        assunto: form.assunto.value,
        mensagem: form.mensagem.value
    }
   let valido = validaContatante(contatante);

   if(!valido){
       return 0;
   }
    return contatante;
}

function validaContatante(contatante){

    let contatanteValido = false;
    let nomeValido = validaNome(contatante);
    let emailValido = validaEmail(contatante);

    if(nomeValido && emailValido){
        contatanteValido = true;
    }
    return contatanteValido;
}


function validaNome(contatante){
    let valido = true;
    errosNome = [];

    if(contatante.nome.length == 0){
        errosNome.push("Por favor, insira seu nome");
        valido = false;
        console.log(errosNome);
        return valido;
    }

    if(contatante.nome.length > 50){
        errosNome.push("Excedeu o número de caracteres (máx 50 caracteres)");
        valido = false;
    }

    let digitos = /\d/g;
    let procuraDig = contatante.nome.match(digitos);

    if(procuraDig !== null && procuraDig.length > 0){
        errosNome.push("Por favor, não insira números");
        valido = false;
    }

    console.log(`errosNome = ${errosNome}`);
    
    return valido;
}

function validaEmail(contatante){
    errosEmail = [];
    let emailValido = true;
    const marcadorEmail = /\w+\w+\w+@+\w+\w+\w\.+\w+\w+\w/g
    let checaMarcador = contatante.email.match(marcadorEmail);

    if(contatante.email.length == 0){
        errosEmail.push("Por favor, insira seu e-mail");
        console.log(errosEmail);
        emailValido = false;
        return emailValido;
    }

    if(contatante.email[0] == contatante.email[0].toUpperCase()){
        errosEmail.push("Por favor, comece com letra minúscula o endereço de e-mail");
        emailValido = false;
    }

    if(checaMarcador == null){
        errosEmail.push("E-mail inválido, siga esse modelo: text@texto.com");
        emailValido = false;
    }

    checaCaracteresEspeciais(contatante.email, errosEmail);

    console.log(errosEmail);
    return emailValido;
}

function checaCaracteresEspeciais(email, errosEmail){
    let indexArroba = email.indexOf("@");
    console.log(`indexArroba = ${indexArroba}`);
    let estruturaCaract = /\W/g;
    let procuraCaract;
    console.log(`Procura Caracteres Especiais  = ${procuraCaract}`);

    

    procuraCaract = [];
    procuraCaract = email.match(estruturaCaract);
    let indexCaract = email.indexOf(procuraCaract);
    console.log(`indexCaract = ${indexCaract}`);

    if (procuraCaract !== "." && procuraCaract !== "@" && indexArroba > indexCaract){
        errosEmail.push("Erro no envio: caracteres especiais no nome de usuario do e-mail.");
    }
    if (procuraCaract !== "." && procuraCaract !== "@" && indexArroba < indexCaract) {
        errosEmail.push("Erro no envio: caracteres especiais no domínio do e-mail.");
    }
}