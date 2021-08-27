import {SideTable} from "./SideTable.js";

export {CentralTable};

class CentralTable extends SideTable {
    constructor(headerArray, cssClass, caption="", actionSymbol="&#10006;", blankSymbol="&#9586;") {
        super(headerArray, "Central", cssClass, caption, actionSymbol, blankSymbol)
        this.sideTables = {};
        this.adapters = {};
        this.rowOwnerNames = [null];
    }

    link(tableObject, CenterToSideAdapter, SideToCenterAdapter) {
        this.sideTables[tableObject.name] = tableObject;
        this.adapters[tableObject.name] = CenterToSideAdapter;
        tableObject.centerTable = this;
        tableObject.adapter = SideToCenterAdapter;
    }

    moveRow(rowIndex) {
        let name = this.rowOwnerNames[rowIndex];
        this.sideTables[name].appendRow(this.adapters[name](this.matrix[rowIndex]));
        this.matrix.splice(rowIndex, 1);
        this.rowOwnerNames.splice(rowIndex, 1);
        this.table.deleteRow(rowIndex);
    }

    appendRow(rowArray, ownerName) {
        this.matrix.push(rowArray);
        this.rowOwnerNames.push(ownerName);

        let row = this.table.insertRow();
        let cell = row.insertCell(0);
        cell.id = rowArray[0];
        cell.style.cursor = "pointer";
        cell.style.color = "red";
        cell.style.fontWeight = "bold";
        cell.innerHTML = this.actionSymbol;
        for (let i = 0; i < rowArray.length; i++) {
            cell = row.insertCell(i + 1);
            cell.innerHTML = rowArray[i];
        }

        let t = this;
        let handler = function (event) {
            let i = t.getRowIndex(event.target.id);
            t.moveRow(i);
        };
        row.cells[0].addEventListener("click", handler);

        row.addEventListener("mouseover", function(event) {
            event.currentTarget.style.backgroundColor = t.rowHighLightColor;
        });
        row.addEventListener("mouseout", function(event) {
            event.currentTarget.style.backgroundColor = "";
        });
    }

}

