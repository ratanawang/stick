document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.addNewNote').addEventListener('click', onclick, false);
  function onclick() {
      var newNoteText = document.getElementById("newnote").value
      alert(newNoteText)
  }
}, false)