// document
//     .querySelector("select[name=uf]")
//     .addEventListener("change", () => { //Função anonima
//         console.log("mudei")
//     })

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    //É uma promessa
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json() } ) //Função anonima que retorna valor em json
    .then( (states) => {
        //Vai pegar um estado do obj json que tem no site e jogar para a constante state
        for(const state of states) {  
            //Concatenando, pegando o que tinha antes e juntando com o novo
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` //$ é para interpolar
        }
        
    } )
}

populateUFs() //Executando a função

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    //De forma dinâmica, sempre que mudar a ufValue, muda a url
    const ufValue = event.target.value
    //Pegar a posição do estado
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value=>Selecione a Cidade</option>" //Limpa o conteúdo das cidades
    citySelect.disabled = true //Bloqueia o campo antes

    fetch(url)
    .then( (res) => { return res.json() } ) //Função anonima que retorna valor em json
    .then( (cities) => {
        
        //Vai pegar um estado do obj json que tem no site e jogar para a constante state
        for(const city of cities) {  
            //Concatenando, pegando o que tinha antes e juntando com o novo
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` //$ é para interpolar
            //Depois de enviar o cadastro, ${city.nome} e ${city.nome} colocam a cidade e o estado na url 
        }
        
        citySelect.disabled = false

    } )
}
document
    .querySelector("select[name=uf]")
    //Ouvidor de eventos
    .addEventListener("change", getCities) //Passando por referência o getCities

//--------------------------------------------------------------------------------------------------------------//

//Ítens de coleta
//Pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li") //Pega tudo que estiver dentro

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")

let selectedItems = [] //Array de items selecionados

function handleSelectedItem(event) {
    const itemLi = event.target
    //Adicionar ou remover uma classe com JavaScript
    itemLi.classList.toggle("selected") //Possibilitar marcar vários
    const itemId = itemLi.dataset.id

    // console.log('ITEM ID: ', itemId) //Debugger 
    
    //Verificar se existem itens selecionados, se sim
    //pegar os selecionados
    const alreadySelected = selectedItems.findIndex( (item) => {
        const itemFound = item == itemId //Comparando, funciona como if/else
        return itemFound
    }) //A constante pega o index do selecionado

    //se já estiver selecionado, tirar da seleção, se não, adicionar 
    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( (item) => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
    })

        selectedItems = filteredItems
    }else {
        selectedItems.push(itemId) //Coloca um elemento dentro do array
    }
    
    // console.log('selectedItems: ',selectedItems)
    //atualizar o campo escondido com os itens selecionados 
    collectedItems.value = selectedItems
}