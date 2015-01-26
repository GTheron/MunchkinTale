define(['DREAM_ENGINE'],
function(DE){

    function WindowButton(params){

        DE.GameObject.call( this, {
            "x": params.x, "y": params.y, z: params.z, "zindex": params.zindex, "tag": params.tag
        } );
        this.no = params.no;

        this.addRenderer(new DE.TextRenderer({
            "fontSize": params.fontSize,
            "textAlign": params.textAlign, "font": params.font,
            "paddingX": params.paddingX, "offsetY": params.offsetY
        }, params.coord1, params.coord2, params.text));
    }

    WindowButton.prototype = new DE.GameObject();
    WindowButton.prototype.constructor = WindowButton;
    WindowButton.prototype.supr = DE.GameObject.prototype;

    return WindowButton;

});