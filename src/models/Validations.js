function Validation() {
   this.checkEmpty = function (value, mess) {
      if (value === "") {
         alert(mess);
         return false;
      }
      return true;
   };

   this.checkExisted = function (value, mess, arr) {
      var exist = false;

      if (arr) {
         for (var i = 0; i < arr.length; i++) {
            var task = arr[i];
            if (task.taskName.toLowerCase() === value.toLowerCase()) {
               exist = true;
               break;
            }
         }
      }

      if (exist) {
         alert(mess);
         return false;
      }

      return true;
   };
}
