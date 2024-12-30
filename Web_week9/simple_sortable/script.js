var col = 0;
var dir = "";
var tbl = document.getElementById("data_table")

tbl.rows[0].cells[1].onclick = function() {
    if (col == 1) 
        tbl.rows[0].cells[1].classList.remove(dir);
    else if (col == 2)
        tbl.rows[0].cells[2].classList.remove(dir);
    if (col == 1) {
        dir = (dir == "asc" ? "desc" : "asc");
    } else {
        col = 1;
        dir = "asc";
    }
    this.classList.add(dir);
    tblSort();
}

tbl.rows[0].cells[2].onclick = function() {
    if (col == 1) 
        tbl.rows[0].cells[1].classList.remove(dir);
    else if (col == 2)
        tbl.rows[0].cells[2].classList.remove(dir);
    if (col == 2) {
        dir = (dir == "asc" ? "desc" : "asc");
    } else {
        col = 2;
        dir = "asc";
    }
    this.classList.add(dir);
    tblSort();
}

function tblSort() {
    var rows = tbl.rows;
    for (var i = 1; i < rows.length; i++) {
        for (var j = i + 1; j < rows.length; j++) {
            if ((dir == "asc" && rows[i].cells[col].innerHTML.toLowerCase() > rows[j].cells[col].innerHTML.toLowerCase()) 
                || (dir == "des" && rows[i].cells[col].innerHTML.toLowerCase() < rows[j].cells[col].innerHTML.toLowerCase())) {
                tmp = rows[i].cells[1].innerHTML;
                rows[i].cells[1].innerHTML = rows[j].cells[1].innerHTML;
                rows[j].cells[1].innerHTML = tmp;

                tmp = rows[i].cells[2].innerHTML;
                rows[i].cells[2].innerHTML = rows[j].cells[2].innerHTML;
                rows[j].cells[2].innerHTML = tmp;
            }
        }
    }
}