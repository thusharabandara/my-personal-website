function loadMusic() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            displayMusic(this);
        }
    };
    xmlhttp.open("GET", "../../public/xml/music.xml", true);
    xmlhttp.send();
}
// Get an array with unique values
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function displayMusic(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    // Store all music 'artist' tags in the 'artist_tags' array
    var artist_tags = xmlDoc.getElementsByTagName("artist");
    // Create an empty array
    var artists = [];
    // Push 'artist value of each music album into the 'artists' array
    for (i = 0; i < artist_tags.length; i++) {
        artists.push(artist_tags[i].childNodes[0].nodeValue);
    }
    // Find all unique artists from 'artists' array and store them in the 'dist_artists' array 
    var dist_artists = artists.filter(onlyUnique);
    // Sort the array 'dist_artists'
    dist_artists.sort();
    // Declare variables to handle both 'dist_artists' and 'music-albums' inside of each for-loop
    var a, m;
    // Store all music-albums in the 'music_albums' array
    var music_albums = xmlDoc.getElementsByTagName("music-album");
    var musicInfo = "";

    for (a = 0; a < dist_artists.length; a++) {
        // Display 'artist'
        musicInfo += "<h2>" + dist_artists[a] + "</h2>";
        for (m = 0; m < music_albums.length; m++) {
            if (dist_artists[a] == music_albums[m].getElementsByTagName("artist")[0].childNodes[0].nodeValue) {
                musicInfo += "<ul><li><a href=\"" +
                music_albums[m].getElementsByTagName("link")[0].childNodes[0].nodeValue + "\" target=\"_blank\">" +
                music_albums[m].getElementsByTagName("album-title")[0].childNodes[0].nodeValue +
                "</a></li></ul>";
            }
        }
    }
    // Pass the musicInfo to HTML, in order to display the content
    document.getElementById("music").innerHTML = musicInfo;
}