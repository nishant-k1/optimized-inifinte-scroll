import axios from "axios";
import { useEffect, useState } from "react";

const useCards = ({ currentPage }) => {
  const [cardList, setCardList] = useState(
    JSON.parse(localStorage.getItem(`localPageData`))?.cardList
  );

  useEffect(() => {
    const pageData = JSON.parse(localStorage.getItem(`localPageData`));

    const fetchCardList = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=20`,
        });
        if (res.status === 200) {
          localStorage.setItem(
            `localPageData`,
            JSON.stringify({
              currentPage,
              cardList: [...(pageData?.cardList || []), ...res.data],
            })
          );
          setCardList([...(pageData?.cardList || []), ...res.data]);
          // setCardList(pageData?.cardList || []); // localStorage gets updated but pageData won't get assigned this new updated value unless the component re-renders
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (pageData) {
      if (currentPage <= pageData?.currentPage) {
        setCardList(pageData?.cardList);
      } else if (currentPage > pageData?.currentPage) {
        if (currentPage < 4) {
          fetchCardList();
        }
      }
    } else {
      if (currentPage < 4) {
        fetchCardList();
      }
    }
  }, [currentPage]);

  return cardList;
};

export default useCards;
