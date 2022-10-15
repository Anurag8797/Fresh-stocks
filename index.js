const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/productList", (req, res) => {
  console.log("req.query.currentId :",req.query.currentId);
  currentId = req.query.currentId;
  const response=axios.get("https://fakestoreapi.com/products/" + currentId).then(function (response) {
    console.log(response.data);
    if(response.status==200||201)
    res.status(200).send((response.data));
    else{
      res.status(400).send({message:"No more items are present"})
    }
  });
});

app.listen(3000, (req, res) => {
  console.log("server running on port 3000");
});
