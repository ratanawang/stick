function getword(info,tab) {
    if (info.selectionText.trim() != null) {
        info.selectionText = info.selectionText.replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/\r?\n|\r/g, " ").trim()
        alert(info.selectionText)
        chrome.storage.sync.get(['notes'], function (result) {
            if (result.notes != null) {
                updatedNotes = result.notes;
            } else {
                updatedNotes = [];
            }
            updatedNotes.push(info.selectionText);
            chrome.storage.sync.set({'notes': updatedNotes}, function () {
                alert("New note added!");
            })
        })
        location.reload()
    }
    else {
        alert("Invalid note.")
    }
}
chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create({
        title: "Add as new note",
        contexts: ["selection"],
        onclick: getword
    });
});