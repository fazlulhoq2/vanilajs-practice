const todoBoxContainer = document.querySelector("#todo-box");
const addBtn = document.querySelector("#add-btn");

let todoList = [
  {
    id: 1,
    title: "Complete Javascript",
    isChecked: false
  },
  {
    id: 2,
    title: "Complete Todo Application",
    isChecked: false
  }
]





// load todo

const loadTodo =  async () => {
  todoList.forEach(el => {
    const { id, title, isChecked } = el;
    const singleTodo =` <div class="list mt-8 bg-gray-600 py-4 px-4 rounded-[10px] text-white">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <input data-id=${id} ${isChecked ? "checked" : ""} class="input-box" type="checkbox" value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="checked-checkbox"
              class="ml-4 text-2xl font-medium text-gray-900 dark:text-gray-300">${id} : ${title}</label>
          </div>
          <div class="flex justify-between items-center rounded-[10px]">
            <button class="bg-gray-800 px-6 py-2 rounded-full" onClick="editTodo(${id})" >Edit</button>
            <button class="ml-5 bg-red-800 px-6 py-2 rounded-full" onClick="deleteTodo(${id})" >Delete</button>
          </div>
        </div>
      </div>`
    
    todoBoxContainer.innerHTML = todoBoxContainer.innerHTML + singleTodo;
  });


  // implement checkbox 
  const inputBoxes = document.querySelectorAll('input');
  inputBoxes.forEach(item => {
    item.addEventListener('change', function (e) {
      // save to db 
      const [elem] = todoList.filter(el => el.id != item.getAttribute("data-id"))
      elem.isChecked = this.checked
      console.log(todoList);
  //    localStorage.clear();
  // localStorage.setItem("todoList", JSON.stringify(todoList));
    // change 
    // if(this.checked) {
    //   item.parentElement.querySelector("label").style.textDecoration = 'line-through';
    // }else {
    //   item.parentElement.querySelector("label").style.textDecoration = 'none';
    // }
  });
  });


};

loadTodo();

const refreshTodo = () => {
  todoBoxContainer.innerHTML = '';
  loadTodo();
}


// add new todo

addBtn.addEventListener("click", () => {
  const title = window.prompt("Enter your todo:");
  const newTodo = {
    id: todoList.length + 1,
    title,
    isChecked: false
  };
  todoList.push(newTodo)
  localStorage.clear();
  localStorage.setItem("todoList", JSON.stringify(todoList));
  refreshTodo();
})


// edit todo 
const editTodo = (id) => {
  const [ elem ] = todoList.filter(el => el.id == id);
  const newText = window.prompt(`${id} - ${elem.title}. Enter your edited text:`);
  if (newText !== '') {
    elem.title = newText;
  }
  localStorage.clear();
  localStorage.setItem("todoList", JSON.stringify(todoList));
  refreshTodo();
};


// delete todo 
const deleteTodo = (id) => {
  window.confirm("Are you sure to delete!")
  const newTodoList = todoList.filter(el => el.id !== id);
  todoList = newTodoList;
   localStorage.clear();
  localStorage.setItem("todoList", JSON.stringify(todoList));
  refreshTodo();
}


