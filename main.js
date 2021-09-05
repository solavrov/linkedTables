import {SideTable} from "./SideTable.js";
import {CentralTable} from "./CentralTable.js";

let ct = new CentralTable(["ticker", "price", "amount", "money", "share"], "linked", "ct", ["center", "right", "right", "right", "right"], "Portfolio");
let st1 = new SideTable(["ticker", "price"], "st1", "linked", ["center", "right"], "Assets 1", );
let st2 = new SideTable(["ticker", "price"], "st2", "linked", ["center", "right"], "Assets 2", );

function cs(row) {
    row.splice(2, 3);
    return row;
}

function sc(row) {
    row.push(100);
    row.push(0);
    row.push(0);
    return row;
}

ct.link(st1, cs, sc);
ct.link(st2, cs, sc);

st1.appendMatrix([["SBER", 30], ["GAZP", 50]]);
st2.appendMatrix([["APPL", 300], ["MSFT", 500]]);
ct.appendMatrix([["LKOH", 100, 100, 10000, 50], ["TSLA", 200, 50, 10000, 50]], ["st1", "st2"]);

function sumOfCol(matrix, indexOfCol) {
    let s = 0;
    for (let j = 1; j < matrix.length; j++) {
        s += matrix[j][indexOfCol];
    }
    return s;
}

function summarizer(matrix) {
    return ["TOTAL", "", sumOfCol(matrix, 2), sumOfCol(matrix, 3), Math.round(sumOfCol(matrix, 4))];
}

ct.addSummary(summarizer);

let box1 = document.getElementById("box1");
let box2 = document.getElementById("box2");
let box3 = document.getElementById("box3");

box1.appendChild(st1.table);
box2.appendChild(st2.table);
box3.appendChild(ct.table);


function recalculator(matrix) {
    //["ticker", "price", "amount", "money", "share"]
    for (let r of matrix) {
        r[3] = r[1] * r[2];
    }
    let v = sumOfCol(matrix, 3);
    for (let r of matrix) {
        r[4] = Math.round(r[3] / v * 1000) / 10;
    }
    return matrix;
}

ct.addRecalculator(recalculator);

ct.addInput(2);

let i1 = document.getElementById("i1");
let i2 = document.getElementById("i2");

i2.onclick = function() {
    ct.addInput(1);
}

i1.onclick = function() {
    ct.removeInput(1);
}
