import {SideTable} from "./SideTable.js";
import {CentralTable} from "./CentralTable.js";

let ct = new CentralTable(["ticker", "price", "double price"], "linked", "Portfolio");
let st1 = new SideTable(["ticker", "price"], "st1", "linked", "Assets 1", );
let st2 = new SideTable(["ticker", "price"], "st2", "linked", "Assets 2", );

function cs1(row) {
    row.splice(2, 1);
    return row;
}

function cs2(row) {
    row.splice(2, 1);
    return row;
}

function sc(row) {
    row.push(row[1] * 2);
    return row;
}

ct.link(st1, cs1, sc);
ct.link(st2, cs2, sc);

st1.appendRow(["SBER", 30]);
st1.appendRow(["GAZP", 50]);

st2.appendRow(["APPL", 100]);
st2.appendRow(["MSFT", 200]);

ct.appendRow(["LKOH", 100, 200], "st1");


let box1 = document.getElementById("box1");
let box2 = document.getElementById("box2");
let box3 = document.getElementById("box3");


box1.appendChild(st1.table);
box2.appendChild(st2.table);
box3.appendChild(ct.table);


