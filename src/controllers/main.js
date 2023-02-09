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
 * Render ToDo List
 * @param {*} data
 */
function renderToDo(data) {
   var contentToDo = "";
   var contentCom = "";
   if (data) {
      data.forEach((task) => {
         if (task.status === "todo") {
            contentToDo += `
               <li>
                  <span>${task.taskName}</span>
                  <div class="buttons">
                     <button class="remove" data-index="${task.id}" data-status="${task.status}" onclick="deleteTask(event)">
                        <i class="fa fa-trash-alt"></i>
                     </button>
                     <button class="complete" data-index="${task.id}" data-status="${task.status}" onclick="changeStatus(event)">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-check-circle"></i>
                     </button>
                  </div>
               </li>
            `;
         }
         if (task.status === "completed") {
            contentCom += `
               <li>
                  <span>${task.taskName}</span>
                  <div class="buttons">
                     <button class="remove" data-index="${task.id}" data-status="${task.status}" onclick="deleteTask(event)">
                        <i class="fa fa-trash-alt"></i>
                     </button>
                     <button class="complete" data-index="${task.id}" data-status="${task.status}" onclick="changeStatus(event)">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-check-circle"></i>
                     </button>
                  </div>
               </li>
            `;
         }
      });

      getEle("todo").innerHTML = contentToDo;
      getEle("completed").innerHTML = contentCom;
   }
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
