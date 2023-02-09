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
