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
function displayTvShows(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var tvshowInfo = "";
    var x = xmlDoc.getElementsByTagName("tvshow");
    for (i = 0; i < x.length; i++) {
        tvshowInfo += "<ul><li><a href=\"" + 
            x[i].getElementsByTagName("tvshow-url")[0].childNodes[0].nodeValue + "\">" +
            x[i].getElementsByTagName("tvshow-title")[0].childNodes[0].nodeValue +
            "</a></li></ul>";
    }
    document.getElementById("tvshows").innerHTML = tvshowInfo;
}