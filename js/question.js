var posts = getPosts();
var answers = getAnswers();
var liked = {};


function onLoad() {
    var searchResults = getSearchResults();

    var results = document.getElementById("results-content");

    for (var i = 0; i < searchResults.length; i++) {
        console.log(i);
        var id = searchResults[i];

        var result = Util.create("div", {"class": "result", "id":"r"+id, "onclick":"loadPost("+id+")"});

        var header = Util.create("h3", {"class": "result-header"});
        header.innerText = posts[id]["title"];

        var content = Util.create("div", {"class": "result-content"});
        content.innerText = posts[id]["content"];

        result.appendChild(header);
        result.appendChild(content);

        console.log(result);
        results.appendChild(result);
    }

    loadPost(searchResults[0]);
}

function newPostForm() {
    var results = document.getElementById("results-content");

    console.log(document.getElementById("results-content"));
    for (var i = 0; i < results.children.length; i++) {
        results.children[i].classList.remove("current");
    }

    document.getElementById("question").hidden = true;
    document.getElementById("answers").hidden = true;
}

function loadPost(id) {
    document.body.style.setProperty("--writing", "none");
    var results = document.getElementById("results-content");

    for (var i = 0; i < results.children.length; i++) {
        results.children[i].classList.remove("current");
    }

    var active = document.getElementById("r"+id);
    active.classList.add("current");

    document.getElementById("question").hidden = false;
    document.getElementById("answers").hidden = false;
    updateQuestion(posts[id]);

    var answersList = document.getElementById("answers-list");
    while (answersList.lastChild) {
        answersList.removeChild((answersList.lastChild));
    }
    if (id in answers) {
        updateAnswer(answers[id]);
    } else {
        var answersList = document.getElementById("answers-list");
        var header = Util.create("h1",{"class":"heading comment"});
        header.innerText = "No comments";
        answersList.appendChild(header);
    }
}

function switchArrow(id, increase) {
    var up = document.getElementById("au-"+id);
    var down = document.getElementById("ad-"+id);
    if (increase > 0) {
        up.classList.add("active");
        down.classList.remove("active");
    } else {
        down.classList.add("active");
        up.classList.remove("active");
    }
}

function updateRating(id, increase) {
    var val = parseInt(document.getElementById("aa-"+id).innerText);

    if (id in liked && !(liked[id] === increase)) {
        document.getElementById("aa-"+id).innerText = val + increase * 2;
        liked[id] = increase;
        switchArrow(id, increase);
    } else if (!(id in liked)) {
        document.getElementById("aa-"+id).innerText = val + increase;
        liked[id] = increase;
        switchArrow(id, increase);
    } else {
        document.getElementById("aa-"+id).innerText = val - increase;
        delete liked[id];

        var up = document.getElementById("au-"+id);
        var down = document.getElementById("ad-"+id)
        up.classList.remove("active");
        down.classList.remove("active");
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
        var newTag = Util.create("div", {"class": "tag button"});
        // newTag.classList.add("tag");
        newTag.innerText = post["tags"][i];
        tags.appendChild(newTag);
    }

    user.innerText = post["user"];
}

function updateAnswer(answers) {
    var answersList = document.getElementById("answers-list");

    for (var i in answers) {
        var id = answers[i]["id"];

        var answer = Util.create("div", {"class": "answer", "id": "a-"+id});
        var rating = Util.create("div", {"class": "answer-vote"});
        var amount = Util.create("div", {"class": "answer-vote-amount", "id": "aa-"+id});
        var arrowUp = Util.create("div", {"class": "arrow arrow-up", "id": "au-"+id, "onclick": "updateRating("+id+", 1)"});
        var arrowDown = Util.create("div", {"class": "arrow arrow-down", "id": "ad-"+id, "onclick": "updateRating("+id+", -1)"});
        amount.innerText = answers[i]["rating"];

        rating.appendChild(arrowUp);
        rating.appendChild(amount);
        rating.appendChild(arrowDown);

        answer.appendChild(rating);

        var answerRight = Util.create("div", {"class": "answer-right"});
        var answerHeader = Util.create("div", {"class": "answer-header"});

        var answerProfile = Util.create("div", {"class": "profile button", "id": "ap-"+id});
        var answerProfileIcon = Util.create("i", {"class": "fas fa-user-circle"});
        var answerProfileName = Util.create("div", {"class": "answer-user profile-name", "id": "an-"+id});
        answerProfileName.innerText = answers[i]["user"];

        answerProfileIcon.appendChild(answerProfileName);
        answerProfile.appendChild(answerProfileIcon);
        answerHeader.appendChild(answerProfile);

        var answerButtons = Util.create("div", {"class": "answer-buttons"});

        var saveButton = Util.create("a", {"class": "answer-button", "id": "as-"+id});
        saveButton.appendChild(Util.create("i", {"class": "far fa-bookmark"}));

        var replyButton = Util.create("a", {"class": "answer-button", "id": "ar-"+id});
        replyButton.appendChild(Util.create("i", {"class": "fas fa-reply"}));

        var blockButton = Util.create("a", {"class": "answer-button", "id": "ab-"+id});
        blockButton.appendChild(Util.create("i", {"class": "far fa-times-circle"}));

        answerButtons.appendChild(saveButton);
        answerButtons.appendChild(replyButton);
        answerButtons.appendChild(blockButton);

        answerHeader.appendChild(answerButtons);
        answerRight.appendChild(answerHeader);

        var answerContent = Util.create("div", {"class": "answer-content"});
        answerContent.innerText = answers[i]["content"];

        answerRight.appendChild(answerContent);
        answer.appendChild(answerRight);

        answersList.appendChild(answer);
    }
}

function recordingAnswer() {
    document.body.style.setProperty("--writing", "inline-block");
}

// Attaching events on document because then we can do it without waiting for
// the DOM to be ready (i.e. before DOMContentLoaded fires)
Util.events(document, {
    // Final initalization entry point: the Javascript code inside this block
    // runs at the end of start-up when the DOM is ready
    "DOMContentLoaded": function() {
        var searchResults = getSearchResults();

        var results = document.getElementById("results-content");

        for (var i = 0; i < searchResults.length; i++) {
            console.log(i);
            var id = searchResults[i];

            var result = Util.create("div", {"class": "result", "id":"r"+id, "onclick":"loadPost("+id+")"});

            var header = Util.create("h3", {"class": "result-header"});
            header.innerText = posts[id]["title"];

            var content = Util.create("div", {"class": "result-content"});
            content.innerText = posts[id]["content"];

            result.appendChild(header);
            result.appendChild(content);

            console.log(result);
            results.appendChild(result);
        }
        loadPost(searchResults[0]);

        Util.one("#post-textbox").addEventListener("click", recordingAnswer)
    }
});