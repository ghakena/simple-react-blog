import { useState, useEffect } from 'react'

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        handleResize();

        // to get the value to continue to adjust whenever window is resized, use an event listener.
        window.addEventListener("resize", handleResize);

        // to prevent memory leak, it is important to remove the event listener after it is triggered. define a clean up function.
        const cleanUp = () => {
            console.log('this runs whenever a useEffect dependency changes.');
            window.removeEventListener("resize", handleResize);
        }

        return cleanUp;

    }, [])

    return windowSize;
}

export default useWindowSize;