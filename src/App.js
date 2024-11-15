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
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My 1st post",
      datetime: "November 13, 2024 5:33:36 AM",
      body: "lorem ipsum dolor"
    },
    {
      id: 2,
      title: "My 2nd post",
      datetime: "November 13, 2024 6:33:36 AM",
      body: "clearly under react hooks and other functionality"
    },
    {
      id: 3,
      title: "My 3rd post",
      datetime: "November 13, 2024 12:33:36 PM",
      body: "this could be a bunch of random stuff about the react-router-dom"
    },
    {
      id: 4,
      title: "My 4th post",
      datetime: "November 13, 2024 5:35:31 PM",
      body: "some stuff about router hooks and links"
    }
  ]);
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
    navigate('/');
  }

  return (
    <div className="App">
      <Header title="React.js Blog"/>
      <Nav search={search} setSearch={setSearch}/>

      <Routes>
          <Route path='/' element={<Home posts={posts}/>} />
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
