function showBlacklist() {
    chrome.storage.sync.get(['blacklist'], function (result) {
        if (result.blacklist.length > 0) {
            for (var link in result.blacklist) {
                document.getElementById('sitelist').innerHTML += '<div class="link">' +
                    '<button class="trash">' +
                    '<i class="material-icons w3-large">delete</i></button>' + result.blacklist[link] + '</div>';
            }
        } else {
            document.getElementById('sitelist').innerHTML = "You have not blacklisted any website."
        }
    })

    document.querySelector('.text').addEventListener('click', function (e) {
        if (e.target && e.target.matches("i")) {
            let delLink = e.target
            let url = delLink.parentElement.parentElement.innerText.substring(7)
            chrome.storage.sync.get(['blacklist'], function (result) {
                const newList = result.blacklist;
                for (var i = 0; i < newList.length; i++) {
                    if (newList[i] == url) {
                        newList.splice(i, 1);
                    }
                }
                chrome.storage.sync.set({'blacklist': newList}, function () {
                })
            })
            chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
                    chrome.tabs.sendMessage(tabs[0].id, {message: "sendDeleteMessage"});
            })
        }
    });
}

window.onload = function() {showBlacklist()};
