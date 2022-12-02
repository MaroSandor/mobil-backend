const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const { equal } = require('assert')
const app = express()
const port = 24001

var connection

function kapcsolat() {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'exam_db'
    })
    connection.connect()
}


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Saját alkalmazás backend szerver oldal')
})

// # Első backend végpont: Összes adat az 'agency' táblából
app.get('/osszes_adat', (req, res) => {

    kapcsolat()

    connection.query('SELECT * FROM agency', (err, rows, fields) => {
        if (err) throw err

        console.log('The solution is: ', rows)
        res.send(rows)
    })

    connection.end()
})

// # Második backend végpont: Járatszámok lekérdezéses a 'routes' táblából
app.get('/jaratok', (req, res) => {

    kapcsolat()

    connection.query('SELECT route_id, route_short_name FROM routes', (err, rows, fields) => {
        if (err) throw err

        console.log('The solution is: ', rows)
        res.send(rows)
    })

    connection.end()
})

// # Harmadik végpont: Vélemény felvitele az 'opinions' táblába (a későbbi megjelenítéshez)
app.post('/felvitel', (req, res) => {

    kapcsolat()

    connection.query("INSERT INTO opinions VALUES (NULL, " + req.body.bevitel1 + ", " + req.body.bevitel2 + ", " + req.body.bevitel3 + ", '" + req.body.bevitel4 + "')", function (err, rows, fields) {
        if (err)
            console.log(err)
        else {
            console.log("Sikeres felvitel az adatbázisba!")
        }
    })

    connection.end()
})

// # Negyedik végpont: User adatok lekérése az adatbázisból a bejelentkezéshez
app.get('/login', (req, res) => {

    kapcsolat()

    connection.query("SELECT user_name, user_password, user_privilege FROM users", function (err, rows, fields) {
        if (err)
            console.log(err)
        else {
            console.log("Sikeresen lekérve az adatbázisból!")
        }
    })

    connection.end()
})

app.listen(port, () => {
    console.log(`Alap backend szerver elérése: https://maro-sandor-peter.dszcbaross.tk`)
})