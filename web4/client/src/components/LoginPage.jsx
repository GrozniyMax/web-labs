import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import '../css/LoginPage.css';
import Cookies from "js-cookie";

export default function LoginPage() {

    let {action} = useParams();
    let navigate = useNavigate();
    let dispatch = useDispatch();

    function getAnother(action) {
        return action === "login" ? "register" : "login";
    }

    function click() {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        console.log("User credentials: " + username + " " + password);
        console.log("Action: " + action);

        //todo поменять адрес потом
        fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/api/auth/${action}`, {
            method: 'POST', // Указываем метод, который хотим использовать
            headers: {
                'Content-Type': 'application/json', // Указываем тип данных
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'// Указываем, какой тип ответа ожидаем
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(response => {
                if (response.status === 401) {
                    throw new Error('Not authorized');
                }
                if (!response.ok) {
                    throw new Error('Network response was not ok...Sorry');
                }
                console.log();
                // return response.headers.get('Authorization').replace('Bearer ', '');
                return response.json()
            })
            .then(data => {
                console.log(data);
                return data;
            })
            .then(data => {
                dispatch({type: 'SET_JWT', payload: data.jwts});
                Cookies.set('refresh_token', data.refreshToken);
                navigate('/main/form');
            })
            .catch(e => {
                alert(e.message);
                console.error(`Error fetching data ${e.value}`);
                return "error";
            });
    }

    return (
        <div className="center">
            <h1> Welcome</h1>
            <form method="post">

                <div  className="txt_field">
                    <input id="username" type="text" required/>
                    <span> </span>
                    <label>Username </label>
                </div>

                <div className="txt_field">
                    <input id="password" type="password" required/>
                    <span> </span>
                    <label> Password </label>
                </div>
                <input type="button" value={action} onClick={() => click()}/>
                <div className="users_signup">
                    {action === "login" ? "Don't have an account?" : "Already have one?"}
                    <Link to={`/auth/${getAnother(action)}`}>{getAnother(action)}</Link>
                </div>
            </form>
        </div>
    );
}
