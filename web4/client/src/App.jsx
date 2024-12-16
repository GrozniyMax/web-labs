import {Provider} from 'react-redux'; // Импортируем Provider
import store from './redux/store'; // Импортируем store
import './App.css'
import LoginPage from "./components/LoginPage.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from "./components/MainPage.jsx";
import {CanvasPage} from "./components/CanvasPage.jsx";
import {FormPage} from "./components/FormPage.jsx";
import HomePage from "./components/HomePage.jsx";

function App() {

    return (
        <>
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/auth/:action" element={<LoginPage/>}/>
                        <Route path={"/main/:type"} element={<MainPage/>}/>
                    </Routes>
                    {/*<Routes>*/}
                    {/*    <Route path="/" element={<MainPage/>}/>*/}
                    {/*    <Route path="/auth/:action" element={<LoginPage/>}/>*/}
                    {/*    <Route path={"/main"} element={<MainPage/>}/>*/}
                    {/*</Routes>*/}
                </Router>
            </Provider>
        </>
    )
}

export default App;
