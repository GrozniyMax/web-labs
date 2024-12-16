import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {click, setR} from "../redux/actions.jsx";
import * as network from "../utils/network.jsx";
import {useNavigate} from "react-router-dom";
import {InputText} from "primereact/inputtext";
import {Slider} from "primereact/slider";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css"
import RSelector from "./RSelector.jsx";
import {Button} from "primereact/button";
import "../css/Formpage.css"

export function FormPage() {

    const valuesR = [
        '1', '2', '3', '4'
    ];


    let jwt = useSelector(state => state.jwt);
    const navigate = useNavigate();

    const [selectedR, setSelectedR] = useState(valuesR[0]); // Выбираем первый элемент по умолчанию
    const [selectedX, setSelectedX] = useState(0); // Выбираем первый элемент по умолчанию
    const [selectedY, setSelectedY] = useState(0); // Выбираем первый элемент по умолчанию


    const dispatch = useDispatch();

    function updateR(val) {
        console.log(`Selected new R value ${val}`);
        setSelectedR(val);
        dispatch(setR(val))
    }

    function updateX(val) {
        console.log(`Selected new R value ${val}`);
        setSelectedX(val);
    }

    function updateY(val) {
        console.log(`Selected new R value ${val}`);
        setSelectedY(val);
    }

    function update() {
        console.log(`Sending data x: ${selectedX}, y:${selectedY}, r:${selectedR}`)
        network.fullSend({
            x: selectedX,
            y: selectedY,
            r: selectedR,
            jwt: jwt
        }).then((result) => {
            if (result === "error") {
                throw Error("Error while getting data request")
            }
            const event = click({x: selectedX, y: selectedY, r: selectedR, hit: result.result})
            dispatch(event);
            navigate("/main/canvas")
        }).catch((e) => {
            alert("Ошибка при отправке запроса")
            console.error(e);
        });

    }

    return (

        <>
            <h3>Select X value</h3>
            <InputText value={selectedX} onChange={(e) => setSelectedX(e.target.value)}
                       min={-4} max={4} placeholder={"Select X value"}/>
            <Slider value={selectedX} onChange={(e) => setSelectedX(e.value)} min={-4} max={4} step={0.2}/>

            <h3>Select Y value</h3>
            <InputText value={selectedY} onChange={(e) => setSelectedY(e.target.value)}
                       min={-4} max={4} placeholder={"Select Y value"}/>
            <Slider value={selectedY} onChange={(e) => setSelectedY(e.value)} min={-4} max={4} step={0.2}/>

            <h3>Select R value</h3>
            <RSelector  />

            <Button onClick={update}>Submit</Button>
        </>
    );
}
