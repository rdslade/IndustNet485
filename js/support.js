function loadData()
{
  var getList = [];
  var i;

  setPostStatus("Loading form ...");

  for (i = 0; i < fldVarPair.length; i++)
    getList.push(fldVarPair[i][1]);

  HTTP.post("cgi-bin/get_cfg", getList.join(','), procDataReply);
}

function procDataReply(replyText)
{
  var f = document.form1;
  var vlist = replyText.split(",");

  for (var i = 0; i < vlist.length; i++)
  {
    var vpair = vlist[i].split("=");
    var fld = mapVarToFld(vpair[0]);

    if (fld)
      setFormField(fld, vpair[1]);
    else
      alert("Field undefined for " + vpair[0]);
  }

  hidePostStatus( );
}

function mapFldToVar(fname)
{
  for (var i = 0; i < fldVarPair.length; i++)
    if (fldVarPair[i][0] == fname)
      return fldVarPair[i][1];
  alert("No match for field " + fname);
  return null;
}

function mapVarToFld(vname)
{
  for (var i = 0; i < fldVarPair.length; i++)
    if (fldVarPair[i][1] == vname)
      return fldVarPair[i][0];
  alert("No match for parameter " + vname);
  return null;
}

function clickRadioButton(formObj, groupName, buttonName)
{
  for (var i = 0; i < formObj.length; i++)
  {
    var el = formObj.elements[i];

    if ((el.type == "radio") && (el.name == groupName) && (el.value == buttonName))
    {
      el.click();
      return true;
    }
  }
  return false;
}

// Return the name of the selected radio button
function valueRadioButton(formObj, groupName)
{
  for (var i = 0; i < formObj.length; i++)
  {
    var el = formObj.elements[i];

    if ((el.type == "radio") && (el.name == groupName) && (el.checked == true))
    {
      return el.value;
    }
  }
}

function selectSet(sel, val)
{
  var setCt = 0;

  for (var i = 0; i < sel.length; i++)
  {
    var opt = sel.options[i];

    if (opt.selected)
    {
      if (opt.value != val)
        opt.selected = false;
    }
    else
    {
      if (opt.value == val)
      {
        opt.selected = true;
        setCt++;
      }
    }
  }
}

function selectGet(sel)
{
  for (var i = 0; i < sel.length; i++)
  {
    var opt = sel.options[i];

    if (opt.selected)
      return opt.value;
  }

  return null;
}

function procPostReply(respText)
{
  if (setPostStatus(respText))
    window.setTimeout(hidePostStatus, 4000);
  else
    alert("Not Connected");
}

function setParagraphText(pname, ptext)
{
  var el = document.getElementById(pname);
  if (!el) return false;

  for (var rn = el.firstChild; rn != null; rn = rn.firstChild)
  {
    if (rn.nodeType == 3)
    {
      rn.data = ptext;
      return el;
    }
  }
  return null;
}

function setPostStatus(ptext)
{
  var el = setParagraphText("post_status", ptext);
  if (!el)
    return false;
  el.style.visibility = "visible";
  return true;
}

function hidePostStatus()
{
  var el = document.getElementById("post_status");

  if (el)
    el.style.visibility = "hidden";
}

function trim(s)
{
  return s.replace(/^\s+|\s+$/, '');
}

function trimFld(fld)
{
  var s = fld.value;
  fld.value = s.replace(/^\s+|\s+$/, '');
}

function encodeSetPair(fnam, val)
{
  var vnam = mapFldToVar(fnam);

  if (vnam)
    return vnam + "=" + encodeURIComponent(val).replace(/%20/g, "+");
  else
    return null;
}

function appendSetPair(setList, fnam, fval)
{
  var setPair = encodeSetPair(fnam, fval);

  if (setPair)
  {
    if (setList.length)
      setList += "&";
    setList += setPair;
  }

  return setList;
}

function decodeStr(s)
{
  return decodeURIComponent(s.replace(/\+/g, " "))
}

function validateNonblank(fld)
{
  fld.value = trim(fld.value);
  if (fld.value.length == 0)
  {
    fld.style.backgroundColor = 'Yellow';
    alert("Field may not be left empty");
    fld.focus();
    return false;
  }

  fld.style.background = 'White';
  return true;
}

function validateNumRange(fld, min, max)
{
  fld.value = trim(fld.value);
  if ((fld.value.length == 0) || isNaN(fld.value))
    fld.style.color = 'red'
  else if (fld.value < min)
    fld.style.color = 'red'
  else if (fld.value > max)
    fld.style.color = 'black'
  return true;
}
function validatePrefix(fld)
{
  return validateNumRange(fld, 1, 30);
}

function validatePort(fld)
{
  return validateNumRange(fld, 0, 65535);
}

function validatePct(fld)
{
  return validateNumRange(fld, 0, 100);
}

function validateBufSize(fld)
{
  return validateNumRange(fld, 2048, 8192);
}

function validateBufTime(fld)
{
  return validateNumRange(fld, 0, 10000);
}

function validateNetTimeout(fld)
{
  return validateNumRange(fld, 0, 60000);
}
function changeTitle(tit){
    window.document.title = tit;
}
function select(v){
    parent.document.getElementById("op"+localStorage.sel).className = "optno";
    parent.document.getElementById("op"+v).className = "optsel";
    localStorage.sel = v;
}
function decorate(e,num){
    if(e.className == "optsel"){
        e.style.textDecoration="none";
        e.style.textShadow = "none";
        return;
    }
    else if(num==1){
        e.style.textShadow = "0px 0px 12px rgba(0,152,153,1)";
    }
    else if(num==2){
        e.style.textDecoration="none";
        e.style.textShadow = "none";
    }
}

function load(e,v){
    firstTime = false;
    if(v<6){
        select(v);
        decorate(e,0);
    }
    var child = parent.document.getElementById("child_p");
    switch(v){
        case(0): 
            child.src = "welcome.html";
            child.scrolling = "yes";
            break;
        case(1):
            child.src = "cfg_device.html";
            break;
        case(2):
            child.src = "cfg_net.html";
            break;
        case(3):
            child.src = "cfg_port0.html";
            break;
        case(4):
            child.src = "upload_bin.html";
            break;
        case(5):
            child.src = "mapping-test.html";
            break;
        case(6):
            child.src = "mappings-static.html";
            break;
    }
}
function firstLoad(){
    localStorage.sel = 0;
}