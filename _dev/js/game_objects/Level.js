define(['DREAM_ENGINE'],
function(){

    var Level = function(params){
        var filePath = params.filePath;
        var scene = params.scene;
    };

    Level.prototype =
    {
        render: function(scene)
        {

        },

        _loadXml: function(filePath){
            var xmlhttp = null;
            if (window.XMLHttpRequest)
            {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }
            else
            {// code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.open("GET", filePath, false);
            xmlhttp.send();
            var xmlDoc = xmlhttp.responseXML;

            //TODO add level loading from xml file
        }
    };

    Level.prototype.constructor = Level;

    return Level;

});