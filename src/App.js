import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const navigate = useNavigate(); // this replaces useHistory from v5.

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate('/');

  }

  // define useEffect to work with the search bar and search results.
  // filter out posts that contain characters that match the search terms.
  useEffect(() => {
    const filteredResults = posts.filter(post => (
      ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
      ((post.title).toLowerCase()).includes(search.toLowerCase())
    ));

    // set the search results in a way such that the newer posts spring up first.
    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1: 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id, title: postTitle, datetime, body: postBody};
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    // clear up fields
    setPostTitle('');
    setPostBody('');
    // return to home page
    navigate('/');
  }

  return (
    <div className="App">
      <Header title="React.js Blog"/>
      <Nav search={search} setSearch={setSearch}/>

      <Routes>
          <Route path='/' element={<Home posts={searchResults}/>} />
          <Route 
            path='/post' 
            element={
              <NewPost 
                handleSubmit={handleSubmit}
                postTitle={postTitle} 
                setPostTitle={setPostTitle} 
                postBody={postBody} 
                setPostBody={setPostBody}
              />
            } 
          />
          <Route path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
