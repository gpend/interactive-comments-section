fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    // @ts-ignore
    document.querySelector(".user-section").innerHTML = getUserBlockHTML(
      data.currentUser
    );
    // @ts-ignore
    document.querySelector(".comment-section").innerHTML = displayComments(data.comments)
  });

function getUserBlockHTML(userInfo) {
  const html = `<img src='${userInfo.image.webp}' alt='user pic'/>
                    <textarea name="add-comment">add a comment</textarea>
                    <button class='comment-submit'>send</button>`;
  return html;
}

function getCommentHTML(commentData){
  console.log(commentData)
  const html = `<div class="comment-card">
                  <div class="comment-card--header">
                      <img src="${commentData.user.image.webp}" alt="user avatar">
                      <div class="comment-card--header__userID"> ${commentData.user.username} </div>
                      <div class="comment-card--header__createdAt" ${commentData.createdAt}</div>
                  </div>
                  <div class="comment-card--body">${commentData.content}</div>
                  <div class="comment-card--footer"></div>
                </div>`
  
  return html
}

function displayComments(data){ //TODO fix nesting
  let comments =""
  for (let comment of data){
    let commentHTML = getCommentHTML(comment)
    // @ts-ignore
    for (let reply of comment.replies){
      commentHTML += `<div class="comment--reply">${getCommentHTML(reply)}</div>`
    }
    console.log(commentHTML)
    comments += commentHTML
  }
  return comments
}


class comment{

}

class reply extends comment{

}