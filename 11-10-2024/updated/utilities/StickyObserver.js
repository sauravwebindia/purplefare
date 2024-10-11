import { useEffect } from "react";

const StickyObserver = () => {
  useEffect(() => {
    const observerElement = document.createElement("div");
    observerElement.classList.add("myObserver");

    const searchFixedElement = document.querySelector("#search-fixed");
    if (searchFixedElement) {
      searchFixedElement.parentNode.insertBefore(observerElement, searchFixedElement);
    }

    let timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              searchFixedElement.classList.remove("sticky-element");
            } else {
              searchFixedElement.classList.add("sticky-element");
            }
          });
        }, 100); // Adjust the delay as needed
      },
      { threshold: [0] } // Trigger when observer element is out of view
    );

    if (observerElement) {
      observer.observe(observerElement);
    }

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
      if (observerElement && observerElement.parentNode) {
        observerElement.parentNode.removeChild(observerElement);
      }
    };
  }, []);

  return null; // This component doesn't render anything itself
};

export default StickyObserver;
