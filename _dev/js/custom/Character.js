define(['data', 'DREAM_ENGINE'],
function(data, DE)
{
    function Character(x, y, tag, colliderW, colliderH, sprite)
    {
        DE.GameObject.call( this, {
            "x": x, "y": y, "zindex": 11, "tag": tag
            ,"collider": new DE.FixedBoxCollider( colliderW, colliderH )
        } );

        if ( sprite )
            this.addRenderer( new DE.SpriteRenderer( { spriteName: sprite } ) );
        else
            this.addRenderer( new DE.BoxRenderer( { fillColor: "rgb(180,180,180)", alpha: 0.4 }, colliderW - 2, colliderH - 2 ) );


        this.moveSpeed     = data.character.moveSpeed;
        this.axes          = { x: 0, y: 0 };

        //sprite direction
        this.dir           = 1;

        var _self = this;
        this.logic = function()
        {
            this.move();
            this.makeCollision();
        };

        this.move = function()
        {
            var axeH = this.axes.x;

            if ( axeH < 0 )
                this.dir = -1;
            else if ( axeH > 0 )
                this.dir = 1;

            var x = this.moveSpeed / 0;

            var pos = this.getPos();
            this.previousPosition = { x: pos.x, y: pos.y };
            this.translate( { x: x >> 0, y: y >> 0 } );
            this.previousMove = { x: this.position.x - this.previousPosition.x, y: this.position.y - this.previousPosition.y  };

        };

        this.makeCollision = function()
        {
            var obj = this.scene.collideObjects;
            var colpos = this.collider.getRealPosition();
            var T = colpos.y
                , L = colpos.x
                , R = colpos.x + this.collider.width
                , B = colpos.y + this.collider.height
                , PT = colpos.y - this.previousMove.y
                , PL = colpos.x - this.previousMove.x
                , PR = colpos.x - this.previousMove.x + this.collider.width
                , PB = colpos.y - this.previousMove.y + this.collider.height;
            var collide = { l: 0, r: 0, t: 0, b: 0 };
            var vectorOut = { x: 0, y: 0 };
            var changedPos = { x: 0, y: 0 };
            var cols = [], colx, coly; // all block with collision
            for ( var i = 0, col, o, ocolpos; i < obj.length; ++i, col = false )
            {
                colx = false;
                coly = false;

                o = obj[ i ];
                if ( o.enable && DE.CollisionSystem.fixedBoxCollision( this.collider, o.collider ) )
                {
                    ocolpos = o.collider.getRealPosition();
                    var OT = ocolpos.y
                        , OL = ocolpos.x
                        , OR = ocolpos.x + o.collider.width
                        , OB = ocolpos.y + o.collider.height;

                    // actual difference between colliders
                    var l = OL - R // left side
                        , r = L - OR // right side of the collided object etc..
                        , t = OT - B
                        , b = T - OB;

                    // same as before but with previous pos
                    var pl = OL - PR
                        , pr = PL - OR
                        , pt = OT - PB
                        , pb = PT - OB;

                    // is coming from diagonal
                    if ( this.previousMove.x != 0 && this.previousMove.y != 0 )
                    {
                        if ( ( ( pl >= 0 && l < 0 ) || ( pl > 0 && l <= 0 ) ) && this.previousMove.x > 0 )
                        {
                            vectorOut.x = OL - ( this.collider.width * 0.5 + 1 ) >> 0;
                            colx = true;
                        }
                        else if ( ( ( pr >= 0 && r < 0 ) || ( pr > 0 && r <= 0 ) ) && this.previousMove.x < 0 )
                        {
                            vectorOut.x = OR + this.collider.width * 0.5 + 1 >> 0;
                            colx = true;
                        }
                        else if ( ( ( pt >= 0 && t < 0 ) || ( pt > 0 && t <= 0 ) ) && this.previousMove.y > 0 )
                        {
                            vectorOut.y = OT - ( this.collider.height * 0.5 + 1 ) >> 0;
                            coly = true;
                        }
                        else if ( pb >= 0 && b < 0 && this.previousMove.y < 0 )
                        {
                            vectorOut.y = OB + this.collider.height * 0.5 + 1 >> 0;
                            coly = true;
                        }
                    }
                    else if ( this.previousMove.x != 0 )
                    {
                        // coming from left side - will stuck on left side
                        if ( this.previousMove.x > 0 )
                            vectorOut.x = OL - ( this.collider.width * 0.5 + 1 ) >> 0;
                        // same for right
                        else if ( this.previousMove.x < 0 )
                            vectorOut.x = OR + this.collider.width * 0.5 + 1 >> 0;
                        colx = true
                    }
                    else if ( this.previousMove.y != 0 )
                    {
                        // coming from left side - will stuck on left side
                        if ( this.previousMove.y > 0 )
                            vectorOut.y = OT - ( this.collider.height * 0.5 + 1 ) >> 0;
                        // same for right
                        else if ( this.previousMove.y < 0 )
                            vectorOut.y = OB + this.collider.height * 0.5 + 1 >> 0;
                        coly = true;
                    }

                    this.position.x = vectorOut.x || this.position.x;
                    this.position.y = vectorOut.y || this.position.y;

                    // check if we restore the previous pos, does it still collide with previous tested objects ?
                    if ( this.previousMove.x > 0 && this.previousMove.y != 0 && cols.length )
                    {
                        var savedX = this.position.x;
                        this.position.x = this.previousPosition.x + this.previousMove.x;
                        var preventRestore = false;
                        for ( var po = 0; po < cols.length; ++po )
                        {
                            if ( DE.CollisionSystem.fixedBoxCollision( this.collider, cols[ po ].collider ) )
                                preventRestore = true;
                            else
                                cols.splice( po, 1 );
                        }
                        if ( preventRestore )
                            this.position.x = savedX;
                    }
                    changedPos.x = vectorOut.x != 0 ? vectorOut.x - this.position.x : changedPos.x;
                    changedPos.y = vectorOut.y != 0 ? vectorOut.y - this.position.y : changedPos.y;

                    cols.push( o );
                }
            }
            for ( var po = 0; po < cols.length; ++po )
            {
                this.trigger( "collision-enter", cols[ po ] );
                cols[ po ].trigger( "collision-enter", this );
            }

            if ( vectorOut.y != 0 && this.previousMove.y > 0 )
            {
                if ( !this.onFloor )
                    this.trigger( "on-floor" );
                this.onFloor = true;
                this.currentBlock = cols[ 0 ];
            }

            if ( !this.onFloor )
            {
                if ( this.currentBlock )
                {
                    this.currentBlock.trigger( "collision-leave", this );
                    this.trigger( "collision-leave", this.currentBlock );
                }
                this.currentBlock = null;
            }
        };

        this.bindControls = function()
        {
            //On Horizontal Axe move, updates the axes
            DE.Inputs.on( "axeMoved", "haxe", function(val){ _self.updateAxes( val, undefined ); } );
            //On Vertical Axe move, updates the axes
            DE.Inputs.on( "axeMoved", "vaxe", function(val){ _self.updateAxes( undefined, val ); } );
            //On Horizontal Axe stop, updates the axes
            DE.Inputs.on( "axeStop", "haxe", function(){ _self.updateAxes( 0, undefined ); } );
            //On Vertical Axe stop, updates the axes
            DE.Inputs.on( "axeStop", "vaxe", function(){ _self.updateAxes( undefined, 0 ); } );

            //On left key lift, unless right is pressed, update Axes
            DE.Inputs.on( "keyUp", "left", function(){
                if ( DE.Inputs.key( 'right' ) )
                    return;
                _self.updateAxes( 0, undefined );
            } );
            //On right key lift, unless left is pressed, update Axes
            DE.Inputs.on( "keyUp", "right", function(){
                if ( DE.Inputs.key( 'left' ) )
                    return;
                _self.updateAxes( 0, undefined );
            } );
            DE.Inputs.on( "keyDown", "left", function(){ _self.updateAxes( -1, undefined ); } );
            DE.Inputs.on( "keyDown", "right", function(){ _self.updateAxes( 1, undefined ); } );
            DE.Inputs.on( "keyDown", "up", function(){ _self.updateAxes( undefined, -1 ); } );
            DE.Inputs.on( "keyDown", "down", function(){ _self.updateAxes( undefined, 1 ); } );
            DE.Inputs.on( "keyUp", "up", function(){ _self.updateAxes( undefined, 0 ); } );
            DE.Inputs.on( "keyUp", "down", function(){ _self.updateAxes( undefined, 0 ); } );

            return this;
        };

        this.addAutomatism( "logic", "logic" );
        return this;
    }

    Character.prototype = new DE.GameObject();
    Character.prototype.constructor = Character;
    Character.prototype.supr = DE.GameObject.prototype;

    // bind this method on controls or AI to make your character move
    Character.prototype.updateAxes = function( x, y )
    {
        this.axes = {
            'x': x !== undefined ? x : this.axes.x
            ,'y': y !== undefined ? y : this.axes.y
        };
    };

    return Character;
});