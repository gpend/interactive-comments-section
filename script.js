/*
1. Fetching the data.json file from the server.
2. Parsing the JSON data into a JavaScript object.
3. Displaying the comments in the comment section.
4. Displaying the current user’s information in the user section.
*/
fetch('./data.json')
  .then((response) => response.json())
  .then((data) => {
    document.querySelector('.comment-section').innerHTML = displayComments(
      data.comments,
      data.currentUser
    );

    document.querySelector('.user-section').innerHTML = getUserBlockHTML(
      data.currentUser
    );
  });

/**
 * It takes in a comment object and a current user object and returns a string of
 * HTML.
 * @param commentData - the comment object
 * @param currentUser - The user that is currently logged in.
 * @returns A string of HTML.
 */

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
                        <button class="comment-card--footer__score-plus">+</button>
                        <div class="comment-card--footer__score">${
                          commentData.score
                        }</div>
                        <button class="comment-card--footer__score-minus">-</button>
                    </div>
                    <div class="comment-card--footer__comment-controls">
                       ${getFooterButton(commentData, currentUser)}
                    </div>
                </div>`;

  return html;
}

/**
 * If the comment's user is not the current user, return a reply button, otherwise
 * return a delete and edit button
 * @param comment - the comment object
 * @param currentUser - The user that is currently logged in.
 * @returns A string of HTML.
 */
function getFooterButton(comment, currentUser) {
  return comment.user.username != currentUser.username
    ? '<button class="reply-button"><i class="fa-solid fa-reply"></i> Reply</button>'
    : '<button class="delete-button"><i class="fa-solid fa-trash-can"></i> Delete</button> <button class="edit-button"><i class="fa-solid fa-pen"></i> Edit</button>';
}

/**
 * It takes a list of comments and replies, and returns a string of HTML.
 * @param data - an array of comments
 * @param currentUser - The user that is currently logged in.
 * @returns A string of HTML.
 */
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

/**
 * It takes a userInfo object as an argument and returns a string of HTML.
 * @param userInfo - The info on the currently logged in user
 * @returns the html variable.
 */
function getUserBlockHTML(userInfo) {
  const html = `<img src='${userInfo.image.webp}' alt='user pic'/>
                    <textarea name="add-comment">add a comment</textarea>
                    <button class='comment-submit'>send</button>`;

  return html;
}

class comment {
  constructor(username, date, comment, score){
    this.username = username;
    this.date = date;
    this.comment = comment;
    this.score = score
  }

  changeScore(){

  }

}

// class reply extends comment {}

// enable replies
// enable score change
//re-order based on score