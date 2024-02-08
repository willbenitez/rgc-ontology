import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import SearchPage from './pages/searchPage';
import store from './redux/store/store'
import { Provider } from 'react-redux'

function App(): JSX.Element {
    return (
        <Provider store={store}>
            <SearchPage />
        </Provider>
    );
}

export default App;
