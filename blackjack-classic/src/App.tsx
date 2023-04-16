import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { RootRouter } from './components/router';

function App() {
    return (
        <Provider store={store}>
            <RootRouter />
        </Provider>
    );
}

export default App;
