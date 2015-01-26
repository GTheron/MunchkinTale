define(['DREAM_ENGINE', 'EnvironmentSlice'],
    function(DE, EnvironmentSlice){
        function Biome(params)
        {
            this.slices = [];

            //var count = params.start;
            console.log('gonna slice up '+params.count);
            for(var i=0;i<params.count;i++)
            {
                var slice = new EnvironmentSlice({
                    x: params.startPos + params.width*i, y: params.height, z: params.z, zindex: params.zindex,
                    spriteName: params.spriteName, scale: params.scale
                });

                this.slices.push(slice);
            }
        }

        Biome.prototype = new DE.GameObject();
        Biome.prototype.constructor = Biome;
        Biome.prototype.supr = DE.GameObject.prototype;

        return Biome;
    });