var posts = getPosts();

function kanyeTest() {
    var post = posts[1];
    updateQuestion(post);
}

function newPostForm() {
    var results = document.getElementById("results-content");

    console.log(document.getElementById("results-content"));
    for (var i = 0; i < results.children.length; i++) {
        results.children[i].classList.remove("current");
    }

    document.getElementById("new-post-form").hidden = false;
    document.getElementById("question").hidden = true;
    document.getElementById("answers").hidden = true;
}

function change(id) {
    document.getElementById("new-post-form").hidden = true;

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
    if (id in getAnswers()) {
        updateAnswer(getAnswers()[id]);
    } else {
    }
}

function updateRating(id, increase) {
    var val = parseInt(document.getElementById("aa-"+id).innerText);
    document.getElementById("aa-"+id).innerText = val + increase;
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
        var newTag = Util.create("div", {"class": "tag"});
        // newTag.classList.add("tag");
        newTag.innerText = post["tags"][i];
        tags.appendChild(newTag);
    }

    user.innerText = post["user"]
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

        var answerProfile = Util.create("div", {"class": "profile", "id": "ap-"+id});
        var answerProfileIcon = Util.create("i", {"class": "fas fa-user-circle"});
        var answerProfileName = Util.create("div", {"class": "answer-user ", "id": "an-"+id});
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