// document.addEventListener("click",
//     printMousePos)

document.getElementById("plot").addEventListener("click", handleMouseClick);
document.getElementById("r-input").addEventListener("change", updateOnRSelected);
window.onload = prepareCanvas

function prepareCanvas() {
    const canvas = document.getElementById("plot");
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawFigures();
    drawAxis();
}

function drawAxis() {
    console.log("Рисую оси")
    const canvas = document.getElementById("plot")
    const ctx = canvas.getContext("2d")

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const arrayModifier = 10

    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';

    // Рисуем оси
    ctx.beginPath();
    ctx.moveTo(centerX, 0); // ось Y

    ctx.lineTo(centerX - arrayModifier, 0 + arrayModifier); //Стрелочка
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX + arrayModifier, 0 + arrayModifier);

    ctx.moveTo(centerX, 0); // Сама ось
    ctx.lineTo(centerX, canvas.width);


    ctx.moveTo(0, centerY);  // ось X
    ctx.lineTo(canvas.height, centerY); // сама ось
    ctx.lineTo(canvas.height - arrayModifier, centerY - arrayModifier); // Стрелочка
    ctx.moveTo(canvas.height, centerY);
    ctx.lineTo(canvas.height - arrayModifier, centerY + arrayModifier);
    ctx.moveTo(canvas.height, centerY);
    ctx.stroke();

    // Подписи к осям
    ctx.font = '16px Arial';
    ctx.fillText('Ось X', 450, 270);
    ctx.fillText('Ось Y', 260, 20);

    drawFigures()
}


function drawFigures() {
    const canvas = document.getElementById("plot")
    const ctx = canvas.getContext("2d")

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    var r = localStorage.getItem("current-r-value");

    if (isNaN(r) || r === null || r === undefined) {
        console.log("No r value found")
        return;
    }
    r = relativeR(r)

    ctx.fillStyle = 'lightblue';
    ctx.strokeStyle = 'lightblue';

    // Четверть окружности
    ctx.beginPath()
    ctx.arc(centerX, centerY, r/2, Math.PI * 2, Math.PI * 0.5);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Квадрат
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX - r, centerY);
    ctx.lineTo(centerX - r, centerY + r);
    ctx.lineTo(centerX, centerY + r);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    //Треугольник
    ctx.beginPath();
    ctx.moveTo(centerX - r / 2, centerY);
    ctx.lineTo(centerX, centerY - r);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}


function handleMouseClick(event) {
    const canvas = document.getElementById("plot")

    const baseMouseX = event.offsetX;
    const baseMouseY = event.offsetY;

    var mouseX = baseMouseX;
    var mouseY = baseMouseY;

    console.log(`Click with x:${mouseX} y:${mouseY}`);

    //Перевод координат в координаты относительно центра
    mouseX -= (canvas.width / 2);
    mouseY = (canvas.height / 2) - mouseY;
    console.log(`Translated coorditates x:${mouseX} y:${mouseY}`)

    const newMin = -4;
    const newMax = 4;
    const oldMin = -250;
    const oldMax = 250;

    // Формула для интерполяции
    mouseX = ((mouseX - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
    mouseY = ((mouseY - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
    console.log(`Translated to new range coorditates x:${mouseX} y:${mouseY}`)

    const r = parseFloat(localStorage.getItem("current-r-value")) || null; // Радиус в пикселях

    if (isNaN(r) || r === null || r === undefined) {
        console.log("No r value found")
        return;
    }

    const form = new FormData();
    form.append("x", mouseX);
    form.append("y", mouseY);
    form.append("r", r);

    //todo url
    const url = "controller" + new URLSearchParams(form).toString();

    const response = fetch(`controller`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
                x:mouseX,
                y:mouseY,
                r:r
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log(response.body)
        return response.json();
    })
        .then(data => {
            console.log(data);
            updateTable(data);
            if (data.result==="true"||data.result===true||data.result) {
                prepareCanvas()
                console.log("Drawing point")
                drawPoint(data)
            }// обработка данных
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

}

function drawPoint({point}) {
    const canvas = document.getElementById("plot")
    const ctx = canvas.getContext("2d")


    const x = relativeX(point.x)
    const y = relativeY(point.y)

    console.log(`Drawing point with x:${x} y:${y}`)
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();


}


function updateTable({point, startTime, endTime, result}) {
    const body = document.getElementById("result-body");

    const row = document.createElement("tr");

    row.innerHTML = `
                    <td>${point.x}</td>
                    <td>${point.y}</td>
                    <td>${point.r}</td>
                    <td>${result}</td>
                    <td>${startTime.toString()}</td>
                    <td>${endTime.toString()}</td>
                `;
    body.appendChild(row);
}


function relativeX(x) {
    const canvas = document.getElementById("plot")
    const old_range = 8
    const new_range = canvas.width;
    var newValue = (((x - (-4)) * new_range) / old_range) + (-canvas.width / 2);
    newValue = canvas.width/2 + (newValue)
    return newValue
}

function relativeY(y) {
    const canvas = document.getElementById("plot")
    const old_range = 8
    const new_range = canvas.height;
    var newValue = (((y - (-4)) * new_range) / old_range) + (-canvas.height / 2);
    newValue = canvas.height/2 + (-newValue)
    return newValue
}

function relativeR(r) {

    const newMin = 0;
    const newMax = 250;
    const oldMin = 0;
    const oldMax = 4;

    const translatedValue = ((r - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
    console.log("New r value: " + translatedValue);
    return translatedValue;

}


function updateOnRSelected() {
    const value = document.getElementById("r-input").value;
    console.log("select changed value")
    if (!(isNaN(value) || value == null)) {
        console.log(`new r value: ${value}`)
        localStorage.setItem("current-r-value", value);
    }
    prepareCanvas();
}
