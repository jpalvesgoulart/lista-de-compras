let itensList = []

const storageList = localStorage.getItem('itensList')
const ulItens = document.getElementById('lista-de-itens');
const ulComprados = document.getElementById('itens-comprados');
let editItem;

function attLocalStorage() {
    localStorage.setItem('itensList', JSON.stringify(itensList));
}

const form = document.getElementById('form-itens');

if(storageList) {
    itensList = JSON.parse(storageList);
    showItem();
} else {
    itensList = []
}

form.addEventListener('submit', event => {
    event.preventDefault();
    saveItem();
    showItem();
    itensInput.focus();
})

const itensInput = document.getElementById('receber-item');

function saveItem() {
    const shoppingItem = itensInput.value;
    const checkDuplicate = itensList.some(element => element.item.toUpperCase() === shoppingItem.toUpperCase())
    if (checkDuplicate){
        alert('Este item já foi adicionado na lista. Tente outro item!')
    } else {
        itensList.push({item: shoppingItem, check: false,})
    }
    itensInput.value = "";
}

function showItem() {
    ulItens.innerHTML = '';
    ulComprados.innerHTML = '';

    itensList.forEach((element, i) => {
        if(element.check) {
            ulComprados.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${i}">
                    <div>
                        <input type="checkbox" checked class="is-clickable" />  
                        <span class="itens-comprados is-size-5">${element.item}</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-trash is-clickable deletar"></i>
                    </div>
                </li>
            `
        } else {
            ulItens.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${i}">
                    <div>
                        <input type="checkbox" class="is-clickable" />
                        <input type="text" class="is-size-5" id="${i}" value="${element.item}" ${i !== Number(editItem) ? 'disabled' : ''}></input>
                    </div>
                    <div>
                        ${ i === Number(editItem) ? '<button onclick="saveEdit()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                        <i class="fa-solid fa-trash is-clickable deletar"></i>
                    </div>
                </li>
            `
        }
        
    })

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]');

    inputsCheck.forEach(i => {
        i.addEventListener("click", event => {
            const elementValue = event.target.parentElement.parentElement.getAttribute('data-value');
            itensList[elementValue].check = event.target.checked;
            showItem();
        })
    })

    const deleteObject = document.querySelectorAll(".deletar");

    deleteObject.forEach(i => {
        i.addEventListener("click", event => {
            const elementValue = event.target.parentElement.parentElement.getAttribute('data-value');
            itensList.splice(elementValue, 1);
            showItem();
        })
    })

    const editBtn = document.querySelectorAll(".editar");

    editBtn.forEach(i => {
        i.addEventListener('click', event => {
            editItem = event.target.parentElement.parentElement.getAttribute('data-value');
            showItem();
            let input = document.getElementById(`${editItem}`);
            input.focus();
            input.value = "";
        })
    })

    attLocalStorage();
}

function saveEdit() {
    const editedItem = document.querySelector(`[data-value="${editItem}"] input[type="text"]`);
    itensList[editItem].item = editedItem.value;
    editItem = -1;
    showItem();
}