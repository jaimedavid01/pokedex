import React from 'react';
import './MainComponents.css';

export const Pagination = ({ currentPage, itemsPerPage, totalPosts, paginate }) => {

    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    //////Calculate page numbers
    const pages = [];

    for(let i = 1; i <= Math.ceil(totalPosts / itemsPerPage); i++){
        pages.push(i);
    };

    const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={paginate(number)}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });


  const handleNextbtn = () => {
   setCurrentPage(currentPage + 1);

   if (currentPage + 1 > maxPageNumberLimit) {
    setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

    let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

    
    return (
        <div className="pagination">
            <ul className="pageNumbers">
            <li>
                <button
                    onClick={handlePrevbtn}
                    disabled={currentPage == pages[0] ? true : false}
                >Prev</button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}

            <li>
                <button
                    onClick={handleNextbtn}
                    disabled={currentPage == pages[pages.length - 1] ? true : false}
                >Next</button>
        </li>
      </ul>
        </div>
    );
};

export default Pagination;
