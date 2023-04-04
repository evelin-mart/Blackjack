import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import Register from './components/forms/register'

function App() {
    return (
        <Provider store={store}>
            <div className='App'>
                <div>
                    <a href='https://vitejs.dev' target='_blank'>
                        <img src={viteLogo} className='logo' alt='Vite logo' />
                    </a>
                    <a href='https://reactjs.org' target='_blank'>
                        <img src={reactLogo} className='logo react' alt='React logo' />
                    </a>
                </div>
                <h1>Vite + React</h1>
                <div className='card'>
                    <Register />
                    <p>
                        Edit <code>src/App.tsx</code> and save to test HMR
                    </p>
                </div>
                <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
            </div>
        </Provider>
    );
}

export default App;
