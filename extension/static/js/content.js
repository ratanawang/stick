if(window.location.href == 'http://127.0.0.1:5000/'){
    chrome.storage.sync.get(['notes'], function (result) {
        if (result.notes.length > 0) {
            for (let note in result.notes) {
                document.getElementById('notes').innerHTML += '<div class="link">' +
                    '<button class="trash">X</button><textarea id=' + note + '>' + result.notes[note] + '</textarea></div>';
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
            let newNoteText = document.activeElement.value
            if (newNoteText != null && newNoteText.trim() !== "") {
                newNoteText = newNoteText.replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/\r?\n|\r/g, " ").trim();
                chrome.storage.sync.get(['notes'], function (result) {
                    let updatedNotes = result.notes;
                    index = parseInt(document.activeElement.id)
                    updatedNotes[index] = newNoteText;
                    chrome.storage.sync.set({'notes': updatedNotes}, function () {
                        // alert("New note added!");
                    })
                })
                location.reload()
            }
        }
    }, false);

}