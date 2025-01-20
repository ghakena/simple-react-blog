import { Link, useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import api from './api/posts';
import DataContext from './context/DataContext';

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate();

  // handle deletion of posts.
  const handleDelete = async (id) => {
      try {
          await api.delete(`/posts/${id}`);
          const postsList = posts.filter(post => post.id !== id);
          setPosts(postsList);
          navigate('/');

      } catch (err) {
          console.log(`Error: ${err.message}`);
      }
  }
  
  // to access the route parameter defined dynamically in App.js i.e. :id
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);

  return (
    <main className='PostPage'>
        <article className='post'>
          {
            post &&
              <>
                <h2>{post.title}</h2>
                <p className='postDate'>{post.datetime}</p>
                <p className="postBody">{post.body}</p>
                <Link to={`/edit/${post.id}`}>
                  <button className="editButton">Update Post</button>
                </Link>
                <button className='deleteButton' onClick={() => handleDelete(post.id)}>
                  Delete Post
                </button>
              </>
          }
          {
            !post &&
              <>
                <h2>Post Not Found!</h2>
                <p>Well, I wonder how you got here in the first place.</p>
                <p>
                  <Link to='/'>Visit our home page</Link>
                </p>
              </>
          }
        </article>
    </main>
  )
}

export default PostPage;
