import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPost = ({
    posts, handleEdit, editPostTitle, setEditPostTitle, editPostBody, setEditPostBody
}) => {
  const { id } = useParams();
  // grab the post whose id matches the id grabbed from url using useParams() above.   
  const post = posts.find(post => (post.id).toString() === id);
  
  useEffect(() => {
    if (post) {
        // if post exists, the form will already be filled out with pre-existing title and body, ready to be edited.
        setEditPostTitle(post.title);
        setEditPostBody(post.body);
    }
  }, [post, setEditPostTitle, setEditPostBody])

  return (
    // the body of the post update page will be just like that of the new post creation page. copy from NewPost component and maintain class names for consistent formatting.
    <main className="NewPost">
        {
            editPostTitle && 
            <>
                <h2>Edit Post</h2>
                <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="editPostTitle">Title:</label>
                    <input 
                    id="editPostTitle"
                    type="text" 
                    required
                    value={editPostTitle}
                    onChange={(e) => setEditPostTitle(e.target.value)}
                    />
                    <label htmlFor="editPostBody">Content:</label>
                    <textarea 
                    id="editPostBody"
                    required
                    value={editPostBody}
                    onChange={(e) => setEditPostBody(e.target.value)} 
                    />
                    <button type="submit" onClick={(e) => handleEdit(post.id)}>Update Post</button>
                </form>
            </>
        }
      </main>
  )
}

export default EditPost
