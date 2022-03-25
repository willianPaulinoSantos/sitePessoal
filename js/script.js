let contatantes = [];
let form = document.querySelector('#contato-infos');
let mensagem;


configuraBotaoEnviar();




function configuraBotaoEnviar(){

    let btnForm = document.querySelector('.form-btn_enviar');
    
    btnForm.addEventListener('click', function(event){
        event.preventDefault();
        mensagem = [];
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
    let nomeValido = validaNome(contatante.nome);
    let emailValido = validaEmail(contatante.email);
    let assuntoValido = validaAssuntoMensagem(contatante.assunto);
    let mensagemValida = validaAssuntoMensagem(contatante.mensagem);
    console.log(mensagem);
    

    if(nomeValido && emailValido && assuntoValido && mensagemValida){
        contatanteValido = true;
    }

    exibeMensagemUsuario(mensagem, contatante.email);
    return contatanteValido;
}


function validaNome(nome){
    let valido = true;

    if(nome.length == 0){
        mensagem.push("Erro no envio: Por favor, insira seu nome");
        valido = false;
        return valido;
    }

    if(nome.length > 50){
        mensagem.push("Erro no envio: Excedeu o número de caracteres (máx 50 caracteres)");
        valido = false;
    }

    let digitos = /\d/g;
    let procuraDig = nome.match(digitos);

    if(procuraDig !== null && procuraDig.length > 0){
        mensagem.push("Erro no envio: Por favor, não insira números no seu nome");
        valido = false;
    }

    console.log(`errosNome = ${mensagem}`);
    
    return valido;
}

function validaEmail(email){
    let temCharEspec = false;
    let emailValido = true;
    const marcadorEmail = /\w+\w+\w+@+\w+\w+\w\.+\w+\w+\w/g
    let checaMarcador = email.match(marcadorEmail);

    if(email.length == 0){
        mensagem.push("Erro no envio: Por favor, insira seu e-mail");
        console.log(mensagem);
        emailValido = false;
        return emailValido;
    }

    if(email[0] == email[0].toUpperCase()){
        mensagem.push("Erro no envio: Por favor, comece com letra minúscula o endereço de e-mail");
        emailValido = false;
    }

    if(checaMarcador == null){
        mensagem.push("Erro no envio: E-mail inválido, siga esse modelo: text@texto.com");
        emailValido = false;
    }

    temCharEspec = checaCaracteresEspeciais(email, mensagem);
    if(temCharEspec){
        mensagem.push("Erro no envio: caracteres especiais no usuário do endereço de e-mail");
        emailValido = false;
    }

    console.log(mensagem);
    return emailValido;
}


function validaAssuntoMensagem (campo){
    console.log(` campo = ${campo.length}`);
    let campoValido = true; 
    if(campo.length === 0){
        campoValido = false;
        mensagem.push("Erro no envio: assunto ou mensagem em branco.");
        return campoValido;
    }
    return campoValido;
}


function checaCaracteresEspeciais(email, erros){
    let temCharEspec = false;
    let indexArroba = email.indexOf("@");
    let estruturaCaract = /\W/g;
    let estruturaPonto = /\./g;
    let procuraCaract = [];
    let procuraPonto =[];


    for (let i = 0; i < indexArroba; i++){
        procuraCaract = email[i].match(estruturaCaract);
        procuraPonto = email[i].match(estruturaPonto);
        if(procuraCaract && !procuraPonto){
            temCharEspec = true;
            return temCharEspec;
        }
    }
}


function exibeMensagemUsuario(erros, email){
    let ul = document.querySelector(".erros");
    ul.innerHTML = "";
    console.log(ul);
    let nomeUsuario = [];
    if(erros.length !== 0){
        erros.forEach(function(erro){
        let li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
    }
    else{
        let arrobaIndex = email.indexOf("@");
        nomeUsuario = `Obrigado pelo contato ${email.slice(0, arrobaIndex)}!`;
        let li = document.createElement("li");
        console.log(`nome Usuario = ${nomeUsuario}`);
        li.classList.add("mensagemAgradecimento");
        li.textContent = nomeUsuario;
        ul.appendChild(li);
    }
    
}