define(['DREAM_ENGINE', 'data'],
    function(DE, data)
    {
        function Player(params)
        {
            DE.GameObject.call( this, {
                "x": params.x, "y": params.y, "zindex": params.zindex, "tag": params.tag
                ,"collider": new DE.FixedBoxCollider( params.width, params.height )
            } );

            if ( params.spriteNames )
                for(var i= 0;i<params.spriteNames.length;i++)
                {
                    var renderer = new DE.SpriteRenderer( {
                        spriteName: params.spriteNames[i].name,
                        scale: params.scale, offsetY: -138
                    });
                    renderer.tag = params.spriteNames[i].tag;
                    this.addRenderer( renderer );
                }
            else{
                console.log(params.width+ " " + params.height);
                this.addRenderer( new DE.BoxRenderer( { fillColor: "rgb(180,180,180)", alpha: 0.4 }, params.width, params.height ) );
            }

            this.aimedX = null;
            this.direction = 'Right';

            this.checkInputs = function () {
                if (DE.Inputs.key("fire"))
                    this.action();
                /*if (DE.Inputs.key("up")){
                 if(this.position.y >= 400) this.translateY(-this.speed);
                 }
                 if (DE.Inputs.key("down"))
                 if(this.position.y <= 600) this.translateY(this.speed);
                 */
                if (DE.Inputs.key("left"))
                {
                    if(this.position.x > (params.xBound - params.moveSpeed)) this.translateX(-params.moveSpeed);
                }
                if (DE.Inputs.key("right"))
                {
                    this.translateX(params.moveSpeed);
                }
                if(DE.Inputs.key('click')) console.log('wut');

                //player.lookAt( pointer.position );
            };

            this.action = function()
            {
                return '';
            };

            this.selectRenderer = function(tag)
            {
                for(var i=0;i<this.renderers.length;i++)
                {
                    if(this.renderers[i].tag === tag) this.renderers[i].alpha = 1;
                    else this.renderers[i].alpha = 0;
                }
            };

            //this.addAutomatism("checkInputs", "checkInputs");
        }

        Player.prototype = new DE.GameObject();
        Player.prototype.constructor = Player;
        Player.prototype.supr = DE.GameObject.prototype;

        return Player;
    });