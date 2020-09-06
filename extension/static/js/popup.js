document.addEventListener('DOMContentLoaded', function () {

}, false)

document.addEventListener('input', function (event) {
	if (event.target.tagName.toLowerCase() !== 'textarea') return;
	autoExpand(event.target);
}, false);

document.addEventListener('keypress', function (event) {
	if (event.keyCode == 13) {
	    let newNoteText = document.getElementById("newnote").value
        if (newNoteText != null && newNoteText.trim() != "") {
            newNoteText = newNoteText.replace(/</g, '&lt;').replace(/>/g, '&gt;')
                .replace(/\r?\n|\r/g, " ").trim()
            alert(newNoteText)
            chrome.storage.sync.get(['notes'], function (result) {
                if (result.notes != null) {
                    updatedNotes = result.notes;
                } else {
                    updatedNotes = [];
                }
                updatedNotes.push(newNoteText);
                chrome.storage.sync.set({'notes': updatedNotes}, function () {
                    alert("New note added!");
                })
            })
            location.reload()
        }
    }
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

function showNotes() {
    chrome.storage.sync.get(['notes'], function (result) {
        if (result.notes.length > 0) {
            for (let note in result.notes) {
                document.getElementById('notes').innerHTML += '<div class="link">' +
                    '<button class="trash">' +
                    '<i class="material-icons w3-large">delete</i></button>' + result.notes[note] + '</div>';
            }
        }
    })

    document.querySelector('.text').addEventListener('click', function (e) {
        if (e.target && e.target.matches("i")) {
            let delLink = e.target
            let note = delLink.parentElement.parentElement.innerText.substring(6)
            note = note.replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
            chrome.storage.sync.get(['notes'], function (result) {
                const newList = result.notes;
                for (var i = 0; i < newList.length; i++) {
                    if (newList[i] == note) {
                        newList.splice(i, 1);
                    }
                }
                chrome.storage.sync.set({'notes': newList}, function () {
                })
            })
        }
        location.reload()
    });
}

window.onload = function() {showNotes()};
