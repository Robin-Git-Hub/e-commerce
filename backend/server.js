const PORT = 5000;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//Use application middleware Router
const routes = express.Router()
app.use("/api", routes);


//Body-parser
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());
 
//Cors
routes.use(cors());
 
//Mango DB CLIENT
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://robin:241190@marketplaceproject.9dy5z.mongodb.net/marketplace?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const DATABASE = 'marketplace';
// Connect to server
app.listen(PORT, () => {
  console.log(`Server up and running on http://localhost:${PORT}`);
});
 
//Routes
routes.get("/", (req, res) => {
  res.send("Hello World Root!");
});

// Connect to DB  
client.connect(err => {
  if(err) {
    throw Error(err);
  }
  !err && console.log(`Successfully connected to database`);
  const products = client.db(DATABASE).collection("products");

  // perform actions on the collection object
  routes.get("/products", (req, res) => {
    products
    .find()
    .toArray()
    .then((error, results) => {
      if (error) { return res.send(error)}
      res.statut(200).send({ results});
    })
    .catch((err) => res.send(err)); 
  });

  routes.post("/products/add", function (req, res) {
    products.insertOne()
    .then((error, result) => {
      if(error) {
        return res.send(error);
      }
        return res.status(200).send("successfully inserted new document");
      })
      .catch((err) => res.send(err));
  });

  // client.close();
});
