if(window.location.href == 'http://127.0.0.1:5000/'){
    chrome.storage.sync.get(['notes'], function (result) {
        if (result.notes.length > 0) {
            for (let note in result.notes) {
                document.getElementById('notes').innerHTML += '<div class="link">'
                    + '<button class="trash">X</button><textarea class="textarea-note" contenteditable="true" id=' + note + '>'
                    + result.notes[note] + '</textarea></div>';
            }
        }
    })

    document.querySelector('.text').addEventListener('click', function (e) {
        if (e.target && e.target.matches(".trash")) {
            let note = document.activeElement.nextElementSibling.value;
            note = note.replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\r?\n|\r/g, " ").trim();
            chrome.storage.sync.get(['notes'], function (result) {
                let newList = result.notes;
                for (let i = 0; i < newList.length; i++) {
                    if (newList[i] === note) {
                        newList.splice(i, 1);
                        break;
                    }
                }
                chrome.storage.sync.set({'notes': newList}, function () {})
            })
            location.reload()
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.code === "Enter") {
            let editedText = document.activeElement.value
            if (editedText != null && editedText.trim() !== "") {
                if (document.activeElement.id !== "newnote") {
                    editedText = editedText.replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/\r?\n|\r/g, " ").trim();
                    chrome.storage.sync.get(['notes'], function (result) {
                        let updatedNotes = result.notes;
                        index = parseInt(document.activeElement.id)
                        updatedNotes[index] = editedText;
                        chrome.storage.sync.set({'notes': updatedNotes}, function () {
                            // alert("New note added!");
                        })
                    })
                    location.reload()
                }
                else {
                    let newNoteText = document.getElementById("newnote").value
                    newNoteText = newNoteText.replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/\r?\n|\r/g, " ").trim();
                    chrome.storage.sync.get(['notes'], function (result) {
                        let updatedNotes;
                        if (result.notes != null) {
                            updatedNotes = result.notes;
                        } else {
                            updatedNotes = [];
                        }
                        updatedNotes.push(newNoteText);
                        chrome.storage.sync.set({'notes': updatedNotes}, function () {
                            // alert("New note added!");
                        })
                    })
                    location.reload()
                }
            }
        }
    }, false);

}
