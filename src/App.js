import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Routes, Route, useHistory } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My 1st post",
      datetime: "November 13, 2024 5:33:36 AM",
      body: "lorem ipsum dolor..."
    },
    {
      id: 2,
      title: "My 2nd post",
      datetime: "November 13, 2024 6:33:36 AM",
      body: "lorem ipsum dolor..."
    },
    {
      id: 3,
      title: "My 3rd post",
      datetime: "November 13, 2024 12:33:36 PM",
      body: "lorem ipsum dolor..."
    },
    {
      id: 4,
      title: "My 4th post",
      datetime: "November 13, 2024 5:35:31 PM",
      body: "lorem ipsum dolor..."
    }
  ]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="App">
      <Header title="React.js Blog"/>
      <Nav search={search} setSearch={setSearch}/>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post' element={<NewPost />} />
          <Route path='/post/:id' element={<PostPage />}/>
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
