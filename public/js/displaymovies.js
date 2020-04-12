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
// Get an array with unique values
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function displayMovies(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    // Store all movie 'released-year' tags in the 'year_tags' array
    var year_tags = xmlDoc.getElementsByTagName("released-year");
    // Create an empty array
    var years = [];
    // Push 'released-year' value of each movie into the 'years' array
    for (i = 0; i < year_tags.length; i++) {
        years.push(year_tags[i].childNodes[0].nodeValue);
    }
    // Find all unique years from 'years' array and store them in the 'dist_years' array 
    var dist_years = years.filter(onlyUnique);
    // Sort the array 'dist_years' in descending order
    dist_years.sort().reverse();
    // Declare variables to handle both 'dist_years' and 'movies' inside of each for-loop
    var y, m;
    // Store all movies in the 'movies' array
    var movies = xmlDoc.getElementsByTagName("movie");
    var movieInfo = "";

    for (y = 0; y < dist_years.length; y++) {
        // Display 'released-year'
        movieInfo += "<h2>" + dist_years[y] + "</h2>";
        for (m = 0; m < movies.length; m++) {
            if (dist_years[y] == movies[m].getElementsByTagName("released-year")[0].childNodes[0].nodeValue) {
                movieInfo += "<ul><li><a href=\"" +
                movies[m].getElementsByTagName("movie-url")[0].childNodes[0].nodeValue + "\" target=\"_blank\">" +
                movies[m].getElementsByTagName("movie-title")[0].childNodes[0].nodeValue +
                "</a></li></ul>";
            }
        }
    }
    // Pass the movieInfo to HTML, in order to display the content
    document.getElementById("movies").innerHTML = movieInfo;
}