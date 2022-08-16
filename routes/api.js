const express = require('express')
const router = express.Router()
const path = require("path");
const app = express();
const bodyParser = require('body-parser')
//const crudScript = require('../view/crudScript')

const apiController = require("../controller/crud-controller")

app.use(bodyParser.urlencoded({extended:false}))

router.get('/todo',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','view','crud.html'))
})

router.post('/todo',apiController.AddTodo)

 router.get('/all_todo', apiController.allTodos)

 router.get('/todo/:todoId', apiController.singleTodo)

 router.post('/add_todo', apiController.AddTodo)

 router.put('/update_todo', apiController.updateTodo)

router.delete('/todo/:todoId', apiController.deleteTodo)

module.exports = router