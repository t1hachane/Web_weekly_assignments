document.getElementById("btn1").onclick = function() {
    this.disabled = true;
    fetch("https://itest.com.vn/lects/webappdev/fetch/data/")
    .then(response => response.text())
    .then(jsonData => {
        jsonData = JSON.parse(jsonData);
        const table = document.querySelector("#json_table").getElementsByTagName("tbody")[0];
        const numRows = jsonData.length;
            for (i = 0; i < numRows; i++) {
                const newRow = table.insertRow(i);
                const cell1 = newRow.insertCell(0);
                const cell2 = newRow.insertCell(1);
                const cell3 = newRow.insertCell(2);
                cell1.textContent = jsonData[i].name;
                cell2.textContent = jsonData[i].age;
                let carInfo = '';
                jsonData[i].cars.forEach(car => {
                    carInfo += `${car.name}<br>`;
                    carInfo += `${car.models.join(", ")}<br><br>`;
                });

                cell3.innerHTML = carInfo;
            }

    })
    .catch(error => console.log(error));
};