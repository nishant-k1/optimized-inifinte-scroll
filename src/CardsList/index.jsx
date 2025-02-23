import { useState, useCallback, useRef } from "react";
import useCards from "../useCards";

const CardsList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardList = useCards({ currentPage });
  const containerRef = useRef(null);
  const observer = useRef(null); // Store observer instance

  const lastCardRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect(); // Cleanup previous observer

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("Last card visible, loading more...");
        setCurrentPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node); // Observe the new last card
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        background: "grey",
        padding: "2rem",
        overflowY: "scroll",
        height: "50vh",
        width: "100vw",
      }}
    >
      {Array.isArray(cardList) &&
        cardList.map((item, index) => {
          return (
            <div
              key={item.id}
              ref={index === cardList.length - 1 ? lastCardRef : null} // ✅ Dynamic tracking
              style={{
                background: "black",
                height: "12rem",
                width: "8rem",
                color: "white",
                padding: "12px",
              }}
            >
              {item.title}
            </div>
          );
        })}
    </div>
  );
};

export default CardsList;
