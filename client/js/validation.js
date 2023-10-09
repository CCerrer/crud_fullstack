const validationMessages = {
    "user": {
        "username": {
            "lengthWrong": "O nome de usuário deve ter entre 8 e 50 caracteres",
            "valueMissing": "O nome de usuário é obrigatório",
            "typeMismatch": "O nome de usuário é inválido"
        },
        "password": {
            "lengthWrong": "A senha deve ter entre 8 e 50 caracteres",
            "valueMissing": "A senha é obrigatória",
            "typeMismatch": "A senha é inválida"
        },
        "email": {
            "lengthWrong": "O email deve ter entre 5 e 50 caracteres",
            "valueMissing": "O email é obrigatório",
            "typeMismatch": "O email é inválido"
        },
        "name": {
            "lengthWrong": "O nome deve ter entre 3 e 50 caracteres",
            "valueMissing": "O nome é obrigatório",
            "typeMismatch": "O nome é inválido"
        },
        "telefone": {
            "lengthWrong": "O telefone deve ter entre 11 e 25 caracteres",
            "valueMissing": "O telefone é obrigatório",
            "typeMismatch": "O telefone é inválido"
        },
        "unique": {
            "inputUniqueUsername": "Esse nome de usuário já foi escolhido",
            "inputUniqueEmail": "Esse email já foi cadastrado"
        }
    },
    "address": {
        "cep": {
            "lengthWrong": "O CEP deve ter 8 caracteres",
            "valueMissing": "O CEP é obrigatório",
            "typeMismatch": "O CEP é inválido"
        },
        "street": {
            "lengthWrong": "A rua deve ter entre 3 e 50 caracteres",
            "valueMissing": "A rua é obrigatória",
            "typeMismatch": "A rua é inválida"
        },
        "number": {
            "lengthWrong": "O número deve ter entre 1 e 10 caracteres",
            "valueMissing": "O número é obrigatório",
            "typeMismatch": "O número é inválido"
        },
        "complement": {
            "lengthWrong": "O complemento deve ter entre 3 e 50 caracteres",
            "valueMissing": "O complemento é obrigatório",
            "typeMismatch": "O complemento é inválido"
        },
        "state": {
            "lengthWrong": "O estado deve ter 2 caracteres",
            "valueMissing": "O estado é obrigatório",
            "typeMismatch": "O estado é inválido"
        },
        "city": {
            "lengthWrong": "A cidade deve ter entre 3 e 50 caracteres",
            "valueMissing": "A cidade é obrigatória",
            "typeMismatch": "A cidade é inválida"
        }
    }
}

export function validateInputField(inputField){
    const type = inputField.parentElement.parentElement.classList[1]
    const inputFieldValidationMessage = inputField.parentElement.querySelector('.invalid-feedback');
    
    console.log(inputField.validity)
    if(inputField.validity.tooLong || inputField.validity.tooShort){
        inputFieldValidationMessage.innerText = validationMessages[type][inputField.id]['lengthWrong'];
    }
    else if (inputField.validity.valueMissing) {
        inputFieldValidationMessage.innerText = validationMessages[type][inputField.id]['valueMissing'];
    }
    else if (inputField.validity.typeMismatch) {
        inputFieldValidationMessage.innerText = validationMessages[type][inputField.id]['typeMismatch'];
    }
}