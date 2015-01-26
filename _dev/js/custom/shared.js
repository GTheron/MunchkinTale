define( [],
    function()
    {
        var shared = {
            levels: {
                "test": {
                    components: [
                        {"x":0,"y":0,"z":0,"name":"foreground","zindex":0,"rotation":0}/*,
                        {"x":612,"y":512,"z":0,"name":"background","zindex":0,"rotation":0}*/
                    ]
                }
            }

            , components: {
                "foreground":{
                    "name":"foreground","tag":"block","sprite":"platform","isTile":1
                    ,"sx":0,"sy":0,"tw":512,"th":512,"w":512,"h":512
                    ,"collider":{"type":"box","w":512,"h":512,"r":50,"l":0,"t":0},"zindex":0
                }
                , "background":{
                    "name":"background","tag":"block","sprite":"platform","isTile":1
                    ,"sx":0,"sy":0,"tw":512,"th":512,"w":512,"h":512
                    ,"collider":{"type":"box","w":128,"h":512,"r":50,"l":0,"t":0},"zindex":0
                }
            }
        };

        return shared;
    } );