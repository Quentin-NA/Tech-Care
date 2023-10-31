const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const pool = mysql.createPool({
    connectionLimit: 10000,
    host: "localhost", // Correction : il faut utiliser "host" au lieu de "hostname"
    user: "root",
    password: "",
    database: "techcare",
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.get("/allreceipts", (req, res) => {
    const getReceipts = "SELECT id, first_name, last_name, type, model, failure, price, comment, email, phone FROM receipts"
    pool.query(getReceipts, (err, result) => {
        res.send(result)
        console.log(result)
    });
});



app.post("/receipts", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const type = req.body.type;
    const model = req.body.model;
    const failure = req.body.failure;
    const price = req.body.price;
    const comment = req.body.comment;
    const email = req.body.email;
    const phone = req.body.phone;
    
    const sqlInsertReceipts = "INSERT INTO receipts (first_name, last_name, type, model, failure, price, comment, email, phone) VALUES (?,?,?,?,?,?,?,?,?)";
    
    pool.query(sqlInsertReceipts, [firstName, lastName, type, model, failure, price, comment, email, phone], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erreur lors de l'insertion des données." });
        } else {
            const newReceiptId = result.insertId; // Récupérez l'ID généré
            res.status(200).json({ message: "Données insérées avec succès.", id: newReceiptId });
        }
    });
});


app.get("/receipt/:id", (req, res) => {
    let id = req.params.id;
    pool.query(
        "SELECT first_name, last_name, type, model, failure, price, comment, email, phone FROM receipts WHERE receipts.id = ?",
        [id],
        function (error, result, fields) {
            res.send(result);  
    });
});


//   app.get("/receipt/:id", (req, res) => {
//     let id = req.params.id;
//     console.log("Requête pour la route /receipt/" + id);
//     // ... Autres opérations de récupération des données du reçu
// });


app.listen("3001", () => {
    console.log('Le serveur écoute sur le port http://localhost:3001');
});
