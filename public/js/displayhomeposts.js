function loadPosts() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            displayHomePosts(this);
        }
    };
    xmlhttp.open("GET", "../../public/xml/posts.xml", true);
    xmlhttp.send();
}

function displayHomePosts(xml) {
    var i;
    var xmlDoc = xml.responseXML;

    // Store all posts in the 'posts' array
    var posts = xmlDoc.getElementsByTagName("post");
    var homePostInfo = "";

    for (i = 0; i < posts.length; i++) {
        if (posts[i].getAttribute('home') == "1") {
            homePostInfo += "<div class=\"card\" style=\"width: 18rem;\"><div class=\"card-body\"><h5 class=\"card-title\">" +
                posts[i].getElementsByTagName("post-title")[0].childNodes[0].nodeValue + "</h5><h6 class=\"card-subtitle mb-2 text-muted\">" +
                posts[i].getElementsByTagName("author-name")[0].childNodes[0].nodeValue + "</h6><p class=\"card-text text-muted\">" +
                posts[i].getElementsByTagName("posted-date")[0].childNodes[0].nodeValue + "</p><a href=\"" +
                posts[i].getElementsByTagName("post-path")[0].childNodes[0].nodeValue +
                "\" target=\"_blank\" class=\"card-link\">Read Post</a></div></div>";
        }
    }
    // Pass the homePostInfo to HTML, in order to display the content
    document.getElementById("home-posts").innerHTML = homePostInfo;
}