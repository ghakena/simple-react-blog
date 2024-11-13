import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Routes, Route, useHistory } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header title="React.js Blog"/>
      <Nav />
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
