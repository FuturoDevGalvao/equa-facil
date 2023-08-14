const textAreaResult = document.getElementById("textarea-result");
const btnCopy = document.getElementById("btn-copy-result");
const inputs = document.querySelectorAll("input");

document.getElementById("btnCalc").addEventListener("click", () => {
    const inputValidated = isValidateInputs();

    if (inputValidated) {
        calculateEquation();
    }      
});

function alternateStyleBtnCopy () {
    if (textAreaResult.value == "") {
        return;
    }

    textAreaResult.select();
    document.execCommand("copy");
    alternateTextBtnCopy(btnCopy);
}

function calculateEquation () {
    const delt = calculateDelt();

    if (delt <= 0) {
        textAreaResult.value = "Delta = "+delt+"\n\nΔ < 0, ou seja, a equação não admite solução em R.";
        return;
    } else if (delt == 0) {
        const roots = calculateRoots(delt);
        textAreaResult.value = "Delta = "+delt+"\n\nΔ = 0, então a equação admite uma única solução em R";
        textAreaResult.value += "\n\nx1 = "+roots[0]+"\nx2 = "+roots[1];    
    } else {
        const roots = calculateRoots(delt);
        textAreaResult.value = "Delta = "+delt+"\n\nΔ > 0, então a equação admite várias soluções em R";
        textAreaResult.value += "\n\nx1 = "+roots[0]+"\nx2 = "+roots[1];    
    }
}

function receiveData () {
    const values = [];
     
    const a = parseInt(document.getElementById("value-a").value, 10);
    const b = parseInt(document.getElementById("value-b").value, 10);
    const c = parseInt(document.getElementById("value-c").value, 10);
    
    values.push(a);
    values.push(b);
    values.push(c);
    
    return values;
}
 
function isValidateInputs () {
    const boxs = document.querySelectorAll(".box");
   
    for (let box of boxs) {
        const input = box.querySelector("input");
        if (input.value === "") {
            input.classList.add("error");
            return false;
        }
    }

    return true;
}

function calculateDelt () {
    const values = receiveData();

    const delt = Math.pow(values[1], 2) - 4 * values[0] * values[2];
    
    return delt;
}

function calculateRoots (delt) {
    const values = receiveData();
    const roots = [];
   
    const x1 = (- (values[1]) + Math.sqrt(delt)) / 2 * values[0];
    const x2 = (- (values[1]) - Math.sqrt(delt)) / 2 * values[0];

    roots.push(x1);
    roots.push(x2);

    return roots;
}

function alternateTextBtnCopy (btnCopy) {
    const originalText = btnCopy.innerHTML;
    btnCopy.innerHTML = 'copied! '+'<span class="material-symbols-outlined">done_all</span>';

    setTimeout(() => {
        btnCopy.innerHTML = originalText;
    }, 2000);
}

inputs.forEach( input => {
    input.addEventListener("input", () => {
        if (input.classList.contains("error")) {
            input.classList.remove("error");
        }
        textAreaResult.value = "";
    })
});

btnCopy.addEventListener("click", () => alternateStyleBtnCopy());


