let todos = require('../model/crud-model');
let lastTodoId=3;

const todoValidations = require('../validations/crud-validations')

module.exports = {
    allTodos: (req, res) => {
        res.json({ todos: todos })
    },

    singleTodo:(req, res) => {
        const todoId = parseInt(req.params.todoId);
        const todo  = todos.find((todo) => todo.id === todoId);
        if (todo) {
          res.json({ todo: todo });
        } else {
          res.json({ error: true, message: 'Todo not found' })
        }
      },

      AddTodo:(req, res,next) => {
        const errors = todoValidations.validate(req.body,{abortEarly:false})
        console.log(errors.error)
        if (errors.error) {
          const allErrors = errors.error.details.map(err => err.message)
          next({ status: 500, message: allErrors })
          return;
      }
        const todo = req.body
        console.log(todo)
        todo.id = lastTodoId
        lastTodoId++
        todo.done=false
        todos.push(todo)
        res.json({ Message: "Todo succesfully Added" })
      },

      updateTodo:(req, res,next) => {
      
        const todoId = req.body.todoId
        const updatedTask = req.body.updatedTask
        console.log(updatedTask)
        const updatedDone = req.body.updatedDone
        console.log(updatedDone)
        const todo = todos.find((todo) => todo.id === todoId)
        if (todo) {
            todo.task = updatedTask
            todo.done = updatedDone
            res.json({ success: true, message: `The Todo is updated to ${updatedTask}`});
        }
        else {
          next({statue:404,message:"Todo not found"})
        }
      },

      deleteTodo:(req, res) => {
        const todoId = parseInt(req.params.todoId);
        const newTodo = todos.filter(todo => todo.id != todoId);
        todos = newTodo;
        res.json({ success:1, message: 'Todo deleted' });
      }
}