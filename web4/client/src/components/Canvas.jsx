import {useEffect, useRef} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {click} from "../redux/actions.jsx";
import * as network from "../utils/network.jsx"
import {convert} from "../utils/coordinates.jsx";

function Canvas() {

    const canvasRef = useRef(null);
    let points = useSelector((state) => state.points);
    let r = useSelector((state) => state.r);
    let jwt = useSelector(state => state.jwt)
    const dispatch = useDispatch();

    useEffect(() => {
        // Получаем ссылку на канвас
        const canvas = canvasRef.current;
        drawGraph()
    }, [r]);


    function update(event) {
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;

        // Переводим координаты в координаты графика
        let newX = event.nativeEvent.offsetX;
        let newY = event.nativeEvent.offsetY;

        console.log('Original coordinates: ', newX, newY);

        newX -= (250);
        newY = (250) - newY;

        console.log('Translated coordinates: ', newX, newY);

        newX = convert({
            currentValue: newX,
            currentMin: -250,
            currentMax: 250,
            futureMin: -4,
            futureMax: 4
        });
        newY = convert({
            currentValue: newY,
            currentMin: -250,
            currentMax: 250,
            futureMin: -4,
            futureMax: 4
        });

        console.log('Converted coordinates: ', newX, newY);
        network.fullSend({
            x: newX,
            y: newY,
            r,
            jwt: jwt
        }).then((result) => {
            if (result === "error") {
                throw Error("Error while getting data request")
            }
            const event = click({x: newX, y: newY, r, hit: result.result})
            dispatch(event);
            drawGraph();
            points
                .filter((p) => p.r === r)
                .filter((p) => p.hit)
                .forEach((p) => drawPoint(p))
        }).catch((e) => {
            alert("Ошибка при отправке запроса")
            console.error(e);
        });

    }

    function drawGraph() {
        const centerX = canvasRef.current.width / 2;
        const centerY = canvasRef.current.height / 2;
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;

        const pixelR = convert({
            currentValue: r,
            currentMin: 0,
            currentMax: 4,
            futureMin: 0,
            futureMax: 250
        });
        console.log(`r: ${pixelR}`);
        console.log(`width: ${width} height: ${height}`);
        let ctx = canvasRef.current.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'white';
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

        ctx.fillStyle = 'blue';
        ctx.strokeStyle = 'blue';
        // Четверть окружности
        ctx.beginPath()
        ctx.arc(centerX, centerY, pixelR / 2, Math.PI * 2, Math.PI * 0.5);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Квадрат
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX - pixelR, centerY);
        ctx.lineTo(centerX - pixelR, centerY + pixelR);
        ctx.lineTo(centerX, centerY + pixelR);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //Треугольник
        ctx.beginPath();
        ctx.moveTo(centerX - pixelR / 2, centerY);
        ctx.lineTo(centerX, centerY - pixelR);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

    }

    function drawPoint({x, y}) {

        x = convert({
            currentValue: x,
            currentMin: -4,
            currentMax: 4,
            futureMin: -250,
            futureMax: 250
        });
        y = convert({
            currentValue: y,
            currentMin: -4,
            currentMax: 4,
            futureMin: -250,
            futureMax: 250
        });
        x += 250;
        y = 250 - y;
        console.log(`Drawing point at ${x}, ${y}`);
        let ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
        ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    return (
        <canvas ref={canvasRef} height="500" width="500" onClick={(event) => update(event)}/>
    );
}

export default Canvas;
