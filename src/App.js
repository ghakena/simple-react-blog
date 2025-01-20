import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';
import { DataProvider } from './context/DataContext';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editPostTitle, setEditPostTitle] = useState('');
  const [editPostBody, setEditPostBody] = useState('');
  // destructure and pull out the "width" from the imported useWindowSize custom hook below.
  const { width } = useWindowSize();
  // destructure useAxiosFetch to extract important items.
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  const navigate = useNavigate(); // this replaces useHistory from v5.

  // useEffect to fetch our data. will run at load time, so it will have an empty dependency array
  // useEffect(() => {
  //   // function to fetch data using the axios api.
  //   const fetchData = async () => {
  //     try {
  //       const response = await api.get('/posts');
  //       if (response && response.data) {
  //         setPosts(response.data)
  //       }
  //     } catch (err) {
  //       if (err.response) {
  //         // response not in the 200 response range
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         // if we did not receive err.response
  //         console.log(`Error: ${err.message}`);
  //       }
  //     }
  //   }
    
  //   fetchData();
  // }, [])

  useEffect(() => {
    // set the posts as the data being received from the local json-server endpoint using the useAxiosFetch custom hook. The dependency array will hold the data. The useEffect will run whenever the data changes.
    setPosts(data);
  }, [data])

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
    <div className="App">
      <DataProvider>
        <Header title="React.js Blog" />
        <Nav />

        <Routes>
            <Route 
              path='/' 
              element={<Home />} 
            />
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
            <Route 
              path='/edit/:id' 
              element={
                <EditPost 
                  posts={posts}
                  handleEdit={handleEdit}
                  editPostTitle={editPostTitle} 
                  setEditPostTitle={setEditPostTitle} 
                  editPostBody={editPostBody} 
                  setEditPostBody={setEditPostBody}
                />
              } 
            />
            <Route path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
            <Route path='/about' element={<About />} />
            <Route path='*' element={<Missing />} />
        </Routes>

        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
