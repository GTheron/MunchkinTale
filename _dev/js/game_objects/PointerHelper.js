define(['DREAM_ENGINE'],
    function(DE){
        function PointerHelper(params){
            var _self = this;

            DE.GameObject.call( this, {
                "x": params.x, "y": params.y, "zindex": params.zindex, "tag": params.tag
            } );

            if ( params.spriteName )
                this.addRenderer( new DE.SpriteRenderer( { spriteName: params.spriteName } ) );

            params.scene.add(_self);
            setTimeout(function(){
                _self.fadeOut(1000);
                setTimeout(function(){
                    params.scene.remove(_self);
                }, 1000);
            }, 300);
        };

        PointerHelper.prototype = new DE.GameObject();
        PointerHelper.prototype.constructor = PointerHelper;
        PointerHelper.prototype.supr = DE.GameObject.prototype;

        return PointerHelper;
    });