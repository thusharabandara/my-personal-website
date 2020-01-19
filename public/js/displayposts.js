function loadMusic() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            displayPosts(this);
        }
    };
    xmlhttp.open("GET", "../../public/xml/posts.xml", true);
    xmlhttp.send();
}
// Get an array with unique values
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function displayPosts(xml) {
    var i;
    var xmlDoc = xml.responseXML;

    // Store all posts in the 'posts' array
    var posts = xmlDoc.getElementsByTagName("post");
    var postInfo = "";

    for (i = 0; i < posts.length; i++) {
        postInfo += "<ul><li><a href=\"" +
            posts[i].getElementsByTagName("post-path")[0].childNodes[0].nodeValue + "\" target=\"_blank\">" +
            music_albums[m].getElementsByTagName("post-title")[0].childNodes[0].nodeValue +
            "</a></li></ul>";
    }
    // Pass the musicInfo to HTML, in order to display the content
    document.getElementById("post").innerHTML = musicInfo;
}