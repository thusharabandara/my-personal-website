function loadBooks() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            displayBooks(this);
        }
    };
    xmlhttp.open("GET", "../../public/xml/books.xml", true);
    xmlhttp.send();
}
function displayBooks(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var bookInfo = "";
    var x = xmlDoc.getElementsByTagName("book");
    for (i = 0; i < x.length; i++) {
        bookInfo += "<ul><li><a href=\"" + 
            x[i].getElementsByTagName("book-url")[0].childNodes[0].nodeValue + "\">" +
            x[i].getElementsByTagName("book-title")[0].childNodes[0].nodeValue + "</a></li></ul>";
    }
    document.getElementById("books").innerHTML = bookInfo;
}