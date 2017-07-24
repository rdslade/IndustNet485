
function verifyIP(fld, required, zeroOk, str)
{
  var ipValue;
  var errStr = "";
  var ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  var ipArray;

  if (fld.value == null)
    ipValue = "";
  else
    ipValue = trim(fld.value);
  fld.value = ipValue;

  if (ipValue == "")
  {
    if (required)
      errStr = "Required field";
  }
  else
  {
    ipArray = ipValue.match(ipPattern);
    if ((!zeroOk && (ipValue == "0.0.0.0")) || (ipValue == "255.255.255.255"))
    {
      errStr = "Reserved IP address";
    }
    else if ((ipArray == null) || (ipArray.length < 4))
    {
      errStr = "Invalid IP address";
    }
    else
    {
      for (i = 1; i <= 4; i++)
      {
        if (ipArray[i] > 255)
        {
          errStr = "Invalid IP address";
          break;
        }
      }
    }
  }

  if (errStr.length){
    fld.style.color = "red";
    document.getElementById(str).src="pics/x.png";
    return 0;
  }
  else{
    ;
    fld.style.color = "black";
    document.getElementById(str).src="pics/check.png";
    return 1;
  }
}

function validSubnetMask(fld){
    var a = '0'
    if(fld.value)
        var a = fld.value.split(".");
    if(a.length == 4 && a[3]!=''){
        var maskValueB = "";
        var i;
        for(i=0;i<4;i++){
            var bin=(a[i]>>>0).toString(2);
            while(bin.length<8)
                bin = "0"+bin;
            maskValueB+=bin;
        }
        var s = 0;
        var first = maskValueB[0];
        for(i=1;i<maskValueB.length;i++){
            if(first!=maskValueB[i]){
                if(!s){
                    s++;
                    first=0;
                }
                else{
                    fld.style.color = "red";
                    document.getElementById("subpic").src="pics/x.png";
                    return 0;
                }
            }
        }
    fld.style.color="black";
    document.getElementById("subpic").src="pics/check.png";
    return 1;
    }
    else{
        fld.style.color = "red";
        document.getElementById("subpic").src="pics/x.png";
        return 0;
    }
    
}

function validDomainFld(fld, okBlank)
{
  var okTest = true;
  var errMsg = "";

  fld.value = trim(fld.value);

  if (fld.value.length > 0) {
	 if (validDomainStr(fld.value) == false) {
      okTest = false;
      errMsg = "Domain name is not in a proper format";
    }
  }
  else if (! okBlank) {
    okTest = false;
    errMsg = "Field may not be blank";
  }

  if (okTest) {
    fld.style.backgroundColor = 'White';
  }
  else {
    fld.style.backgroundColor = 'Yellow';
    alert(errMsg);
    fld.focus();
  }

  return okTest;
}

function validDomainStr(dn)
{
  var inv1 = /[^a-zA-Z0-9\-\.]/;
  var inv2 = /(\.\.)|(\.-)|(-\.)/;

  if (dn.length > 63 || dn.length < 3)
    return false;
  if (inv1.test(dn))
    return false;
  if (inv2.test(dn))
    return false;
  if (dn.lastIndexOf('.') == -1)
    return false;
  var ch = dn.charAt(0);
  if (ch == '.' || ch == '-')
    return false;
  ch = dn.charAt(dn.length-1);
  if (ch == '.' || ch == '-')
    return false;
  return true;
}
function hostValid(e,str){
    if(e.value)
        document.getElementById(str).src = 'pics/check.png';
    else
        document.getElementById(str).src = 'pics/x.png';
}
