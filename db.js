const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./my_db')

db.serialize(function () {

    // Criar a tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            url TEXT
        );        
    `)
    // Inserir dados na tabela
    const query =
        `INSERT INTO ideas (
        image,
        title, 
        category,
        description,
        url
    ) VALUES (?,?,?,?,?);`
    const values = [
        "https://cdn-icons-png.flaticon.com/512/7280/7280165.png",
        "Hortinha",
        "Atividades diversas",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non deserunt aperiam eos facilis id? Ipsum, facilis. Optio quo minima vel qui harum, beatae illum dignissimos dolorum sunt impedit, corrupti alias.",
        "http://localhost:3000/ideias"]

    /* db.run(query, values, function(err){
        if (err) return console.log(err)

        console.log(this)
    }) */

    // Consultar dados na tabela
    /* db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) return console.log(err)
        console.log(rows)

    }) */

    // Deletar um dado da tabela
    /* db.run(`DELETE FROM ideas WHERE id = ?`,[], function(err) {
        if (err) return console.log(err)
        console.log(this)
    }) */

})

module.exports = db