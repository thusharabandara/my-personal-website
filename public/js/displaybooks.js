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
// Get an array with unique values
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function displayBooks(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    // Store all books 'read-year' tags in the 'read_year_tags' array
    var read_year_tags = xmlDoc.getElementsByTagName("read-year");
    // Create an empty array
    var read_years = [];
    // Push 'read-year' value of each book into the 'read_years' array
    for (i = 0; i < read_year_tags.length; i++) {
        read_years.push(read_year_tags[i].childNodes[0].nodeValue);
    }
    // Find all unique ready ears from 'read_years' array and store them in the 'dist_years' array 
    var dist_years = read_years.filter(onlyUnique);
    // Sort the array 'dist_years' in descending order
    dist_years.sort().reverse();
    // Declare variables to handle both 'dist_years' and 'movies' inside of each for-loop
    var y, b;
    // Store all books in the 'books' array
    var books = xmlDoc.getElementsByTagName("book");
    var bookInfo = "";

    for (y = 0; y < dist_years.length; y++) {
        // Display 'read-year'
        bookInfo += "<h2>" + dist_years[y] + "</h2>";
        for (b = 0; b < books.length; b++) {
            if (dist_years[y] == books[b].getElementsByTagName("read-year")[0].childNodes[0].nodeValue) {
                bookInfo += "<ul><li><a href=\"" +
                books[b].getElementsByTagName("book-url")[0].childNodes[0].nodeValue + "\" target=\"_blank\">" +
                books[b].getElementsByTagName("book-title")[0].childNodes[0].nodeValue +
                "</a></li></ul>";
            }
        }
    }
    // Pass the bookInfo to HTML, in order to display the content
    document.getElementById("books").innerHTML = bookInfo;
}