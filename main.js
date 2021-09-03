import {SideTable} from "./SideTable.js";
import {CentralTable} from "./CentralTable.js";

let ct = new CentralTable(["ticker", "price", "double price", "amount"], "linked", "ct", ["center", "right", "right", "right"], "Portfolio");
let st1 = new SideTable(["ticker", "price"], "st1", "linked", ["center", "right"], "Assets 1", );
let st2 = new SideTable(["ticker", "price"], "st2", "linked", ["center", "right"], "Assets 2", );

function cs1(row) {
    row.splice(2, 2);
    return row;
}

function cs2(row) {
    row.splice(2, 2);
    return row;
}

function sc(row) {
    row.push(row[1] * 2);
    row.push(0);
    return row;
}

ct.link(st1, cs1, sc);
ct.link(st2, cs2, sc);

st1.appendMatrix([["SBER", 30], ["GAZP", 50]]);
st2.appendMatrix([["APPL", 100], ["MSFT", 200]]);
ct.appendMatrix([["LKOH", 100, 200, 0], ["TSLA", 1000, 2000, 0]], ["st1", "st2"]);

function sumOfCol(matrix, indexOfCol) {
    let s = 0;
    for (let j = 1; j < matrix.length; j++) {
        s += matrix[j][indexOfCol];
    }
    return s;
}

function summarize(matrix) {
    return ["TOTAL", sumOfCol(matrix, 1), "", sumOfCol(matrix, 3)];
}

ct.addSummary(summarize);


let box1 = document.getElementById("box1");
let box2 = document.getElementById("box2");
let box3 = document.getElementById("box3");

box1.appendChild(st1.table);
box2.appendChild(st2.table);
box3.appendChild(ct.table);

function halfCol(matrix, indexOfCol) {
    for (let j = 1; j < matrix.length; j++) {
        matrix[j][indexOfCol] /= 2;
    }
}

halfCol(st1.matrix, 1);
st1.syncTableWithMatrix();

halfCol(ct.matrix, 1);
halfCol(ct.matrix, 2);
ct.syncTableWithMatrix();

function recalculator(matrix) {
    let m = matrix.map((row) => [...row]);
    for (let j = 1; j < m.length; j++) {
        m[j][2] = m[j][1] * 2;
    }
    return m;
}

ct.addRecalculator(recalculator);

//ct.addInput(3);

let i1 = document.getElementById("i1");
let i2 = document.getElementById("i2");

i2.onclick = function() {
    ct.addInput(1);
}

i1.onclick = function() {
    ct.removeInput(1);
}




