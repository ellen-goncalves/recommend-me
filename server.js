const express = require("express")
const server = express()

const db = require("./db")

//configurar arquivos estáticos e para usar req.body
server.use(express.static("public"))
server.use(express.urlencoded({ extended: true}))

//configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("templates", {
    express: server,
    noCache: true,
})

//criando uma rota /
//capturando o pedido do cliente para responder
server.get('/', function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reverseIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reverseIdeas) {
            if(lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }    
    return res.render("index.html", { ideas: lastIdeas })
    })
})

server.get("/ideias", function(req, res)  {

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reverseIdeas = [...rows].reverse()

        //return res.sendFile(__dirname + "/templates/ideias.html")
        return res.render("ideias.html", { ideas: reverseIdeas})
    })
})

server.get("/ideias/:id", function(req, res)  {
    id = req.params.id
    db.all(`SELECT * FROM ideas WHERE id = ?`,[id], function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const idea = [...rows]
        console.log(idea)
    return res.render("each_idea.html", { ideas: idea })
    })
})

server.post("/", function(req, res){
    const query = `INSERT INTO ideas (image, title, category, description, url) VALUES (?,?,?,?,?);`
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.url
    ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect("/ideias")
    })

})

server.get("/delete/:id", function(req, res) {
    id = req.params.id

    db.run(`DELETE FROM ideas WHERE id = ?`,[id], function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
        console.log(this)
    return res.redirect("/ideias")
    })
})

server.listen(3000)