const NUM_COLS = 8;
/*
 * This function is used for a dynamic version of the advanced mappings page. The function is called when there
 * is a change in rows (either to add a row or delete row(s)). 
 * @param {number} num - The type of row change to be made
 *  0 = add row; 1 = delete row(s)
*/
function rowChange(num){
    if(!localStorage.allMappings){

        localStorage.setItem("allMappings","[]");
    }
    if(!localStorage.numMappings){
        localStorage.numMappings = 0;
        localStorage.rowI = 0;
    } 
    var table = document.getElementById('mapping-table');
    if(!num){
        //add row
        var row = table.insertRow(-1);
        row.id = "row"+localStorage.rowI;
        var i;
        for(i=0;i<NUM_COLS;i++){
            var cell = row.insertCell(i);
            cell.style.textAlign = "center";
            if(i==NUM_COLS-1){
                var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.type = "checkbox";
                checkbox.name = "mycheckbox"
                row.cells[NUM_COLS-1].appendChild(checkbox);
            }
            else if(i==NUM_COLS-2){
                var submit = document.createElement('input');
                submit.type = "button";
                submit.value = "Submit";
                submit.id = "sub"+localStorage.rowI;
                submit.onclick = function() {pressSubmit(this,this.id);};
                row.cells[NUM_COLS-2].appendChild(submit);
            }
            else{
                var text = document.createElement('input');
                text.type = "textbox";
                text.textAlign = 'center';
                text.name = "mytextbox";
                text.height = "20px";
                text.size = 20;
                text.placeholder = "ROW:"+localStorage.rowI+"\tCOL:"+i;
                row.cells[i].appendChild(text);
            }
        }
        localStorage.rowI++;
    }
    else{
        var boxes = document.getElementsByName('mycheckbox');
        var i;
        var checkedBoxes = [];
        for(i=0;i<boxes.length;i++){
            if(boxes[i].checked)
                checkedBoxes.push(boxes[i]);
        }
        if(confirm("Are you sure you want to delete "+checkedBoxes.length+" mapping(s).")){
            for(i=0;i<checkedBoxes.length;i++){
                var arr = [];
                var del = checkedBoxes[i].parentElement.parentElement;
                for(var j=0;j<del.childElementCount;j++){
                    if(del.childNodes[j].childNodes[0].name === 'mytextbox')
                        if(!del.childNodes[j].childNodes[0].value=='')
                            arr.push(del.childNodes[j].childNodes[0].value)
                }
                if(arr.length==NUM_COLS-2){
                    var parsed = JSON.parse(localStorage.allMappings);
                    var index = indexOfArray(arr,parsed);
                    parsed.splice(index,1);
                    localStorage.allMappings = JSON.stringify(parsed);
                    localStorage.numMappings--;
                    document.getElementById('toDevice').innerHTML = "Send the array "+arr+" for deletion for ID "+arr[0]
                }
                del.parentElement.removeChild(del);
            }
        }
    }
    if(!localStorage.allMappings)
        localStorage.allMappings = "[]";
}
/*
 * This function is used for a dynamic version of the advanced mappings page. The function is called when the user selects the 'select all' button and highlights checkboxes for all rows 
*/
function selectAll(){
    var boxes = document.getElementsByName('mycheckbox');
    var i;
    for(i=0;i<boxes.length;i++){
        boxes[i].checked = true;
    }
}
function pressSubmit(but,str){
    var rowIndex;
    if(str.length==4)
        rowIndex = str[str.length-1];
    else if (str.length==5){
        rowIndex = str.slice(str.length-2)
    }
    else if(str.length==6){
        rowIndex = str.slice(str.length-3)
    }
    var row = document.getElementById("row"+rowIndex);
    var arr = [];
    for(var i=0;i<NUM_COLS-2;i++){
        //TODO: PRECHECK (done) and then actual validation Here
        if(row.childNodes[i].childNodes[0].name === 'mytextbox' && row.childNodes[i].childNodes[0].value){
            arr.push(row.childNodes[i].childNodes[0].value)
            row.childNodes[i].childNodes[0].readOnly = true;
            row.childNodes[i].childNodes[0].style.color = "lightgreen";
        }
        else{
            for(i=0;i<NUM_COLS-2;i++){
                row.childNodes[i].childNodes[0].style.color = "red";
                row.childNodes[i].childNodes[0].readOnly = false;
            }
            document.getElementById('toDevice').innerHTML = "Invalid Submission";
            return;
        }
    }
    var parsed = JSON.parse(localStorage.allMappings);
    var index = indexOfArray(arr,parsed);
    if(but.value === "Submit"){
        var biggerArr = JSON.parse(localStorage.getItem("allMappings"));
        biggerArr.push(arr);
        localStorage.setItem("allMappings",JSON.stringify(biggerArr));
        document.getElementById('sub'+rowIndex).value = "Update";
        localStorage.numMappings++;
        document.getElementById('toDevice').innerHTML = "Send the array "+arr+" for submission validation for ID "+arr[0]
    }
    else if(but.value==="Update"){
        but.value="Submit";
        for(var i=0;i<row.childElementCount;i++){
            row.childNodes[i].childNodes[0].readOnly = false;
            row.childNodes[i].childNodes[0].style.color = "black";
        }
        parsed.splice(index,1);
        localStorage.allMappings = JSON.stringify(parsed);
        localStorage.numMappings--;   
        document.getElementById('toDevice').innerHTML = "Send the array "+arr+" for deletion for ID "+arr[0]
    }
}
function loadMappings(){
    if(localStorage.numMappings>0){
        var i=0;
        var allMaps = JSON.parse(localStorage.allMappings);
        while(i<allMaps.length){
            var j=0;
            map = allMaps[i];
            rowChange(0);
            while(j<map.length){
                document.getElementById("row"+i).childNodes[j].childNodes[0].value = map[j];
                document.getElementById("row"+i).childNodes[j].childNodes[0].readOnly = true;
                document.getElementById("row"+i).childNodes[j].childNodes[0].style.color = "lightgreen";
                j++;
            }
            document.getElementById('sub'+i).value = 'Update';
            i++;
        }
    }
}
function indexOfArray(val, array) {
    var
        hash = {},
        indexes = {},
        i, j;
    for(i = 0; i < array.length; i++) {
        hash[array[i]] = i;
    }
    return (hash.hasOwnProperty(val)) ? hash[val] : -1;
}
function sortMappings(){
    var arr = JSON.parse(localStorage.allMappings);
    arr = arr.sort(Comparator);
    localStorage.allMappings = JSON.stringify(arr)
}
function Comparator(a,b){
    if(a[0]<b[0]) return -1;
    if(a[0]>b[0]) return 1;
}
function loadData(){
    var url = "cgi-bin/get_cfg";
    HTTP.post(url,"",handler)
}
function handler(procText){
    document.getElementById('toDevice').innerHTML = procText;
}