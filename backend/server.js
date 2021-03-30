const PORT = 3000;
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

// Connect to server
app.listen(PORT, () => {
  console.log(`Server up and running on http://localhost:${PORT}`);
});
 
//Routes
routes.get("/", (req, res) => {
  res.send("Hello World Root!");
});

routes.get("/products", (req, res) => {
    res.send("Liste de produits");
  });


// Connect to DB  
client.connect(err => {
  if(err) {
    throw Error(err);
  }
  const collection = client.db("marketplace").collection("products")
  console.log(`Successfully connected to database`);
  
  // perform actions on the collection object
  client.close();
});
