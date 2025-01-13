import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // deal with memory leak.
        // we want the component to be mounted, and not attempt to apply something when it is unmounted, which would result in a memory leak. we will keep checking this status as we apply things.
        let isMounted = true;
        // to cancel a request for whatever reason, a component is unmounted.
        // this is in essence a cancellation token for axios.
        const source = axios.CancelToken.source();

        // define function to fetch data.
        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    // apply cancel token. cancel request when we unmount our component.
                    // this cancel token is sent with the request.
                    cancelToken: source.token
                });

                // once we get a response after sending the request.
                // if component is mounted
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);

                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                isMounted && setTimeout(() => { setIsLoading(false) }, 2000);
            }
        }

        // the custom hook receives dataUrl as the parameter, so we'll pass it in instead of simply "url" as in the function definition.
        fetchData(dataUrl);

        // data clean-up function.
        // will cancel the request if the component is unloaded.
        // the clean-up function will only run when a dependency for the custom hook changes.
        const cleanUp = () => {
            console.log('cleaning up...');
            isMounted = false;
            source.cancel();
        }

        // clean up the function.
        return cleanUp;
        
    }, [dataUrl])

    return { data, fetchError, isLoading };
}

export default useAxiosFetch;