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

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    //De forma dinâmica, sempre que mudar a ufValue, muda a url
    const ufValue = event.target.value
    //Pegar a posição do estado
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then( (res) => { return res.json() } ) //Função anonima que retorna valor em json
    .then( (cities) => {
        //Vai pegar um estado do obj json que tem no site e jogar para a constante state
        for(const city of cities) {  
            //Concatenando, pegando o que tinha antes e juntando com o novo
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>` //$ é para interpolar
        }
        
        citySelect.disabled = false

    } )
}
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) //Passando por referência o getCities