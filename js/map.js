
function validateField(num,fld){
    fld.value = fld.value.toUpperCase(); //changes field to upper case
    /*
    Options:
        1- internal ID
        2- node ID
        3- MRC/SRC
        4- variable type
        5- start address
        6- # of elements
    */
    var pat1 = /[^0-9]/; //tests regex pattern to make sure field is two digit number
    var pat2 = /[^0-9 ^a-f ^A-F]/; //test regex pattern to make sure field is 
    if(num==1 || num==2){
        if(!pat1.test(fld.value) && fld.value.length==2){ //if field is two digit number
            var n = parseInt(fld.value,10);
            return validateHelper(fld,99,n);
        }
        else{
            fld.style.color = 'red';
            return false;
        }
    }
    else if(num==3){ //field 3 is a dropdown so always valid
        return true;
    }
    else if(num==4){
        if(!pat2.test(fld.value) && fld.value.length==2){ //if field is two digit hex value
            var n = parseInt(fld.value,16);
            return validateHelper(fld,255,n);
        }
        else{
            fld.style.color = 'red';
            return false;
        }
    }
    else if(num>=5 && num<=6){
        if(!pat2.test(fld.value) && fld.value.length==4){ //if field is four digit hex value
            var n = parseInt(fld.value,16);
            return validateHelper(fld,65535,n);
        }
        else{
            fld.style.color = 'red';
            return false;
        }
    }
}
function validateHelper(fld,max,n){ //used in validation to do last check before validation
    if(Number.isInteger(n)&& n>=0 && n<=max){
        fld.style.color = 'green';
        return true;
    }
    else{
        fld.style.color = 'red';
    }
}
function finalValidate(num){ //called to loop over each field per row; checks by looking at font color
    var arr = [];
    var children = document.getElementsByClassName('input'+num);
    for(var i=0;i<children.length;i++){
        var str = children[i].type;
        if(children[i].style.color!='green' && !str==="select"){
            alert("Fields entered incorrectly");
            return;
        }
        arr.push(children[i].value.toUpperCase());
    }
    return arr;
}
function adjust(num){ //makes 1 digit numbers into 2 digit numbers
    if(num.toString().length==1)   return '0'+num;
    else                           return num;
}
function getData(min,max){ //called on load to get the valid mappings
    var arr = [];
    for(var i=min;i<max;i++){
        arr.push(i);
    }
    arr.forEach(function(element){
        e = adjust(element);
        HTTP.post("cgi-bin/get_map", "map"+e+".isvalid", function(reply){ 
            doGetData(reply) //send the isValid request responds for further parsing
        })
    })
}
