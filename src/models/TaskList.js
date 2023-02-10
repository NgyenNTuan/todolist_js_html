function TaskList() {
   // property
   this.arr = [];

   // method
   this._findIndex = function (id) {
      var index = -1;

      this.arr.forEach(function (task, i) {
         if (task.id == id) {
            index = i;
         }
      });

      return index;
   };

   this.renderTodo = function (arr) {
      if (arr) {
         var contentToDo = "";

         arr.forEach(function (task) {
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
         });

         return contentToDo;
      }
   };

   this.renderCom = function (arr) {
      if (arr) {
         var contentCom = "";

         arr.forEach(function (task) {
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

         return contentCom;
      }
   };

   this.addTask = function (task) {
      this.arr.push(task);
   };

   this.deleteTask = function (id) {
      var index = this._findIndex(id);

      if (index !== -1) {
         this.arr.splice(index, 1);
      }
   };

   this.getTaskById = function (id) {
      var index = this._findIndex(id);

      if (index !== -1) {
         return this.arr[index];
      }

      return null;
   };

   this.updateTask = function (task) {
      var index = this._findIndex(task.id);

      if (index !== -1) {
         this.arr[index] = task;
      }
   };
}
