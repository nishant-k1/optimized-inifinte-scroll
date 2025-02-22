import { useEffect, useRef, useState } from 'react';
import useCards from '../useCards';

const CardsList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardList = useCards({ currentPage });
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleInfiniteScroll = () => {
      const scrollAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight;

      if (scrollAtBottom) {
        setCurrentPage((prev) => prev + 1);
      }
    };
    el.addEventListener('scroll', handleInfiniteScroll);
    return () => {
      el.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        background: 'grey',
        padding: '2rem',
        overflowY: 'scroll',
        height: '50vh',
        width: '100vw',
      }}
    >
      {Array.isArray(cardList) &&
        cardList?.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                background: 'black',
                height: '12rem',
                width: '8rem',
                color: 'white',
                padding: '12px',
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
