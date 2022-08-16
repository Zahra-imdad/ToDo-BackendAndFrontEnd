const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const TodoApi = require('./routes/api')


  
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json())

app.use('/api', TodoApi)

app.use((req, res) => {
    res.status(404).send("PAGE NOT FOUND");
});
  


app.listen(3000, () => {
    console.log('Express Running');
});