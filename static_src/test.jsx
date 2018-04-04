const element = React.createElement(
    'div',
    {className: 'greeting'},
    'HelloWorld!',
);

ReactDom.render(element, document.getElementById('root'));