define(['DREAM_ENGINE', 'data', 'WindowButton'],
    function(DE, data, WindowButton){

        function TextWindow(params)
        {
            DE.GameObject.call( this, {
                "x": params.x, "y": params.y, z: params.z, "zindex": params.zindex, "tag": params.tag
            } );

            var _self = this;
            this.text = "";
            this.options = [];
            this.nodePlayer = params.nodePlayer;

            this.addRenderer(new DE.SpriteRenderer({
                spriteName: data.dialog.background.spriteName, scale: params.scale
            }));
            this.addRenderer(new DE.TextRenderer({
                "fontSize": "22",
                "textAlign": "left", "font": "Gothic",
                "paddingX": 190, "offsetY": -75
            }, 800, 50, params.text));

            var closeButton = new WindowButton({
                x: params.x - 120, y: params.y, z: params.z, "zindex": params.zindex+1, tag: params.tag,
                fontSize: "22",
                "textAlign": "right", font: "Gothic",
                "offsetY": -100,
                coord1: 800, coord2: 50, text: "X"
            });
            params.scene.add(closeButton);
            closeButton.onMouseClick = function(m, propagation)
            {
                console.log('closeButton: ', m);
                m.stopPropagation = true; // prevent the camera.onLastMouseClick and all onLastGlobalMouseClick for those who listen Global
                return true;
            };

            var offsetY = 0;
            for(var i=0;i<params.buttons.length;i++)
            {
                console.log(params.buttons[i]);
                var button = new WindowButton({
                    x: params.x, y: params.y, z: params.z, "zindex": params.zindex+1, tag: params.tag,
                    fontSize: "14",
                    "textAlign": "left", font: "Gothic",
                    "paddingX": 160, "offsetY": offsetY,
                    coord1: 800, coord2: 50, text: params.buttons[i].s, no: params.buttons[i].no
                });
                /*var buttonRenderer = new DE.TextRenderer({
                    "fontSize": "14",
                    "textAlign": "left", font: "Gothic",
                    "paddingX": 160, "offsetY": offsetY
                }, 800, 50, params.buttons[i].s);
                */

                //this.addRenderer(button);
                params.scene.add(button);

                button.onMouseClick = function(m){
                    console.log("mouseClick on : "+m);
                    //_self.nodePlayer.e_interface_choix_pn(m.text)
                };
                params.scene.hasDialogButton = true;
                offsetY += 22;
            }
        }

        TextWindow.prototype = new DE.GameObject();
        TextWindow.prototype.constructor = TextWindow;
        TextWindow.prototype.supr = DE.GameObject.prototype;

        return TextWindow;
    });