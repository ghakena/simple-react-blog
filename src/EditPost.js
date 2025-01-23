import { useEffect, useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from './api/posts';
import { format } from 'date-fns';
import DataContext from './context/DataContext';

// this is like a combination of the "new post" page where we created a new post with the help of a controlled form and the "post details" page where we pulled in post details from a parameter.
const EditPost = () => {
    const [editPostTitle, setEditPostTitle] = useState('');
    const [editPostBody, setEditPostBody] = useState('');

    const navigate = useNavigate();

    const { posts, setPosts } = useContext(DataContext);  
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

    // function to handle update of posts.
    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = {id, title: editPostTitle, datetime, body: editPostBody};

        try {
            const response = await api.put(`/posts/${id}`, updatedPost)
            // to avoid repeated posts in our db, we map each post and if a post in db matches the id of our post being updated, we repopulate our db with the updated response from the update api endpoint. otherwise, we maintain post as is.
            setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
            // set post title and post body back to blank.
            setEditPostTitle('');
            setEditPostBody('');
            // navigate back to the home feed to see edited post among existing posts.
            navigate('/');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

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
                        <button type="submit" onClick={(e) => handleEdit(post.id)}>
                            Update Post
                        </button>
                    </form>
                </>
            }
            {   
                // if the post does not exist but is requested for.
                !editPostTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, we can't seem to find the post you're lookin' for. Sorry!</p>
                    <p>
                        <Link to='/'>Return to home page here.</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost;
