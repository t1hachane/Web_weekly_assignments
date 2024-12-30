function getXmlHttpObject() {
    var xmlHttp = null;  
    try {  
        xmlHttp = new XMLHttpRequest(); 
    } catch (e) {
        try  { 
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {                          
			try {  
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");  
			} catch (e) { 
				return null;
			}                   
        }   
    }
	return xmlHttp;
}
document.getElementById("btn1").onclick = function() {
    this.disabled = true;
    var xmlhttp = getXmlHttpObject();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            // document.getElementById("div1").innerHTML = this.responseText;
            const jsonData = JSON.parse(this.responseText);
            console.log(jsonData)
            const table = document.querySelector("#json_table").getElementsByTagName("tbody")[0];
            const numRows = jsonData.length;
            for (i = 0; i < numRows; i++) {
                const newRow = table.insertRow(i);
                const cell1 = newRow.insertCell(0);
                const cell2 = newRow.insertCell(1);
                const cell3 = newRow.insertCell(2);
                cell1.textContent = jsonData[i].name; 
                cell2.textContent = jsonData[i].age;
                cell3.textContent = jsonData[i].cars.models;
                let carInfo = `${jsonData[i].cars.length}<br>`;
                jsonData[i].cars.forEach(car => {
                    carInfo += `${car.name}<br>`;
                    carInfo += `${car.models.join(", ")}<br><br>`;
                });

                cell3.innerHTML = carInfo;
            }

        }
        
    };
    xmlhttp.open("GET", "https://itest.com.vn/lects/webappdev/json/data/", true);
    xmlhttp.send(null);
};