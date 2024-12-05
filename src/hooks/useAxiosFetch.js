import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // deal with memory leak.
        let isMounted = true;
        // to cancel a request for whatever reason, a component is unmounted.
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    // apply cancel token. cancel request when we unmount our component.
                    cancelToken: source.token
                })

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
