import styles from '../css/MainPage.module.css'
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {FormPage} from "./FormPage.jsx";
import {CanvasPage} from "./CanvasPage.jsx";

export default function MainPage() {

    let dispatch = useDispatch();
    let navigate = useNavigate();

    let {type} = useParams();

    function update() {
        Cookies.remove('refresh_token');
        dispatch({type: 'SET_JWT', jwt: ''});
        navigate('/');
    }

    return (
        <div className={styles.mainContainer}>
            <header className={styles.header}>
                <button onClick={update}>Logout</button>
            </header>
            <div className={styles.mainContainer}>
                {type === "form" ?
                    <FormPage/> : <CanvasPage/>}
            </div>
        </div>
    );
}
