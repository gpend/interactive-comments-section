dfetch('./data.json')
  .then((response) => response.json())
  .then((data) => {
    document.querySelector('.user-section').innerHTML = getUserBlockHTML(
      data.currentUser
    );

    document.querySelector('.comment-section').innerHTML = displayComments(
      data.comments
    );
  });

function getUserBlockHTML(userInfo) {
  const html = `<img src='${userInfo.image.webp}' alt='user pic'/>
                    <textarea name="add-comment">add a comment</textarea>
                    <button class='comment-submit'>send</button>`;

  return html;
}

function getCommentHTML(commentData) {
  const html = `<div class="comment-card--header">
                      <img src="${commentData.user.image.webp}" alt="user avatar">
                      <div class="comment-card--header__userID"> ${commentData.user.username} </div>
                      <div class="comment-card--header__createdAt"> ${commentData.createdAt}</div>
                  </div>
                  <div class="comment-card--body">${commentData.content}</div>
                  <div class="comment-card--footer">
                      <div class="comment-card--footer__score">${commentData.score}</div>
                      <div class="comment-card--footer__buttons"></div>
                      <div class="comment-card--replies>${}</div>
                  </div>`;


    // add delete and edit button to current users comments
    //add reply button to other users comments
  return html;
}

function displayComments(data) {
  let comments = '';

    for (let comment of data) {
      let commentHTML = `<div class="comment-card">${getCommentHTML(
        comment
      )}</div>`;
    }
    
    for (let reply of comment.replies) { 
      //make this a separate function to use inside the getCommentHTML
      commentHTML += `<div class="comment-card comment-reply">${getCommentHTML(
        reply
      )}</div>`;
    } 

    comments += commentHTML;
  }

  return comments;
}

// class comment {}

// class reply extends comment {}
