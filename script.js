fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    // @ts-ignore
    document.querySelector(".user-section").innerHTML = getUserBlockHTML(
      data.currentUser
    );
  });

function getUserBlockHTML(userInfo) {
  const html = `<img src='${userInfo.image.webp}' alt='user pic'/>
                    <textarea name="add-comment">add a comment</textarea>
                    <button class='comment-submit'>send</button>`;
  return html;
}
