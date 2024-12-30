window.onload = function () {
    const rows = document.querySelectorAll("#tbl tbody tr");
    const chkall = document.getElementById("chkall");
    const checkboxes = document.querySelectorAll("input[name='chk']");
    const deleteButton = document.querySelector(".group-op-delete");
    const groupOp = document.querySelector(".group-op");
  
    rows.forEach((row) => {
      row.onmouseover = function () {
        this.style.backgroundColor = "green";
        this.style.cursor = "pointer";
      };
  
      row.onmouseout = function () {
        if (this.classList.contains("selectedr")) {
          this.style.backgroundColor = "yellow";
        } else if (this.classList.contains("oddr")) {
          this.style.backgroundColor = "#dfdfdf";
        } else {
          this.style.backgroundColor = "#f0f0f0";
        }
      };
    });
  
    chkall.addEventListener("change", function () {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = this.checked;
        toggleRowSelection(checkbox.closest("tr"), checkbox.checked);
      });
      toggleDeleteButton();
    });
  
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        toggleRowSelection(this.closest("tr"), this.checked);
        chkall.checked = Array.from(checkboxes).every((chk) => chk.checked);
        toggleDeleteButton();
      });
    });
  
    function toggleRowSelection(row, isChecked) {
      if (isChecked) {
        row.classList.add("selectedr");
        row.style.backgroundColor = "yellow";
      } else {
        row.classList.remove("selectedr");
        if (row.classList.contains("oddr")) {
          row.style.backgroundColor = "#dfdfdf"; 
        } else {
          row.style.backgroundColor = "#f0f0f0"; 
        }
      }
    }
  
    rows.forEach((row) => {
      row.addEventListener("click", function (event) {
        const checkbox = this.querySelector("input[name='chk']");
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          toggleRowSelection(this, checkbox.checked);
          chkall.checked = Array.from(checkboxes).every((chk) => chk.checked);
          toggleDeleteButton();
        }
      });
    });
  
    function toggleDeleteButton() {
      const anyChecked = Array.from(checkboxes).some((chk) => chk.checked);
      if (anyChecked) {
        groupOp.classList.remove("nodisplay");
      } else {
        groupOp.classList.add("nodisplay");
      }
    }
  
    deleteButton.onclick = function () {
      deleteSelectedRows();
    };
  
    function deleteSelectedRows() {
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          checkbox.closest("tr").remove(); 
        }
      });
      toggleDeleteButton(); 
    }
  };
  