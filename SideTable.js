export {SideTable};

class SideTable {
    constructor(headerArray, name, cssClass, caption = "", actionSymbol = "&#10010;", blankSymbol = "&#9586;") {
        this.matrix = [headerArray];
        this.name = name;
        this.centerTable = null;
        this.adapter = null;
        this.rowHighLightColor = "LightGrey";
        this.actionSymbol = actionSymbol;

        this.table = document.createElement("table");
        this.table.createCaption();
        this.table.caption.textContent = caption;
        this.table.className = cssClass;
        let row = this.table.insertRow();
        let cell = document.createElement("th");
        cell.innerHTML = blankSymbol;
        row.appendChild(cell);
        for (let i = 0; i < headerArray.length; i++) {
            cell = document.createElement("th");
            cell.innerHTML = headerArray[i];
            row.appendChild(cell);
        }
    }

    getRowIndex(key) {
        let i;
        for (i = 0; i < this.matrix.length; i++) {
            if (this.matrix[i][0].toString() === key.toString()) break;
        }
        return i;
    }

    syncWithMatrix() {
        for (let j = 1; j < this.matrix.length; j++) {
            for (let i = 0; i < this.matrix[j].length; i++) {
                this.table.rows[j].cells[i + 1].innerHTML = this.matrix[j][i];
            }
        }
    }

    moveRow(rowIndex) {
        this.centerTable.appendRow(this.adapter(this.matrix[rowIndex]), this.name);
        this.matrix.splice(rowIndex, 1);
        this.table.deleteRow(rowIndex);
    }

    appendRow(rowArray) {
        this.matrix.push(rowArray);
        let row = this.table.insertRow();
        let cell = row.insertCell(0);
        cell.id = rowArray[0];
        cell.style.cursor = "pointer";
        cell.style.color = "green";
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

        row.addEventListener("mouseover", function (event) {
            event.currentTarget.style.backgroundColor = t.rowHighLightColor;
        });
        row.addEventListener("mouseout", function (event) {
            event.currentTarget.style.backgroundColor = "";
        });
    }

    appendMatrix(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            this.appendRow(matrix[i]);
        }
    }

}
