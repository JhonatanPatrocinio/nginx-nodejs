const express = require('express')
const app = express()
const port = 3000


const config = {
    host: 'db',
    user: 'node',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config);

const insertPeople0Sql = `insert into people(name) values ('Jhonatan Patrocinio')`
const insertPeople1Sql = `insert into people(name) values ('O tal do NODE com MYSQL')`
const getUsersSql = `SELECT * FROM people`

app.get('/', (req, res) => {
    connection.query(getUsersSql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
       if (!results.length){
            connection.query(insertPeople0Sql)
            connection.query(insertPeople1Sql)
       }
    });
    connection.query(getUsersSql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        let li = results.map(p => `<li>ID: ${p.id} | NAME: ${p.name}</li>`)
        content = `<h1>Full Cycle Rocks!</h1><br><ul>${li.join("<br>")}</ul>`
        res.send(content)
    });
})

app.listen(port, () => {
    console.log('Listening port: ' + port)
})