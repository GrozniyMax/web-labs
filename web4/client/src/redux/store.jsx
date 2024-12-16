import {createStore} from 'redux';

const storage = {
    r: 1,
    jwt: "",
    points: [
    ]
}


const reducer = function (state = storage, action) {
    switch (action.type) {
        case "CLICK":
            console.log("Adding point ");
            console.log(action.payload)
            return {
                ...state, // Сохраняем остальную часть состояния
                points: [...state.points, action.payload] // Добавляем нового пользователя в массив
            };
        case "SET_R":
            console.log("Setting r to " + action.payload);
            return {
                ...state,
                r: action.payload
            };
        case "SET_JWT":
            console.log("Setting jwt to " + action.payload);
            return {
                ...state,
                jwt: action.payload
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;

