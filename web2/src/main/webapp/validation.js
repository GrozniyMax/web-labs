document.querySelector('input[type="button"]')
    .addEventListener("click", ()=>{
        console.log("clicked on submit button");
        x = readX();
        y = readY();
        r = readR();

        if (isNaN(x)||isNaN(y)||isNaN(r)){
            console.log("invalid fields completions. No request will be send")
            return;
        }


        const form = new FormData();
        form.append("x", x);
        form.append("y", y);
        form.append("r", r);
        form.append("expected", "page");

        localStorage.setItem("current-r-value", r);

        const response = fetch(`controller`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                x, y, r
            })
        });

        setTimeout(()=>{
            console.log("Sending request")
            const url = "controller"
            window.location.replace(url, );
        }, 1000)




    })

// document.querySelectorAll(".x-input").forEach((item)=>{
//     item.addEventListener('change', ()=>{
//         const checkedValues = []
//         document.querySelectorAll('.x-input')
//             .forEach((checkbox) => {
//                 if (checkbox.checked) {
//                     checkedValues.push(checkbox.value)
//                     if (checkedValues.length>1){
//                         checkbox.checked=false;
//                     }
//                 }
//             });
//         return parseFloat(checkedValues[0]);
//     })
// })

document.querySelectorAll("input.x-input[type=checkbox]").forEach(item=>{
    item.addEventListener('change', ()=>{
        document.querySelectorAll("input.x-input[type=checkbox]:checked").forEach((checked)=>{
            if (checked!==item){
                checked.checked=false;
            }
        });
    });
})

function readX() {
    var firstElem = false;
    var result;
    document.querySelectorAll('input.x-input[type=checkbox]:checked')
        .forEach((checkbox) => {
            if (!firstElem) {
                result = checkbox.value;
                firstElem = true;
            } else {
                checkbox.checked = false;
            }
        })
    if (!firstElem) {
        alert("Choose value for X")
        return;
    }
    return parseFloat(result);
}

function readY() {

    const textInput = document.getElementById("y-input").value;

    const floatValue = parseFloat(textInput);

    if (isNaN(floatValue)) {
        alert("Please fill Y")
        return
    }
    if (!((-5 <= floatValue) && (floatValue <= 3))) {

        alert("You wrote incorrect value")
        return;
    }
    return floatValue;
}


function readR() {
    const elem = document.getElementById("r-input");
    const value = elem.value;
    if (value==null || value==NaN){
        alert("Choose value for R")
    }
    return parseFloat(value);
}
