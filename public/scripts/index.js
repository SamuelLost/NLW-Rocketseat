//JS para abrir e fechar tela de pesquisa
const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

//Clica em 'Pesquisar pontos' abre a telinha preta
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})
//Fecha a telinha preta ao clicar no 'x'
close.addEventListener("click", () => {
    modal.classList.add("hide")
})