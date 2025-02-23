import { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCards } from "../features/cardsSlice";

const CardsList = () => {
  const dispatch = useDispatch();
  const { cardList, currentPage } = useSelector((state) => state.cards);
  const containerRef = useRef(null);
  const observer = useRef(null);

  useEffect(() => {
    dispatch(fetchCards(currentPage));
  }, []);

  const lastCardRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (currentPage < 5) {
            dispatch(fetchCards(currentPage + 1));
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [currentPage, dispatch]
  );

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
