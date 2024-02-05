document.addEventListener("DOMContentLoaded", function () {
    var conferenceListElement = document.getElementById("conferenceList");
    var journalListElement = document.getElementById("journalList");
    var posterListElement = document.getElementById("posterList");
    fetch("assets/publications.txt")
        .then((response) => response.text())
        .then((data) => {
            var items = data.split("\n");
            var itemString = "";
            for (var i = 0; i < items.length; i += 1) {
                var colonIndex = items[i].indexOf(":");

                if (colonIndex === -1) {
                    continue;
                }

                var parsedString = items[i].substring(colonIndex + 1).trim();
                if (items[i].substring(0, 4) !== "type") {
                    if (items[i].substring(0, 5) === "title") {
                        itemString += "<b>" + parsedString + "</b><br />";
                    } else {
                        itemString += parsedString + "<br />";
                    }
                    continue;
                }
                var li = document.createElement("li");
                li.innerHTML = itemString;
                switch (parsedString.charAt(0)) {
                    case "c":
                        conferenceListElement.appendChild(li);
                        break;
                    case "j":
                        journalListElement.appendChild(li);
                        break;
                    case "p":
                        posterListElement.appendChild(li);
                        break;
                    default:
                        console.error("Type Err");
                        break;
                }
                itemString = "";
            }
        })
        .catch((error) => console.error(error));
});
