import React from 'react';
import './MainComponents.css';

export const Pagination = ({ itemsPerPage, totalPosts, paginate }) => {
    //////Calculate page numbers
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPosts / itemsPerPage); i++){
        pageNumbers.push(i);
    };

    
    return (
        <div className="pagination">
            <ul >
            {pageNumbers.map(number => (
                <a 
                key={number} 
                onClick={() => paginate(number)} 
                href="!#" 
                className="pagelink">
                {number}
                </a>
            ))}
            </ul>
        </div>
    );
};

export default Pagination;
