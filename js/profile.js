var followers = {"dogtor": 67};
var following = {"dogtor": 21};
var isFollowing = false;

function follow_click(){
  if (isFollowing) {
    isFollowing = false;
    document.getElementById("follow_button").innerText = "Follow";
    document.getElementById("follow_button").className = "follow";
    //change follow button
  }
  else {
    isFollowing = true;
    document.getElementById("follow_button").innerText = "Following";
    document.getElementById("follow_button").className = "following";
    //change follow button
  }
}
