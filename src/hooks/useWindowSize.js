import { useState, useEffect } from 'react';

const useWindowSize = () => {
    // state to handle the window size i.e. width and height.
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

        // call into action after definition (will happen at load-time)
        handleResize();

        // to get the value to continue to adjust whenever window is resized, use an event listener.
        window.addEventListener("resize", handleResize);

        // to prevent memory leak, it is important to remove the event listener after it is triggered. define a clean up function.
        
        // const cleanUp = () => {
        //     console.log('this runs whenever a useEffect dependency changes.');
        //     window.removeEventListener("resize", handleResize);
        // }

        // return cleanUp;

        // with a refactor, we can simply return the removal of the resize event listener from the window as shown below. Whenever you see a "return" at the end of a useEffect, that is usually a cleanup function.
        return () => window.removeEventListener("resize", handleResize);
        
    }, [])

    // this is not inside the useEffect.
    return windowSize;
}

export default useWindowSize;