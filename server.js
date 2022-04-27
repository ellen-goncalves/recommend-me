const express = require("express")
const server = express()

//const db = require("./db")

const ideas = [
    {
        img: "https://cdn-icons-png.flaticon.com/512/4615/4615266.png",
        title: "Jogos",
        category: "Lazer",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non deserunt aperiam eos facilis id? Ipsum, facilis. Optio quo minima vel qui harum, beatae illum dignissimos dolorum sunt impedit, corrupti alias.",
        url: "http://localhost:3000/ideias"
    },
    {
        img: "https://cdn-icons-png.flaticon.com/512/7280/7280165.png",
        title: "Hortinha",
        category: "Atividades diversas",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non deserunt aperiam eos facilis id? Ipsum, facilis. Optio quo minima vel qui harum, beatae illum dignissimos dolorum sunt impedit, corrupti alias.",
        url: "http://localhost:3000/ideias"
    },
    {
        img: "https://cdn-icons-png.flaticon.com/512/4615/4615252.png",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non deserunt aperiam eos facilis id? Ipsum, facilis. Optio quo minima vel qui harum, beatae illum dignissimos dolorum sunt impedit, corrupti alias.",                        
        url: "http://localhost:3000/ideias"
    }
]

//configurar arquivos estáticos
server.use(express.static("public"))

//configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("templates", {
    express: server,
    noCache: true,
})

//criando uma rota /
//capturando o pedido do cliente para responder
server.get('/', function(req, res) {

    const reverseIdeas = [...ideas].reverse()
    let lastIdeas = []

    for (let idea of reverseIdeas) {
        if(lastIdeas.length < 2) {
            lastIdeas.push(idea)
        }
    }

    
    return res.render("index.html", { ideas: lastIdeas })
})

server.get("/ideias", function(req, res)  {
    const reverseIdeas = [...ideas].reverse()

    //return res.sendFile(__dirname + "/templates/ideias.html")
    return res.render("ideias.html", { ideas: reverseIdeas})
})

server.listen(3000)
