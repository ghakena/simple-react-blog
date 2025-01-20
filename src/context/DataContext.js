import { createContext, useEffect, useState } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    // destructure useAxiosFetch to extract important items.
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

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

    return (
        <DataContext.Provider value={{
            search, setSearch,
            searchResults, fetchError, isLoading,
            posts, setPosts,
            posts
        }}>
            { children }
        </DataContext.Provider>
    )
}

export default DataContext;