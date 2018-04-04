import React from "react";
import ReactDOM from 'react-dom';

const element = React.createElement(
    'div',
    {className: 'greeting'},
    'Halo Welt!',
);

ReactDOM.render(element, document.getElementById('root'));