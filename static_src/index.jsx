import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Toggle from './components/Toggle';
import { initStore } from './utils/store';

const store = initStore([]);

function App() {
    return (
        <Provider store={ store }>
            <div id="app">
                <Toggle />
            </div>
        </Provider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
