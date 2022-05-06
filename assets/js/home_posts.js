{
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          console.log(data);
          let newPost = newPostDom(data.data.post);
          $("#posts-list-container>ul").prepend(newPost);
          deletePost($(" .delete-post-button",newPost))
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };
  //  creating the post in the dom
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
  
        <small><a class="delete-post-button" href="/posts/destroy/${post._id}">delete</a></small>
 
      <p>${post.user.name}</p>
      <p>${post.content}</p>
    <div class="comments">
     
        <form action="/comments/create" method="post">
          <input type="text" name="content" placeholder="add comment.." required>
          <input type="hidden" name="post" value="${post._id}">
          <input type="submit" value="add comment">
        </form>
    
    
     <div class="post-comments-list">
       <ul id="post-comments-${post._id}">
         
       </ul>
     </div>
    </div>
    
  </li>
  `);
  };

  //  deleting a post from dom
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function(e) {
      e.preventDefault();

      $.ajax({
        type:"get",
        url:$(deleteLink).prop("href"),
        success:function (data) {
          $(`#post-${data.data.post_id}`).remove();
        },error:function (error) {
          console.log(error.responseText);
        }
      })

    })
  }





  createPost();
}
