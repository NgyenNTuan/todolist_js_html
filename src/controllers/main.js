var taskList = new TaskList();
var validation = new Validation();
getLocalStorage();

/**
 * Get element by id
 * @param {*} id
 * @returns DOM id
 */
function getEle(id) {
   return document.getElementById(id);
}

/**
 * Get info task
 * @returns task
 */
function getInfoTask() {
   // Get value
   var taskName = getEle("newTask").value;

   // Validation
   var isValid = true;
   isValid &= validation.checkEmpty(taskName, "Please enter an activity!");

   isValid &= validation.checkExisted(taskName, "Task existed!", taskList.arr);

   if (!isValid) {
      return null;
   }
   // Create object form object class
   var task = new Task(taskName, "todo");

   return task;
}

/**
 * Add Task
 */
getEle("addItem").addEventListener("click", function () {
   var task = getInfoTask();

   if (task) {
      taskList.addTask(task);
      renderToDo(taskList.arr);
      // Clear input
      getEle("newTask").value = "";
      // Save localStorage
      setLocalStorage();
   }
});

/**
 * Delete Task
 * @param {*} event
 */
function deleteTask(event) {
   var id = event.currentTarget.getAttribute("data-index");

   taskList.deleteTask(id);
   renderToDo(taskList.arr);
   // Save localStorage
   setLocalStorage();
}

// Change Status
function changeStatus(event) {
   var id = event.currentTarget.getAttribute("data-index");
   var status = event.currentTarget.getAttribute("data-status");

   if (status === "todo") {
      var task = taskList.getTaskById(id);
      task.status = "completed";

      taskList.updateTask(task);
      renderToDo(taskList.arr);
      // Save localStorage
      setLocalStorage();
   }

   if (status === "completed") {
      var task = taskList.getTaskById(id);
      task.status = "todo";

      taskList.updateTask(task);
      renderToDo(taskList.arr);
      // Save localStorage
      setLocalStorage();
   }
}

/**
 * Sort tasks ascending
 */
function sortASC() {
   var sortArr = [];

   taskList.arr.forEach(function (task) {
      if (task.status === "todo") {
         sortArr.push(task);
      }
   });

   sortArr.sort(function (a, b) {
      var nameA = a.taskName.toLowerCase();
      var nameB = b.taskName.toLowerCase();
      if (nameA < nameB) {
         return -1;
      }

      if (nameA > nameB) {
         return 1;
      }

      return 0;
   });

   getEle("todo").innerHTML = taskList.renderTodo(sortArr);
}

/**
 * Sort tasks decrease
 */
function sortDEC() {
   var sortArr = [];

   taskList.arr.forEach(function (task) {
      if (task.status === "todo") {
         sortArr.push(task);
      }
   });

   sortArr.sort(function (a, b) {
      var nameA = a.taskName.toLowerCase();
      var nameB = b.taskName.toLowerCase();
      if (nameA > nameB) {
         return -1;
      }
      if (nameA < nameB) {
         return 1;
      }
      return 0;
   });

   getEle("todo").innerHTML = taskList.renderTodo(sortArr);
}

/**
 * Render ToDo List
 * @param {*} data
 */
function renderToDo(data) {
   getEle("todo").innerHTML = taskList.renderTodo(data);
   getEle("completed").innerHTML = taskList.renderCom(data);
}

/**
 * setLocalStorage
 */
function setLocalStorage() {
   // Convert JSON => string
   var dataString = JSON.stringify(taskList.arr);
   localStorage.setItem("TASKLIST", dataString);
}

/**
 * getLocalStorage
 * */
function getLocalStorage() {
   var dataString = localStorage.getItem("TASKLIST");
   // Convert string => JSON
   if (dataString) {
      taskList.arr = JSON.parse(dataString);

      // Render todo list
      renderToDo(taskList.arr);
   }
}
