import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
// 2 dots as you're getting out of the context folder first before accessing api and hooks folder.
import api from '../api/posts';
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
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
        <DataContext.Provider value={{
            width, 
            search, setSearch,
            searchResults, fetchError, isLoading,
            
        }}>
            { children }
        </DataContext.Provider>
    )
}

export default DataContext;