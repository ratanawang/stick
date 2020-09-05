document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.addNewNote').addEventListener('click', onclick, false);
  function onclick() {
      let newNoteText = document.getElementById("newnote").value
      if(newNoteText!=null && newNoteText!=""){
          alert(newNoteText)
          chrome.storage.sync.get(['notes'], function (result) {
              if(result.notes != null){
                  updatedNotes = result.notes;
              }
              else{
                  updatedNotes = [];
              }
              updatedNotes.push(newNoteText);
              chrome.storage.sync.set({'notes': updatedNotes}, function () {
                  alert("New note added!");
              })
          })
      }

  }
}, false)

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.viewNotes').addEventListener('click', onclick, false)
    function onclick () {
        window.location.href="notes.html";
    }
}, false)
