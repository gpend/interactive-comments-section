fetch('./data.json')
  .then((response) => response.json())
  .then((data) => {
    document.querySelector('.user-section').innerHTML = getUserBlockHTML(
      data.currentUser
    );

    document.querySelector('.comment-section').innerHTML = displayComments(
      data.comments,
      data.currentUser
    );
  });

function getUserBlockHTML(userInfo) {
  const html = `<img src='${userInfo.image.webp}' alt='user pic'/>
                    <textarea name="add-comment">add a comment</textarea>
                    <button class='comment-submit'>send</button>`;

  return html;
}

function getCommentHTML(commentData, currentUser) {
  const html = `<div class="comment-card--header">
                      <img src="${
                        commentData.user.image.webp
                      }" alt="user avatar">
                      <div class="comment-card--header__userID"> ${
                        commentData.user.username
                      } </div>
                      <div class="comment-card--header__createdAt"> ${
                        commentData.createdAt
                      }</div>
                </div>
                <div class="comment-card--body">${commentData.content}</div>
                <div class="comment-card--footer">
                    <div class="comment-card--footer__score-controls">
                        <button class="comment-card--footer__score-plus"> + </button>
                        <div class="comment-card--footer__score">${
                          commentData.score
                        }</div>
                        <button class="comment-card--footer__score-minus"> - </button>
                    </div>
                    <div class="comment-card--footer__comment-controls">
                       ${getFooterButton(commentData, currentUser)}
                    </div>
                </div>`;

  // add delete and edit button to current users comments
  //add reply button to other users comments
  return html;
}

function displayComments(data, currentUser) {
  let comments = '';

  for (let comment of data) {
    let commentHTML = `<div class="comment-card">${getCommentHTML(
      comment,
      currentUser
    )}</div>`;

    commentHTML += '<div class="comment-card__replies">';

    for (let reply of comment.replies) {
      let commentReplyHTML = `<div class="comment-card comment-reply">${getCommentHTML(
        reply,
        currentUser
      )}</div>`;
      commentHTML += commentReplyHTML;
    }

    commentHTML += '</div>';

    comments += commentHTML;
  }

  return comments;
}

function getFooterButton(comment, currentUser) {
  return comment.user.username != currentUser.username
    ? '<button class="reply-button">reply</button>'
    : '<button class="edit-button">edit</button> <button class="delete-button">delete</button>';
}

// class comment {}

// class reply extends comment {}
