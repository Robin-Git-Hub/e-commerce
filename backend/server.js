
const PORT = 5000;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const routes = express.Router();
app.use("/api", routes);

// body-parser
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());
const jsonParser = bodyParser.json();

//cors
routes.use(cors());

// mongoDB client
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://robin:241190@marketplaceproject.9dy5z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// connect to server
app.listen(PORT, () => {
  console.log(`Server up and running on http://localhost:${PORT}`);
});

// connect to DB
const DATABASE = "marketplace";
client.connect((err) => {
  if (err) {
    throw Error(err);
  }
  !err && console.log(`Successfully connected to database`);
  const db = client.db(DATABASE);
  const products = db.collection("products");
  const users = db.collection("users");
  const orders = db.collection("orders");

  // perform actions on the collection object

  // GET
  routes.get("/products", function (req, res) {
    products
      .find()
      .toArray()
      .then((error, results) => {
        if (error) {
          return res.send(error);
        }
        res.status(200).send({ results });
      })
      .catch((err) => res.send(err));
  });
  //route to get the user's profile with email
  routes.get("/user/:email", function (req, res) {
    users
      .findOne({ email: req.params.email  }) //retrieve user profile with email
      .then((error, results) => {
        if (error) {
          return res.send(error);
        }
        return res.status(200).send(results.data);
      })
      .catch((err) => res.send(err));
  });

  // POST
  const exampleObj = {
    id: 29999,
    category: "Clothes",
    name: "Winter Jacket for Women, All sizes",
    price: 79,
  };
  routes.post("/products/add", jsonParser, function (req, res) {
    products
      .insertOne(req.body)
      .then(() => res.status(200).send("successfully inserted new document"))
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });
  routes.post("/users/add", jsonParser, function (req, res) {
    users
      .insertOne(req.body)
      .then(() => res.status(200).send("successfully inserted new document"))
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });
  routes.post("/orders/add", jsonParser, function (req, res) {
    orders
      .insertOne(req.body)
      .then(() => res.status(200).send("successfully inserted new document"))
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });
});

//stripe
const stripe = require('stripe')('sk_test_51Ig7X1HoFREscj396x4na3OLteEoDR9dRu40eNGj1uYgspLiYUgntiq2kJTr1veENe6KPLJWImERAc8zZ14Oclsy00ipkXWqiA');
const YOUR_DOMAIN = "http://localhost:3000";

routes.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: req.body,
    mode: 'payment', 
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}`,
  });
  res.json({ id: session.id });
});
app.listen(4242, () => console.log('Running on port 4242'));

//routes
routes.get("/", (req, res) => {
  res.send("Hello World!");
});
