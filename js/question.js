var posts = getPosts();

function kanyeTest() {
    var post = posts[1];
    updateQuestion(post);
}


function change(id) {
    var results = document.getElementById("results-content");

    for (var i = 0; i < results.children.length; i++) {
        results.children[i].classList.remove("current");
    }

    var active = document.getElementById("r"+id);
    active.classList.add("current");
    updateQuestion(posts[id]);
    if (id in getAnswers()) {
        document.getElementById("answers-list").hidden = false;
    } else {
        document.getElementById("answers-list").hidden = true;
    }
}

function updateQuestion(post) {
    var title = document.getElementById("question-header");
    var content = document.getElementById("question-content");
    var tags = document.getElementById("tags");
    var user = document.getElementById("question-user");

    title.innerText = post["title"];
    content.innerText = post["content"];

    while (tags.lastChild) {
        tags.removeChild(tags.lastChild);
    }

    for (var i = 0; i < post["tags"].length; i++) {
        var newTag = document.createElement("div");
        newTag.classList.add("tag");
        newTag.innerText = post["tags"][i];
        tags.appendChild(newTag);
    }

    user.innerText = post["user"]
}

function updateAnswer(answers) {

}