import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { RouterWithListener } from './components/router';

function App() {
    return (
        <Provider store={store}>
            <RouterWithListener />
        </Provider>
    );
}

export default App;
