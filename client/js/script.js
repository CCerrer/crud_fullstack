import { validateInputField } from './validation.js';

let tbody = document.querySelector('#data');
const modal = document.querySelector('#userForm');
const addButton = document.querySelector('#addButton');
const myForm = document.querySelector('#myForm');
const closeButton = document.querySelector('#closeButton');

const itemUrl = 'http://localhost:5500/api/users';
const addresUrl = 'http://localhost:5500/api/addresses';

async function getTheUsers() {
      try {
        const response = await axios.get(itemUrl);
        const users = response.data;
        return users;
      } catch (error) {
        console.error(error);
      }
}

async function getTheAddresses(){
    try {
        const response = await axios.get(addresUrl);
        const addresses = response.data;
        return addresses;
    } catch (error) {
        console.error(error);
    }
}

async function createUser(user){
    console.log(user)
    try {
        const response = await axios.post(itemUrl, {
            userName: user.name.value,
            email: user.email.value,
            phone: user.telefone.value,
            nickname: user.username.value,
            password: user.password.value,
        });
        const newUser = response.data;
        console.log(`POST: ${newUser}`);
        return newUser;
    } catch (error) {
        console.error(error);
    }
}

let itens = []
let addresses = []

async function loadItens(){
    itens = await getTheUsers()
    tbody.innerHTML = '';
    itens.forEach((item, index) => {
        console.log(item)
        insertItem(item, index);
    });
}
async function loadAddresses(){
    addresses = await getTheAddresses()
    console.log(addresses)
}
loadItens();
loadAddresses();

function insertItem(item, index){
    let row = tbody.insertRow();
    let cell01 = row.insertCell();
    let cell02 = row.insertCell();
    let cell03 = row.insertCell();
    let cell04 = row.insertCell();

    cell01.innerHTML = `${item.id}`;
    cell02.innerHTML = `${item.userName}`;
    cell03.innerHTML = `${item.email}`;
    cell04.innerHTML = `
            <button class="btn btn-success"><i class="bi bi-eye viewButton"></i></button>
            <button class="btn btn-primary"><i class="bi bi-pencil editButton"></i></button>
            <button class="btn btn-danger"><i class="bi bi-trash deleteButton"></i></button>
    `;

    row.querySelector('.editButton').addEventListener('click', editItem);
    row.querySelector('.deleteButton').addEventListener('click', deleteItem);
    row.querySelector('.viewButton').addEventListener('click', viewItem);
}


// ------------------------------------------------------------
function viewItem(event){
    const index = event.target.parentElement.parentElement.parentElement.querySelector('td').innerHTML;
    openModal("view", index)
}

function editItem(event){
    const index = event.target.parentElement.parentElement.parentElement.querySelector('td').innerHTML;
    id = index;
    openModal("edit", index)
}

addButton.addEventListener('click', createFunction);
function createFunction(index){
    openModal("create");
}

function getHighestId(){
    let highestId = 0;
    itens.forEach(item => {
        if(item.id > highestId){
            highestId = item.id;
        }
    });
    return highestId;
}

function deleteItem(event){
    let index = event.target.parentElement.parentElement.parentElement.querySelector('td').innerHTML;
    index = itens.findIndex(item => item.id == index);
    itens.splice(index, 1);
    loadItens();
}

