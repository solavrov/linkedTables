import {SideTable} from "./SideTable.js";

export {CentralTable};

class CentralTable extends SideTable {
    constructor(headerArray, cssClass, caption="", actionSymbol="&#10006;", blankSymbol="&#9586;") {
        super(headerArray, "Center", cssClass, caption, actionSymbol, blankSymbol)
        this.sideTables = {};
        this.adapters = {};
        this.rowOwnerNames = [null];
        this.summarize = null;
    }

    link(tableObject, CenterToSideAdapter, SideToCenterAdapter) {
        this.sideTables[tableObject.name] = tableObject;
        this.adapters[tableObject.name] = CenterToSideAdapter;
        tableObject.centerTable = this;
        tableObject.adapter = SideToCenterAdapter;
    }

    addSummary(summarize) {
        this.summarize = summarize;
        let sumRow = summarize(this.matrix);

        let row = this.table.insertRow();
        let cell = row.insertCell(0);
        cell.innerHTML = "";
        for (let i = 0; i < sumRow.length; i++) {
            cell = row.insertCell(i + 1);
            cell.innerHTML = sumRow[i];
        }
    }

    refreshSummary() {
        if (this.summarize !== null) {
            let sumRow = this.summarize(this.matrix);
            for (let i = 0; i < sumRow.length; i++) {
                this.table.rows[this.matrix.length].cells[i + 1].innerHTML = sumRow[i];
            }
        }
    }

    moveRow(rowIndex) {
        let name = this.rowOwnerNames[rowIndex];
        this.sideTables[name].appendRow(this.adapters[name](this.matrix[rowIndex]));
        this.matrix.splice(rowIndex, 1);
        this.rowOwnerNames.splice(rowIndex, 1);
        this.table.deleteRow(rowIndex);
        this.refreshSummary();
    }

    appendRow(rowArray, ownerName) {
        this.matrix.push(rowArray);
        this.rowOwnerNames.push(ownerName);

        let row;
        if (this.summarize !== null) {
            row = this.table.insertRow(this.matrix.length - 1);
        } else {
            row = this.table.insertRow();
        }
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
        this.refreshSummary();

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

    appendMatrix(matrix, ownerNames) {
        for (let i = 0; i < matrix.length; i++) {
            this.appendRow(matrix[i], ownerNames[i]);
        }
    }

}

