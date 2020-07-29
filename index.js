const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const user= process.env.DB_USER;
const pass= process.env.DB_PASS;
const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });

app.use(cors());

app.use(bodyParser.json());

const users = ["Asad", "Abu", "Sobur", "Sober", "Sabita"];


app.get('/products', (req,res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        // perform actions on the collection object
        collection.find().limit(5).toArray((err, documents) => {
            if(err){
                console.log(err);
                res.status(500).send({message: err});
            }
            else{
                res.send(documents);
            }
        })
        client.close();
    });
});

app.get('/user/:id', (req, res) => {
    const Id = req.params.id;
    const name = users[Id];
    res.send({Id, name});
})


//post
app.post('/addProduct', (req, res) => {
    //save to database
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        // perform actions on the collection object
        collection.insertOne(product, (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({message: err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        client.close();
      });
      

    
})

const port = process.send.PORT || 3000;
app.listen(port, () => console.log('Listening to port 3000'));