define(['DREAM_ENGINE'],
function(DE)
{
    function EnvironmentSlice(params)
    {
        var _self = this;

        DE.GameObject.call( this, {
            "x": params.x, "y": params.y, z: params.z, "zindex": params.zindex, "tag": params.tag
        } );

        if ( params.spriteName )
            this.addRenderer( new DE.SpriteRenderer( { spriteName: params.spriteName, scale: params.scale } ) );
        else
            this.addRenderer( new DE.BoxRenderer( { "fillColor": params.fillColor }, params.width, params.height ));

    }



    EnvironmentSlice.prototype = new DE.GameObject();
    EnvironmentSlice.prototype.constructor = EnvironmentSlice;
    EnvironmentSlice.prototype.supr = DE.GameObject.prototype;

    return EnvironmentSlice;
});