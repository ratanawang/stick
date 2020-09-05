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

document.addEventListener('input', function (event) {
	if (event.target.tagName.toLowerCase() !== 'textarea') return;
	autoExpand(event.target);
}, false);


let autoExpand = function (field) {

	// Reset field height
	field.style.height = 'inherit';

	// Get the computed styles for the element
	let computed = window.getComputedStyle(field);

	// Calculate the height
	let height = parseInt(computed.getPropertyValue('border-top-width'), 10)
	             + parseInt(computed.getPropertyValue('padding-top'), 10)
	             + field.scrollHeight
	             + parseInt(computed.getPropertyValue('padding-bottom'), 10)
	             + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

	field.style.height = height + 'px';
};
