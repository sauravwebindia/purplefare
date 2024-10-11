import React from 'react';


const PrevArrow = (props) => {
    const { className, onClick, icon } = props;

   
    return (
        <a className={`slick-arrow-home slick-prev ${className}`} onClick={onClick}>
            {icon ? (
                <i className={icon}></i>
            ) : (
                <i className="slideArrLeft"></i>
            )}
        </a>
    );
};

export default PrevArrow;
