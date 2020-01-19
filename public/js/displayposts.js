function loadPosts() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            displayPosts(this);
        }
    };
    xmlhttp.open("GET", "../../public/xml/posts.xml", true);
    xmlhttp.send();
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
            posts[i].getElementsByTagName("post-title")[0].childNodes[0].nodeValue +
            "</a></li></ul>";
    }
    // Pass the postInfo to HTML, in order to display the content
    document.getElementById("posts").innerHTML = postInfo;
}