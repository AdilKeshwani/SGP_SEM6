

  function openpopup(){
    document.getElementById("popup").style.display = "block";   
    document.getElementById("cover").style.display = "block";
  }
  function closepopup(){
    document.getElementById("popup").style.display = "none";
    document.getElementsByName("file").display = null;
    document.getElementById("cover").style.display = "none";
  }



  function myCreateFunction(record) {
      
    
    if (record.length>0) {
      record.forEach(myFunction);

      function myFunction(item) {
    var table = document.getElementById("myTable");
    var row = document.createElement("TR");
    row.setAttribute("class", "myTr");
    table.appendChild(row);
  
  
    var cell1 = document.createElement("TD");
    var cell2 = document.createElement("TD");
    var cell3 = document.createElement("TD");
    cell1.setAttribute("class", "td1");
    cell2.setAttribute("class", "td2");
    cell3.setAttribute("class", "td3");
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
  
  
    var x = document.createElement("BUTTON");
    var y = document.createElement("BUTTON");
    var z = document.createElement("BUTTON");
    cell1.appendChild(x);
    cell2.appendChild(y);
    cell3.appendChild(z);
    x.innerHTML = item.filename;
    y.innerHTML = "Download"
    z.innerHTML = "Delete"
    x.setAttribute("class", "bt1");
    y.setAttribute("class", "bt2");
    z.setAttribute("class", "bt3");
        
      }
    }
    
  }





  function pr(data){
    x = document.getElementsByClassName("content");
    for (let index = 0; index <= 0; index++) {
        if(index == 0){
          console.log("data");
            var a = document.getElementById("empty");
            a.innerHTML = data;
            
          
          
        }
        else{
          var table = document.getElementById("myTable");
          var row = document.createElement("TR");
          row.setAttribute("class", "myTr");
          table.appendChild(row);
          
          
          var cell1 = document.createElement("TD");
          var cell2 = document.createElement("TD");
          var cell3 = document.createElement("TD");
          cell1.setAttribute("class", "td1");
          cell2.setAttribute("class", "td2");
          cell3.setAttribute("class", "td3");
          row.appendChild(cell1);
          row.appendChild(cell2);
          row.appendChild(cell3);
          
          
          var x = document.createElement("BUTTON");
          var y = document.createElement("BUTTON");
          var z = document.createElement("BUTTON");
          cell1.appendChild(x);
          cell2.appendChild(y);
          cell3.appendChild(z);
          x.innerHTML = "item.filename";
          y.innerHTML = "Download"
          z.innerHTML = "Delete"
          x.setAttribute("class", "bt1");
          y.setAttribute("class", "bt2");
          z.setAttribute("class", "bt3");
        }
        
      }
    }