var followers = {"dogtor": 67};
var following = {"dogtor": 21};
var isFollowing = false;

function follow_click(){
  if (isFollowing) {
    followers[profile] -= 1;
    isFollowing = false;
    //change follow button
  }
  else {
    followers[profile] += 1;
    isFollowing = true;
    //change follow button
  }
}
