class Validador{
    constructor(){
        //Método Construtor para Validar os Campos
        this.Validations = [
            'data-email-validate',
            'data-min-lenght',
            'data-max-lenght',
            'data-only-letters',
            'data-required',
            'data-equal',

        ]
    }



    // Validação dos campos do Formulario
    validate(form){
        //Limpar todas validações
        let currentValidations = document.querySelectorAll('form.error-validation');

        if(currentValidations.length){
            this.cleanValidations(currentValidations);
        }

        //Pegando todos inputs
        let inputs = form.getElmentsByTagName('input');

        //Transformando HTMLCollection em um array
        let inputArray = [...inputs];


        //loop nos inputs e validação dos atributos encontrados
        inputArray.forEach(function(input, obj){

            //Fazer validaçã dos atributos do input
            for(let i = 0;  this.Validations.length > i; i++){

                if(input.getAttribute(this.Validations[i]) !=null){

                    // Limpa string para saber o método.
                    let method = this.Validations[i].replace("data-", "").replace("-", "");


                    // Valor do input
                    let value = input.getAttribute(this.Validations[i]);

                    //invoca o método
                    this[method](input, value)
                }
            }
        }, this);


    }


    //método para validar se tem um mínimo de caractes
    minlength(input, minValue){
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if(inputLength < minValue){
            this.printMessage(input, errorMessage);
        }
    }


    // Método para validar se passou o máximo de caracters do campo nome
    maxlength(input, maxValue){

        let inputLength = input.value.length;

        let errorMessage = `O Campo precisa ter menos que ${maxValue} caracteres`;

        if(inputLength > maxValue){
            this.printMessage(input, errorMessage);

        }
    }

    //Método para validar string que só contem letras
    onlyletters(input){
        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita número e caracteres especiais`;

        if(!re.test(inputValue)){
            this.printMessage(input, errorMessage);
        }
    }
     

    // métodos para validar e-mail
    emailvalidate(input){
        let re = /\S+@\S+\.\S+/;
        let email = input.valu;

        let errorMessage = `Insira o e-mail correto...!`;

        if(!re.test(email)){
            this.printMessage(input, errorMessage);
        }
    }

    //Verificar se os campos são iguais
    equal(input, inputName){

        let inputToCompare = document.getElementsByTagName(inputName)[0];

        let errorMessage = `Campo precisa ser igual ao ${inputName}`;

        if(input.value != inputToCompare.value){
            this.printMessage(input, errorMessage);
        }
    }


    //Método ára exobir inputs que são necessários
    requerid(input){
        let inputValue = input.value;

        if(inputValue === ''){
            let errorMessage = `Campo Obrigatório`;
            this.printMessage(input, errorMessage);
        }
    }
   
    //Validar os campos de Senha
    passwordvalidate(input){

        // Expldir String em array
        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for (let i = 0; charArr.length >i; i++){

            if(charArr[i] === charArr[i].toUpercase() && isNaN(parseInt(charArr[i]))){
                uppercase++;
            }
        }

        if(uppercases === 0 || numbers === 0){
            let errorMessage = `À senha precisa de um caracter maiúscolo e um número`;
            this.printMessage(input, errorMessage);
        }

    }


    // Método para imprimir mensagens de erro
    printMessage(input, msg){


        //checa erros presentes no input
        let errosQTy = input.parentNode.querySelector('.error-validation');

        // Imprimir os erros
        if(errosQTy === null){

            let template = document.querySelector('.error-validateion').cloneNode(true);


            template.textContent = msg;

            let inputParent = input.parentNode;
    
            template.classList.remove('template');
    
            inputParent.appendChild(template);
        }

       

    }


    // Remover todas as validações para fazer checagem novamente
    cleanValidations(Validations){
        Validations.forEach(el => el.remove());
    }

}

let form =document.getElementsByTagName('register-form');
let submit = document.getElementById('btn-submit');

let validator = new Validador();

//Evento de envio do form, que valida os inputs
submit.addEventListener('click', function(e){
    e.preventDefault();


    validator.validate(form);
});