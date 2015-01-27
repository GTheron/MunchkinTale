define(['DREAM_ENGINE', 'EnvironmentSlice'],
    function(DE, EnvironmentSlice)
    {
        function EnvironmentLayer(params)
        {
            var _self = this;
            _self.slices = [];

            for(var i=params.startingPosition;i<params.levelWidth;i=i+params.width)
            {
                _self.slices.push(new EnvironmentSlice({

                }));
            }

        }



        EnvironmentLayer.prototype = {};
        EnvironmentLayer.prototype.constructor = EnvironmentLayer;

        return EnvironmentLayer;
    });