<!--
var  cfgRec;

if (! cfgRec)
{
  cfgRec = {};

  cfgRec.ipmode = {value: "", changed: false};
  cfgRec.ipaddr = {value: "", changed: false};
  cfgRec.ipaddr = {value: "", changed: false};
  cfgRec.ipmask = {value: "", changed: false};
  cfgRec.gwaddr = {value: "", changed: false};
}

function initConfigForm()
{
  // ToDo
}

function postConfigForm()
{
  var  chgString = "";

  var xx = document.frames.databox.cfg_net;

  alert(xx);

  if (cfgRec.ipmode.changed)
    chgString += "ipmode: " + cfgRec.ipmode.value + "\n";

  if (cfgRec.ipaddr.changed)
    chgString += "ipaddr: " + cfgRec.ipaddr.value + "\n";

  if (cfgRec.ipmask.changed)
    chgString += "ipmask: " + cfgRec.ipmask.value + "\n";

  if (cfgRec.gwaddr.changed)
    chgString += "gwaddr: " + cfgRec.gwaddr.value + "\n";

  if (chgString == "")
    alert("no changes");
  else
    alert(chgString);

  // ToDo
}

// End of script
-->

