define( [ 'DE.CONFIG' ],
    function( CONFIG )
    {
        var datas = {
            // texts folder name
            folderName: "text"

            // usage name, real name (can contain subpath), extension, parameters
            , textsList: [
                [ "test", "test_1", "txt", { "load": true } ]
            ]
        };
        CONFIG.debug.log( "texts loaded", 3 );
        return datas;
    } );