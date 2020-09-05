function showNotes() {
    chrome.storage.sync.get(['notes'], function (result) {
        if (result.notes.length > 0) {
            for (let note in result.notes) {
                document.getElementById('notes').innerHTML += '<div class="link">' +
                    '<button class="trash">' +
                    '<i class="material-icons w3-large">delete</i></button>' + result.notes[note] + '</div>';
            }
        } else {
            document.getElementById('notes').innerHTML = "You have no notes."
        }
    })

    document.querySelector('.text').addEventListener('click', function (e) {
        if (e.target && e.target.matches("i")) {
            let delLink = e.target
            let note = delLink.parentElement.parentElement.innerText.substring(6)
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
