import React, { useRef, useState, useEffect } from "react";
import { SpacerDiv } from "../../wrappers/Spacer";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import categories from "../../URLs/Categories";

const Categories = () => {
  const allCategories = ["All", ...categories];
  //Rest
  const containerRef = useRef(null);
  const [lastVisibleItemIndex, setLastVisibleItemIndex] = useState(0);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showForwardButton, setShowForwardButton] = useState(true);
  const [scrolledToRight, setScrolledToRight] = useState(false);

  useEffect(() => {
    // Function to calculate the last visible item index
    const updateLastVisibleItemIndex = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const items = containerRef.current.children;

        let lastVisibleIndex = 0;
        for (let i = 0; i < items.length; i++) {
          const itemRect = items[i].getBoundingClientRect();
          if (
            itemRect.left >= containerRect.left &&
            itemRect.right <= containerRect.right
          ) {
            lastVisibleIndex = i;
          }
        }

        setLastVisibleItemIndex(lastVisibleIndex);

        // Set visibility of buttons based on the scroll position
        setShowBackButton(lastVisibleIndex > 0);
        setShowForwardButton(lastVisibleIndex < items.length - 1);
        // setScrolledToRight(
        //   lastVisibleIndex < items.length - 1 && lastVisibleIndex > 0
        // );
      }
    };

    // Add event listener to update the last visible item index on window resize
    window.addEventListener("resize", updateLastVisibleItemIndex);
    updateLastVisibleItemIndex(); // Initial calculation

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateLastVisibleItemIndex);
    };
  }, []);

  const scrollToNextItem = () => {
    if (containerRef.current) {
      const currentScrollLeft = containerRef.current.scrollLeft;
      const itemWidth = 150; // Adjust this value based on your item width
      setScrolledToRight(true);
      containerRef.current.scrollTo({
        left: currentScrollLeft + itemWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollToPreviousItem = () => {
    if (containerRef.current) {
      const currentScrollLeft = containerRef.current.scrollLeft;
      const itemWidth = 150; // Adjust this value based on your item width
      containerRef.current.scrollTo({
        left: currentScrollLeft - itemWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <SpacerDiv>
      <div className="flex items-center overflow-hidden py-3 relative">
        {scrolledToRight && (
          <button
            onClick={scrollToPreviousItem}
            className="absolute left-0 top-4 opacity-70 bg-white bottom-0 w-7 h-7 flex items-center justify-center rounded-full text-2xl drop-shadow-md"
          >
            <BiChevronLeft />
          </button>
        )}
        {showForwardButton && (
          <button
            onClick={scrollToNextItem}
            className="absolute right-0 top-4 opacity-70 bg-white bottom-0 w-7 h-7 flex items-center justify-center rounded-full text-2xl drop-shadow-md"
          >
            <BiChevronRight />
          </button>
        )}
        <div
          className="flex overflow-scroll  no-scrollbar"
          ref={containerRef}
          style={{ scrollBehavior: "smooth" }}
        >
          {allCategories.map((category, index) => (
            <NavLink
              to={`/read/category/${category}`}
              key={index}
              className={({ isActive }) =>
                `flex-shrink-0 inline-block ${
                  isActive ? "bg-gray-500 text-white" : "bg-gray-300"
                }  px-4 py-2 rounded-full mx-1 text-sm`
              }
            >
              {category}
            </NavLink>
          ))}
        </div>
      </div>
    </SpacerDiv>
  );
};

export default Categories;
