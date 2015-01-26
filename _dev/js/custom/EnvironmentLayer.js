define(['DREAM_ENGINE'],
function(DE){

    function EnvironmentLayer(params)
    {
        var slices = [];

        var count = 0;
        for(var i=0;i<params.limit;i=i+params.unit)
        {
            count++;
            var spriteName = 'platform';
            if( count <= levelSlices) spriteName = 'lvl_'+count;

            var bgSlice = new EnvironmentSlice({
                x: i + bgWidth/2, y: bgHeight/2, zindex: 1,
                spriteName: spriteName, scale: bgScale
            });

            Game.background.push(bgSlice);
        }
    }

});