function openModal(action = "create", index = -1){
    let tempInputUser = {
        id: 0,
        name: document.querySelector('#name'),
        email: document.querySelector('#email'),
        telefone: document.querySelector('#telefone'),
        username: document.querySelector('#username'),
        password: document.querySelector('#password'),
        address_id: 0,
    }
    let tempInputAddress = {
        id: 0,
        cep: document.querySelector('#cep'),
        street: document.querySelector('#street'),
        number: document.querySelector('#number'),
        complement: document.querySelector('#complement'),
        state: document.querySelector('#state'),
        city: document.querySelector('#city')
    }
    let itemTemp
    let addressTemp
    if(index !== -1){
        itemTemp = itens.find(item => item.id == index);
        if(itemTemp.address_id != undefined || itemTemp.address_id != null)
            addressTemp = addresses.find(address => address.id == itemTemp.address_id);
        else {
            addressTemp = {
                id: -1,
                cep: '',
                street: '',
                number: null,
                complement: '',
                state: '',
                city: ''
            }
        }
        console.log(addressTemp)
    }


    const openModal = new bootstrap.Modal(modal);
    openModal.show();
    let submitButton = document.querySelector('#submitButton'); 
    
    if(action == "edit"){
        document.querySelector('.modal-title').innerHTML = "Editar Usuário";
        editViewChange(tempInputUser, itemTemp, tempInputAddress, addressTemp);
        
        submitButton.classList.add('editButton')
        if(submitButton.classList.contains('createButton')){
            submitButton.classList.remove('createButton');
        }
        if(submitButton.classList.contains('viewButton')){
            submitButton.classList.remove('viewButton');
        }
        submitButton.disabled = false;

        tempInputAddress.cep.disabled = false;
        tempInputAddress.street.disabled = false;
        tempInputAddress.number.disabled = false;
        tempInputAddress.complement.disabled = false;
        tempInputAddress.state.disabled = false;
        tempInputAddress.city.disabled = false;

        tempInputUser.name.disabled = false;
        tempInputUser.email.disabled = false;
        tempInputUser.telefone.disabled = false;
        tempInputUser.username.disabled = false;
        tempInputUser.password.disabled = false;
    } else if (action == "view"){
        document.querySelector('.modal-title').innerHTML = "Visualizar Usuário";
        editViewChange(tempInputUser, itemTemp, tempInputAddress, addressTemp);

        submitButton.classList.add('viewButton')
        if(submitButton.classList.contains('createButton') ){
            submitButton.classList.remove('createButton');
        }
        if(submitButton.classList.contains('editButton')){
            submitButton.classList.remove('editButton');
        }
        submitButton.disabled = true;

        tempInputAddress.cep.disabled = true;
        tempInputAddress.street.disabled = true;
        tempInputAddress.number.disabled = true;
        tempInputAddress.complement.disabled = true;
        tempInputAddress.state.disabled = true;
        tempInputAddress.city.disabled = true;

        tempInputUser.name.disabled = true;
        tempInputUser.email.disabled = true;
        tempInputUser.telefone.disabled = true;
        tempInputUser.username.disabled = true;
        tempInputUser.password.disabled = true;
    }
    else {
        document.querySelector('.modal-title').innerHTML = "Criar Usuário";
        createChange(tempInputUser, itemTemp, tempInputAddress, addressTemp);

        submitButton.classList.add('createButton')
        if(submitButton.classList.contains('editButton')){
            submitButton.classList.remove('editButton');
        }
        if(submitButton.classList.contains('viewButton')){
            submitButton.classList.remove('viewButton');
        }
        submitButton.disabled = false;

        tempInputAddress.cep.disabled = true;
        tempInputAddress.street.disabled = true;
        tempInputAddress.number.disabled = true;
        tempInputAddress.complement.disabled = true;
        tempInputAddress.state.disabled = true;
        tempInputAddress.city.disabled = true;

        tempInputUser.name.disabled = false;
        tempInputUser.email.disabled = false;
        tempInputUser.telefone.disabled = false;
        tempInputUser.username.disabled = false;
        tempInputUser.password.disabled = false;
    }
}

function editViewChange(tempInputUser, itemTemp, tempInputAddress, addressTemp){
        tempInputUser.name.value = itemTemp.userName;
        tempInputUser.email.value = itemTemp.email;
        tempInputUser.telefone.value = itemTemp.phone;
        tempInputUser.username.value = itemTemp.nickname;
        tempInputUser.password.value = itemTemp.password;

        tempInputAddress.cep.value = addressTemp.cep;
        tempInputAddress.street.value = addressTemp.street;
        tempInputAddress.number.value = addressTemp.number;
        tempInputAddress.complement.value = addressTemp.complement;
        tempInputAddress.state.value = addressTemp.state;
        tempInputAddress.city.value = addressTemp.city;
}

function createChange(tempInputUser, itemTemp, tempInputAddress){
    tempInputUser.name.value = '';
    tempInputUser.email.value = '';
    tempInputUser.telefone.value = '';
    tempInputUser.username.value = '';
    tempInputUser.password.value = '';

    tempInputAddress.cep.value = '';
    tempInputAddress.street.value = '';
    tempInputAddress.state.value = '';
    tempInputAddress.complement.value = '';
    tempInputAddress.city.value = '';
    tempInputAddress.number.value = '';
}
//------------------------------------

myForm.addEventListener('submit', async function(e){
    e.preventDefault();
    const errorValidation = myForm.querySelectorAll(':invalid');
    let submitButton = document.querySelector('#submitButton');

    let tempInputUser = {
        name: document.querySelector('#name'),
        email: document.querySelector('#email'),
        telefone: document.querySelector('#telefone'),
        username: document.querySelector('#username'),
        password: document.querySelector('#password'),
    }
    let tempInputAddress = {
        cep: document.querySelector('#cep'),
        street: document.querySelector('#street'),
        number: document.querySelector('#number'),
        complement: document.querySelector('#complement'),
        state: document.querySelector('#state'),
        city: document.querySelector('#city')
    }

    Array.from(errorValidation).forEach(inputName => {
        validateInputField(inputName);
    })
    if (!myForm.checkValidity()) {
        e.stopPropagation();
        myForm.classList.add('was-validated');
        return;
    } 

    else if(submitButton.classList.contains('createButton')){
        console.log("criou")
        if(!userAlreadyExists(tempInputUser)) {
            return;
        }
        console.log("quase")
        await createUser(tempInputUser);
        console.log("criou")
    }
    else if(submitButton.classList.contains('editButton')){
        console.log("editou")
    }

    myForm.reset();
    loadItens();
    closeButton.click();
});

function userAlreadyExists(user){
    const checkName = itens.find(item => item.userName == user.name.value);
    const checkEmail = itens.find(item => item.email == user.email.value);
    const checkUsername = itens.find(item => item.nickname == user.username.value);

    if(checkName != undefined){
        alert("Nome de usuário já existe");
        return false;
    }
    else if(checkEmail != undefined){
        alert("Email já existe");
        return false;
    }
    else if(checkUsername != undefined){
        alert("Nome de usuário já existe");
        return false;
    }
    return true;
}