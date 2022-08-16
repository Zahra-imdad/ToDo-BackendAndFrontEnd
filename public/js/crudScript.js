class Todo {
  constructor() {
    this.input = document.getElementById("todoInput");
    this.addBtn = document.getElementById("button");
    this.todoList = document.getElementById("todoList");
    
    this.ShowTodo();
    this.addListEvent();
  }

  addListEvent() {
    this.addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.addToDo();
    });
  }

  //========================================================
  //======================SEE ALL TODOS IN CONSOLE==========
  //========================================================

  ShowTodoConsole() {
    fetch("http://localhost:3000/api/all_todo")
      .then((res) => res.json())
      .then((data) => console.log(data.todos));
  }

  //========================================================
  //======================SHOW ALL TODOS====================
  //========================================================

  ShowTodo() {
    
    fetch("http://localhost:3000/api/all_todo", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        data.todos.forEach((todo) =>
          this.createLi(todo.task, todo.done, todo.id)
        );
      });
  }

   //========================================================
  //======================ADD TODO============================
  //==========================================================
  addToDo() {
    const typedtTask = this.input.value.trim();

    if (typedtTask === "") {
      alert("Write Something !!");
    } else {
      
      fetch("http://localhost:3000/api/add_todo", {
        method: "POST",
        body: JSON.stringify({ task: typedtTask }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }).then(this.ShowTodoConsole);
      this.createLi();
    }
    this.input.value = "";
  }

  createLi(typedtTask, done = false, id) {
    globalThis.li = document.createElement("li");
    li.setAttribute("data-id", `${id}`);
   
    li.className = "list-group-item d-flex justify-content-between p-3";
    li.innerHTML = `<span>
                        <input type="checkbox" class="checkboxs"/>
                        <div class="edit-input d-inline d-none" data-updatedId="${id}">
                            <input type="text" placeholder="Updated value" />
                            <button class="btn btn-sm btn-primary">Update</button>
                            <button class="btn btn-sm btn-danger">Cancel</button>
                        </div>
                        <p class="todo-input d-inline">${typedtTask}</p>
                        </span>
                        <div>
                        <i class="bi bi-pencil-square"></i>
                        <i class="bi bi-trash"></i>
                        </div>`;
    todoList.append(li);

    this.edit = li.querySelector("div > i:first-child");
    this.trash = li.querySelector("div > i:last-child");
    this.editInput = li.querySelector(".edit-input>input");
    this.p = li.querySelector("p.todo-input");
    this.editContainer = li.querySelector(".edit-input");
    this.editInput = li.querySelector(".edit-input>input");
    this.checkbox = li.querySelector('input[type="checkbox"]');
    this.updateBtn = li.querySelector(".edit-input>button.btn-primary");
    this.cancelBtn = li.querySelector(".edit-input>button.btn-danger");

    this.removeToDo(this.trash, li);
    this.tickCheckBox(this.checkbox, this.p);
    this.editToDo(this.edit, this.p, this.editInput);
    this.cancelEdit(this.cancelBtn,this.p,this.editContainer)
    this.updateEdit(this.updateBtn, this.p, this.editInput, li);

  }

  //========================================================
  //======================DELETE ONE TODO===================
  //========================================================

  removeToDo(btn, element) {
    btn.addEventListener("click", () => {
      console.log("Console: ", element.id);
      element.remove();
      fetch(`http://localhost:3000/api/todo/${element.dataset.id}`, {
        method: "DELETE",
      }).then(this.ShowTodoConsole);
    });
  }

 //========================================================
  //======================UPDATE TODO=======================
  //========================================================
  updateEdit(updateBtn, p, editInput, element) {
    updateBtn.addEventListener("click", (e) => {
      let editedValue = editInput.value;
      let ids = element.getAttribute("data-id");
      ids = parseInt(ids);
      let updatedTask = this.input.value.trim();
      updatedTask = editedValue;
      p.textContent = editedValue;
      this.toggleEditContainer(p.previousElementSibling, p);
      let newDone = false;
      if (this.checkbox.checked) {
        console.log("checked");
        newDone = true;
      }
      fetch("http://localhost:3000/api/update_todo", {
        method: "PUT",
        body: JSON.stringify({
          updatedTask: updatedTask,
          todoId: ids,
          updatedDone: newDone,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }).then(this.ShowTodoConsole);
    });
  }

  //========================================================
  //==================Strike text on checkbox checked=======
  //========================================================
  tickCheckBox(checkbox, p) {
    checkbox.addEventListener("change", (e) => {
      p.classList.toggle("done"); // e.target.checked
    });
  }

  editToDo(btn, p, editInput) {
    btn.addEventListener("click", () => {
      editInput.value = p.textContent.trim();
      this.toggleEditContainer(editInput.parentElement, p);
    });
  }

  toggleEditContainer(editContainer, p) {
    p.classList.toggle("d-none");
    editContainer.classList.toggle("d-none");
  }

  cancelEdit(cancelBtn,p,editContainer) {
    cancelBtn.addEventListener("click", () => {
        p.classList.toggle("d-none");
        editContainer.classList.toggle("d-none");
    });
  }
  
}

const todo = new Todo();
