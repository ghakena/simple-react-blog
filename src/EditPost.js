import { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import DataContext from './context/DataContext';

// this is like a combination of the "new post" page where we created a new post with the help of a controlled form and the "post details" page where we pulled in post details from a parameter.
const EditPost = () => {
  const { posts, handleEdit, editPostTitle, setEditPostTitle, editPostBody, setEditPostBody } = useContext(DataContext);  
  const { id } = useParams();
  // grab the post whose id matches the id grabbed from url using useParams() above.   
  const post = posts.find(post => (post.id).toString() === id);
  
  useEffect(() => {
    if (post) {
        // if post exists, the form will already be filled out with pre-existing post title and body, ready to be edited.
        setEditPostTitle(post.title);
        setEditPostBody(post.body);
    }
  }, [post, setEditPostTitle, setEditPostBody])

  return (
    // the body of the post update page will be just like that of the new post creation page. copy from NewPost component and maintain class names for consistent formatting.
    <main className="NewPost">
        {
            // if the post exists, then return the fragment below
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
        {   
            // if the post does not exist but is requested for.
            !editPostTitle &&
            <>
                <h2>Post Not Found</h2>
                <p>Well, that's embarrasing lol</p>
                <p>
                    <Link to='/'>Return to home page here.</Link>
                </p>
            </>
        }
      </main>
  )
}

export default EditPost
