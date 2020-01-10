import React from 'react';

const Scroll = (props) => {
    return (
        <div style={{overflowY: 'scroll', height:'300px'}} className="Container">
            {props.children}
        </div>
    );
};

export default Scroll;