define(['DREAM_ENGINE', 'EnvironmentLayer'],
function(DE, EnvironmentLayer){

    var Level = function(params){
        this.components = [];
        this.scene = null;
    };

    Level.prototype =
    {
        render: function(scene, filePath)
        {
            var _self = this;
            this.scene = scene;
            this._loadLevel(filePath);
            /*$.when(this._loadXml(filePath)).done(
                function()
                {
                    console.log(_self.components);
                    for(var i=0;i<_self.components.length;i++)
                    {
                        scene.add(_self.components[i]);
                    }
                }
            );*/
        },

        _loadLevel: function(filePath){
            var _self = this;
            $.ajax({
                url: filePath,
                success: function(xhr){
                    console.log(JSON.parse(xhr));
                    var level = JSON.parse(xhr);
                    for(var i=0;i<level.components.length;i++)
                    {
                        var comp = level.components;
                        comp.levelWidth = level.width;
                        comp.levelHeight = level.height;
                        _self._loadComponent(comp);
                    }
                }
            });
        },

        _loadComponent: function(component)
        {
            var comp = {};
            if(component.type == 'sky')
            {
                comp = new EnvironmentLayer(component);
            }

            this.scene.add(comp);
        }
    };

    Level.prototype.constructor = Level;

    return Level;

});