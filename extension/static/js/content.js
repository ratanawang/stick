if(window.location.href == 'http://127.0.0.1:5000/'){
    chrome.storage.sync.get(['notes'], function (result) {
        if (result.notes.length > 0) {
            for (let note in result.notes) {
                document.getElementById('notes').innerHTML += '<div class="link">' +
                    '<button class="trash">X</button><textarea id=' + note + '>' + result.notes[note] + '</textarea><button class="save">Edit</button></div>';
            }
        }
    })

    document.querySelector('.text').addEventListener('click', function (e) {
        if (e.target && e.target.matches(".trash")) {
            let toDelete = e.target;
            let note = toDelete.parentElement.innerText.substring(1);
            alert(note)
            note = note.substring(0, note.length-4)
            alert(note)
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
        }
    });

    document.querySelector('.text').addEventListener('click', function (e) {
        if (e.target && e.target.matches(".edit")) {
            let delLink = e.target;
            let note = delLink.parentElement.innerText.substring(1);
            note = note.substring(0, note.length-4)
            note = note.replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\r?\n|\r/g, " ").trim();
            chrome.storage.sync.get(['notes'], function (result) {
                let newList = result.notes;
                let index = newList.indexOf(note);
                alert(index)
                chrome.storage.sync.set({'notes': newList}, function () {})
            })
            delLink.parentElement.innerHTML = '<textarea></textarea>'
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.code === "Enter") {
            let newNoteText = document.activeElement.value
            if (newNoteText != null && newNoteText.trim() !== "") {
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
    }, false);

}