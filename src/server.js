const express = require("express")
const server = express()

//Configurar pasta pública
server.use(express.static("public"))


//Utilizando template engine
const nunjunks = require("nunjucks")
nunjunks.configure("src/views", {
    express: server,
    noCache: true
})

//Configurar caminhos da aplicação:
// Página inicial
//req = REQUISIÇÃO  res = RESPOSTA
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título"})
})

//Página de cadastro
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

//Página de pesquisa
server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

//Ligar o servidor
server.listen(3000)
