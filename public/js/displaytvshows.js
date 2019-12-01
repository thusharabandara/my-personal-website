function loadTvShows() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            displayTvShows(this);
        }
    };
    xmlhttp.open("GET", "../../public/xml/tvshows.xml", true);
    xmlhttp.send();
}
// Get an array with unique values
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function displayTvShows(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var title_tags = xmlDoc.getElementsByTagName("tvshow-title");

    var first_letters = [];

    for (i = 0; i < title_tags.length; i++) {
        first_letters.push(title_tags[i].childNodes[0].nodeValue.charAt(0));
    }

    var dist_letters = first_letters.filter(onlyUnique);
    dist_letters.sort();

    var x, y;
    var tvshows = xmlDoc.getElementsByTagName("tvshow");

    var tvshowInfo = "";

    for (x = 0; x < dist_letters.length; x++) {
        tvshowInfo += "<h2>" + dist_letters[x] + "</h2>";

        for (y = 0; y < tvshows.length; y++) {
            if (dist_letters[x] == tvshows[y].getElementsByTagName("tvshow-title")[0].childNodes[0].nodeValue.charAt(0)) {
                tvshowInfo += "<ul><li><a href=\"" +
                    tvshows[y].getElementsByTagName("tvshow-url")[0].childNodes[0].nodeValue + "\" target=\"_blank\">" +
                    tvshows[y].getElementsByTagName("tvshow-title")[0].childNodes[0].nodeValue +
                    "</a></li></ul>";
            }
        }
    }
    document.getElementById("tvshows").innerHTML = tvshowInfo;
}
