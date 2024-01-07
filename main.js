const todoBoxContainer = document.querySelector("#todo-box");
const addBtn = document.querySelector("#add-btn");

let database = JSON.parse(localStorage.getItem("database")) || [
  {
    name: "User 1",
    userId: "lasfwoifjsfnwoi",
    email: "user1@gmail.com",
    password: "user12345",
    todos: [
      {
        id: 1,
        title: "Complete Javascript",
        isChecked: false,
        text: "This is demo",
        createdAt: "2023-01-01T12:00:00Z",
      },
      {
        id: 2,
        title: "Complete Todo Application",
        isChecked: false,
        text: "This is demo",
        createdAt: "2024-01-05T12:44:38.768Z",
      },
    ],
  },
  {
    name: "User 2",
    userId: "lasfwoifjsfnwoidfsd",
    email: "user2@gmail.com",
    password: "user12345",
    todos: [
      {
        id: 1,
        title: "Complete Javascript",
        isChecked: false,
        text: "This is demo",
        createdAt: "2023-01-01T12:00:00Z",
      },
      {
        id: 2,
        title: "Complete Todo Application",
        isChecked: false,
        text: "This is demo",
        createdAt: "2024-01-05T12:44:38.768Z",
      },
    ],
  },
];

// localStorage.setItem("database", JSON.stringify(database))
// time difference

const getTimeDifferenceString = (createdAt) => {
  const now = new Date();
  const millisecondsDifference = now - createdAt;

  const seconds = Math.floor(millisecondsDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (seconds > 0) {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  } else {
    return "Just Now";
  }
};

// load todo

const loadTodo = async () => {
  const userID = JSON.parse(localStorage.getItem("user"));
  const user = database.filter((user) => user.userId == userID);
  user[0]?.todos.length > 0
    ? user[0]?.todos.forEach((el) => {
        const { id, title, isChecked, createdAt } = el;
        const singleTodo = ` <div class="list mt-8 bg-gray-600 py-4 px-4 rounded-[10px] text-white">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <input data-id=${id} ${
          isChecked ? "checked" : ""
        } class="input-box" type="checkbox" value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="checked-checkbox"
              class="ml-4 text-2xl font-medium text-gray-900 dark:text-gray-300">${id} : ${title}</label>
          </div>
          <div class="flex justify-between items-center rounded-[10px]">
            <button class="bg-gray-800 px-6 py-2 rounded-full" onClick="editTodo(${id})" >Edit</button>
            <button class="ml-5 bg-red-800 px-6 py-2 rounded-full" onClick="deleteTodo(${id})" >Delete</button>
          </div>
        </div>
         <h4 class="block mb-2 mt-5 mx-auto">${getTimeDifferenceString(
           new Date(createdAt)
         )}</span>
      </div>`;

        todoBoxContainer.innerHTML = todoBoxContainer.innerHTML + singleTodo;
      })
    : (todoBoxContainer.innerHTML = `<h2 class="text-2xl text-white  mt-8 mb-5">No todo list found. Please add One</h2>`);

  // implement checkbox
  const inputBoxes = document.querySelectorAll("input");
  inputBoxes.forEach((item) => {
    item.addEventListener("change", function (e) {
      // save to db
      const [elem] = todoList.filter(
        (el) => el.id != item.getAttribute("data-id")
      );
      elem.isChecked = this.checked;
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
  todoBoxContainer.innerHTML = "";
  loadTodo();
};

// add new todo

addBtn.addEventListener("click", () => {
  const title = window.prompt("Enter your todo:");

  const userID = JSON.parse(localStorage.getItem("user"));
  const user = database.filter((user) => user.userId == userID);
  
  const newTodo = {
    id: user[0].todos.length + 1,
    title,
    isChecked: false,
    createdAt: new Date(),
  };

  
  user[0].todos.push(newTodo);

  localStorage.removeItem("database");
  localStorage.setItem("database", JSON.stringify(database));

  refreshTodo();
});

// edit todo
const editTodo = (id) => {
  const [elem] = todoList.filter((el) => el.id == id);
  const newText = window.prompt(
    `${id} - ${elem.title}. Enter your edited text:`
  );
  if (newText !== "") {
    elem.title = newText;
  }
  localStorage.clear();
  localStorage.setItem("todoList", JSON.stringify(todoList));
  refreshTodo();
};

// delete todo
const deleteTodo = (id) => {
  window.confirm("Are you sure to delete!");
  const newTodoList = todoList.filter((el) => el.id !== id);
  todoList = newTodoList;
  localStorage.clear();
  localStorage.setItem("todoList", JSON.stringify(todoList));
  refreshTodo();
};

// setTimeout(() => {
//   location.reload();
// }, (1000));

const handleLogin = () => {
  const email = window.prompt("Enter your email");
  const pass = window.prompt("Enter your password");
  const user = database.filter((user) =>
    user.email == email && user.password == pass ? user : false
  );

  if (user.length > 0) {
    localStorage.setItem("user", JSON.stringify(user[0].userId));
    changeUi();
  } else {
    window.alert("Please check your email and password");
  }

  refreshTodo();
};

const handleLogout = () => {
  localStorage.removeItem("user");
  changeUi();
  refreshTodo();
};

function generateUserID(prefix = "user") {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 1000); // Add randomness for uniqueness

  return `${prefix}_${timestamp}_${randomSuffix}`;
}

const handleRegister = () => {
  const name = window.prompt("Enter your name");
  const email = window.prompt("Enter your email");
  const password = window.prompt("Enter your password");
  const userId = generateUserID();
  if (name && email && password) {
    const newUser = { userId, name, email, password, todos: [] };
    database.push(newUser);
    localStorage.clear();
    localStorage.setItem("database", JSON.stringify(database));
    localStorage.setItem("user", JSON.stringify(userId));
    changeUi();
  } else {
    return;
  }
};

const changeUi = () => {
  const userID = JSON.parse(localStorage.getItem("user"));
  if (userID) {
    const user = database.filter((user) => user.userId == userID);
    document.querySelector("#navbar").innerHTML = `
  <button class="px-6 text-2xl py-2 capitalize rounded-full" >${user[0].name}</button>
  <button class="ml-5 bg-red-800 px-6 py-2 rounded-full" onClick="handleLogout()">Logout</button>
  `;
  } else {
    document.querySelector(
      "#navbar"
    ).innerHTML = `<button class="bg-gray-800 px-6 py-2 rounded-full" onClick="handleLogin()">LogIn</button>
      <button class="ml-5 bg-red-800 px-6 py-2 rounded-full" onClick="handleRegister()">Register</button>`;
  }
  refreshTodo;
};

changeUi();
