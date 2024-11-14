import { Link, useParams } from 'react-router-dom';

const PostPage = ({ posts, handleDelete }) => {
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
                <button onClick={() => handleDelete(post.id)}>
                  Delete Post
                </button>
              </>
          }
        </article>
    </main>
  )
}

export default PostPage;
