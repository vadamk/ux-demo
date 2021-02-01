import React from "react";
import iosInnerHeight from "ios-inner-height";

// Hook
function useScreenSize(element = window) {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: iosInnerHeight()
  });

  React.useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: element.innerWidth,
        height: iosInnerHeight()
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [element]); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export default useScreenSize;
