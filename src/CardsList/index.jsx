import { useEffect, useRef, useState } from "react";
import useCards from "../useCards";

const CardsList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardList = useCards({ currentPage });
  const containerRef = useRef(null);
  const lastCardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const lastCard = entries[0];
        if (lastCard.isIntersecting) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1, root: containerRef.current }
    );

    if (lastCardRef.current) {
      observer.observe(lastCardRef.current);
    }

    return () => {
      if (lastCardRef.current) {
        observer.unobserve(lastCardRef.current);
      }
    };
  }, [cardList]);

  return (
    <div
      ref={containerRef}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        width: "60vw",
        margin: "20vh auto",
        gap: "24px",
        background: "grey",
        textAlign: "center",
        padding: "2rem",
        overflowY: "scroll",
        height: "50vh",
      }}
    >
      {Array.isArray(cardList) &&
        cardList?.map((item, index) => {
          return (
            <div
              ref={index === cardList.length - 1 ? lastCardRef : null}
              key={item.id}
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
