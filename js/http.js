var HTTP = {};

HTTP._reqAllocMethod = null;

HTTP._reqAllocMethodList = [
  function() { return new XMLHttpRequest(); },
  function() { return new ActiveXObject("Msxml2.XMLHTTP"); },
  function() { return new ActiveXObject("Microsoft.XMLHTTP"); }
];

HTTP.newRequest = function() {
    if (HTTP._reqAllocMethod != null) return HTTP._reqAllocMethod();

    for (var i = 0; i < HTTP._reqAllocMethodList.length; i++){
        try{
            var reqAllocMethod = HTTP._reqAllocMethodList[i];
            var reqObj = reqAllocMethod();

            if (reqObj != null){
            HTTP._reqAllocMethod = reqAllocMethod;
            return reqObj;
            }
        }
        catch(e){
        continue;
        }
    }

    HTTP._reqAllocMethod = function() {
        throw new Error("XMLHttpRequest is not supported");
        return null;
    };

    HTTP._reqAllocMethod();
};

HTTP.post = function(url, vlist, callback) {
    var req = HTTP.newRequest();

    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                callback(req.responseText);
            }
            else {
                callback(null);
            }
        }
    };

    try {
        req.open("POST", url);
        req.send(vlist);
    }
    catch(e) {
        alert(e);
    }
};

