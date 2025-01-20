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
    return (
        <DataContext.Provider value={{

        }}>
            { children }
        </DataContext.Provider>
    )
}

export default DataContext;