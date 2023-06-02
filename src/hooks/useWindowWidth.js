import React, { useEffect, useState } from "react";


const useWindowWidth = () => {
        const [WindowWidth, setWindowWidth] = useState({width: 0})
    
        useEffect(() => {
            function handleResize() {
                setWindowWidth({
                    width: window.innerWidth,
                })
            }
    
            handleResize()
            window.addEventListener('resize', handleResize)
            
            return () => { window.removeEventListener('resize', handleResize) }
        }, [])
    
        return WindowWidth;
}

export default useWindowWidth;
