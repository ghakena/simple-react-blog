import { useState, useContext } from "react";
import DataContext from "./context/DataContext";
import { useNavigate } from "react-router-dom";
import api from './api/posts';
import { format } from 'date-fns';

const NewPost = () => {
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const { posts, setPosts } = useContext(DataContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1: 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = {id, title: postTitle, datetime, body: postBody};
    
        try {
            // posting to endpoint '/posts' using the axios api.
            const response = await api.post('/posts', newPost);
            const allPosts = [...posts, response.data];
            setPosts(allPosts);
            // clear up fields
            setPostTitle('');
            setPostBody('');
            // return to home page
            navigate('/');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }
    
    return (
      <main className="NewPost">
          <h2>Add new post</h2>
          <form className="newPostForm" onSubmit={handleSubmit}>
            <label htmlFor="postTitle">Title:</label>
            <input 
              id="postTitle"
              type="text" 
              required
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <label htmlFor="postBody">Content:</label>
            <textarea 
              id="postBody"
              required
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)} 
            />
            <button type="submit">Add New Post</button>
          </form>
      </main>
    )
}
  
export default NewPost;
