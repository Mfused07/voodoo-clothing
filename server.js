//Setup Node Server
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

if (process.env.NODE_ENV != "production") require("dotenv").config();
//if we are in testing then add secret key

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json()); //fetch and convert to json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors()); //cross origin req, checks to make sure origin is same if not it denies req

//lets serve client app

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  //use this route
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port" + port);
});

//PAYMENT ROUTE
//make post Route -> reciv actual req from client to route /payment, send Response
app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id, //body holds info
    amount: req.body.amount,
    currency: "usd",
  };
  //now pass it to stripe lib on line 10

  //lets make charge , wait for error else make charge and respond back
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
