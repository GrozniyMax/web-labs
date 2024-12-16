import Cookies from 'js-cookie';
import {useDispatch} from "react-redux";

export async function send({x, y, r, jwt}) {
    return await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/api/points/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({
                x: x,
                y: y,
                r: r
            })
        }).then(response => {
            if (response.status === 401) {
                throw new Error('Not authorized');
            }
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json()
        })
        .catch(e => {
            console.error(`Error fetching data: ${e.message}`);
            return "error";
        });

}


export async function refresh() {
    return await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/api/auth/refresh', {
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            if (response.status === 401) {
                throw new Error('Not authorized');
            }
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json()
        }).catch(e => {
                console.error(`Error fetching data: ${e.message}`);
                return "error";
            });
}


export async function sendAndRefresh({x, y, r, jwt}, refreshToken) {
    let result = await send({x, y, r, jwt});
    if (result === "error") {
        let newJwt = await refresh(refreshToken);

        if (newJwt === "error") {
            throw "error";
        }
        newJwt = newJwt.jwts;
        console.log('New jwt: ' + newJwt);
        return send({x, y, r, jwt: newJwt});
    }
    return result;

}

export async function fullSend({x, y, r, jwt}) {
    const refreshToken = Cookies.get("refresh_token");
    console.log('Sending request x: ' + x + ' y: ' + y + ' r: ' + r + ' jwt: ' + jwt);
    console.log('Refresh token: ' + refreshToken);
    try {
        // Ждем завершения sendAndRefresh, который возвращает Promise
        const result = await sendAndRefresh({x, y, r, jwt}, refreshToken);
        return result; // Возвращаем тело ответа из sendAndRefresh
    } catch (error) {
        console.error("Error in fullSend:", error);
        return "error"; // Возвращаем ошибку, если что-то пошло не так
    }
}

