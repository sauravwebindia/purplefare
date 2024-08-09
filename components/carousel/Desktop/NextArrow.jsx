import React from 'react';

const NextArrow = (props) => {
    const { className, onClick, icon } = props;
    return (
        <a className={`slick-arrow-home slick-next ${className}`} onClick={onClick}>
            {icon ? (
                <i className={icon}></i>
            ) : (
                <i className="slideArrRight"></i>
            )}
        </a>
    );
};

export default NextArrow;
