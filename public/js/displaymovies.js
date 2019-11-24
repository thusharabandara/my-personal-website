function loadMovies() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            displayMovies(this);
        }
    };
    xmlhttp.open("GET", "../../public/xml/movies.xml", true);
    xmlhttp.send();
}
function displayMovies(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var movieInfo = "";
    var x = xmlDoc.getElementsByTagName("movie");
    for (i = 0; i < x.length; i++) {
        movieInfo += "<ul><li><a href=\"" + 
            x[i].getElementsByTagName("movie-url")[0].childNodes[0].nodeValue + "\">" +
            x[i].getElementsByTagName("movie-title")[0].childNodes[0].nodeValue + " (" +
            x[i].getElementsByTagName("released-year")[0].childNodes[0].nodeValue + ")" +
            "</a></li></ul>";
    }
    document.getElementById("movies").innerHTML = movieInfo;
}