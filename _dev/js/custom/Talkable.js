define(['DREAM_ENGINE'],
function(DE){
    function Talkable(params)
    {
        DE.GameObject.call( this, {
            "x": params.x, "y": params.y, "zindex": params.zindex, "tag": params.tag
            ,"collider": new DE.FixedBoxCollider( params.width, params.height )
        } );

        if ( params.spriteName )
            this.addRenderer( new DE.SpriteRenderer( { spriteName: params.spriteName, scale: params.scale, offsetY: params.offsetY } ) );
        else{
            console.log(params.width+ " " + params.height);
            this.addRenderer( new DE.BoxRenderer( { fillColor: "#fff", alpha: 0.4 }, params.width, params.height ) );
        }
    }

    Talkable.prototype = new DE.GameObject();
    Talkable.prototype.constructor = Talkable;
    Talkable.prototype.supr = DE.GameObject.prototype;

    return Talkable;
});