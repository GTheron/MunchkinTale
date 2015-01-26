/**
 * Author
 @Inateno / http://inateno.com / http://dreamirl.com

 * ContributorsList
 @Inateno

 ***
 Sample empty to make Games

 **/
define(['DREAM_ENGINE', 'jquery', 'data', 'Player', 'Talkable', 'PointerHelper', 'EnvironmentSlice', 'XTextualNodePlayer', 'Popups', 'Button', 'Biome'],
    function (DE, $, data, Player, Talkable, PointerHelper, EnvironmentSlice, XTextualNodePlayer, Popups, Button, Biome) {
        var Game = {};

        var levelSlices = 26;

        Game.render = null;
        Game.scene = null;
        var screenW = 1280, screenH = 720;
        var levelW = 512*levelSlices, levelH = 720;
        var bgBW = 1024, bgBH = 1024, bgScale = 0.5, bgZ =  10;
        var hasTextOpen = false;
        var dialog = {
            nextText: "",
            buttons: [],
            waitings: [],
            hasWaiting: function(waiting){
                var hasWaiting = false;
                for(var i=0;i<this.waitings.length;i++)
                {
                    var currentWaiting = this.waitings[i].replace(' ', '');
                    waiting = waiting.replace(' ', '');
                    if(currentWaiting.indexOf(waiting) != -1) hasWaiting = true;
                }
                return hasWaiting;
            }
        };
        var nodePlayer = {};
        var dialogWindow = null;
        var i = 0;
        var currentPopup = null;

        // init
        Game.init = function () {
            console.log("init Engine");
            DE.CONFIG.DEBUG = 0; // debug on
            DE.CONFIG.DEBUG_LEVEL = 0; // show collider

            // create render
            Game.render = new DE.Render("render", {width: screenW, height: screenH, fullScreen: "ratioStretch"});
            Game.render.init();

            // launch the engine
            DE.start();
        };

        // start
        Game.start = function () {
            var _self = this;
            Game.camera = new DE.Camera(screenW, screenH, 0, 0,
                {
                    'name': 'Main camera',
                    'backgroundColor': "#bbb",
                    'minX': 0,
                    'maxX': levelW
                }
            );

            Game.camera.gui = new DE.Gui();
            Game.camera.scene = new DE.Scene();
            Game.render.add(Game.camera);

            Game.scene = Game.camera.scene;
            Game.scene.hasDialogButton = false;

            //DE.AudioManager.music.stopAllAndPlay( "music1" );

            Game.titleScreen = new DE.GameObject({
                x:screenW/2,y:screenH/2, zindex: 1000,
                renderer: new DE.SpriteRenderer({spriteName: "titleScreen"})
            });

            /***** Environments *****/

            var skies2 = [];

            var sky2StartPos = -200;
            var sky2Height = bgBH*bgScale/6;
            var sky2Width = bgBW;
            for(i=0;i<26;i++)
            {
                skies2.push(new Biome({
                    width: sky2Width,
                    height: sky2Height,
                    levelWidth: levelW,
                    spriteName: 'skies2',
                    z: 10, count: 1, startPos: sky2StartPos,
                    zindex: 1, scale: 1
                }));
                sky2StartPos += sky2Width;
            }


            var skies1 = [];

            var sky1StartPos = -200;
            var sky1Height = bgBH*bgScale/5;
            var sky1Width = bgBW;
            for(i=0;i<26;i++)
            {
                skies1.push(new Biome({
                    width: sky1Width,
                    height: sky1Height,
                    levelWidth: levelW,
                    spriteName: 'skies1',
                    z: 7, count: 1, startPos: sky1StartPos,
                    zindex: 1, scale: 1
                }));
                sky1StartPos += sky1Width;
            }

            var biomes = [];

            //var startPos = -(bgBW*bgScale/2);
            var startPos = 0;
            var biomeHeight = bgBH*bgScale/4;
            var biomeWidth = bgBW;
            var biomeZindex = 2;
            var biomeZoom = 4;
            biomes.push(new Biome({
                width: biomeWidth,
                height: biomeHeight,
                levelWidth: levelW,
                spriteName: 'biome1',
                z: biomeZoom, count: 1, startPos: startPos,
                zindex: biomeZindex, scale: 1
            }));

            startPos += biomeWidth;
            biomes.push(new Biome({
                width: biomeWidth,
                height: biomeHeight,
                levelWidth: levelW,
                spriteName: 'biome2',
                z: biomeZoom, count: 1, startPos: startPos,
                zindex: biomeZindex, scale: 1
            }));

            startPos += biomeWidth;
            biomes.push(new Biome({
                width: biomeWidth,
                height: biomeHeight,
                levelWidth: levelW,
                spriteName: 'biome3',
                z: biomeZoom, count: 1, startPos: startPos,
                zindex: biomeZindex, scale: 1
            }));

            startPos += biomeWidth;
            biomes.push(new Biome({
                width: biomeWidth,
                height: biomeHeight,
                levelWidth: levelW,
                spriteName: 'biome4',
                z: biomeZoom, count: 1, startPos: startPos,
                zindex: biomeZindex, scale: 1
            }));

            startPos += biomeWidth;
            biomes.push(new Biome({
                width: biomeWidth,
                height: biomeHeight,
                levelWidth: levelW,
                spriteName: 'biome5',
                z: biomeZoom, count: 4, startPos: startPos,
                zindex: biomeZindex, scale: 1
            }));

            startPos += biomeWidth*4;
            biomes.push(new Biome({
                width: biomeWidth,
                height: biomeHeight,
                levelWidth: levelW,
                spriteName: 'biome6',
                z: biomeZoom, count: 3, startPos: startPos,
                zindex: biomeZindex, scale: 1
            }));

            startPos += biomeWidth*3;
            biomes.push(new Biome({
                width: biomeWidth,
                height: biomeHeight,
                levelWidth: levelW,
                spriteName: 'biome7',
                z: biomeZoom, count: 2, startPos: startPos,
                zindex: biomeZindex, scale: 1
            }));

            startPos += biomeWidth*2;
            biomes.push(new Biome({
                width: biomeWidth,
                height: biomeHeight,
                levelWidth: levelW,
                spriteName: 'biome8',
                z: biomeZoom, count: 3, startPos: startPos,
                zindex: biomeZindex, scale: 1
            }));

            /*for(var i=-(para1Width/2);i<levelW + para1Width;i=i+para1Width)
            {
                var para1Slice = new EnvironmentSlice({
                    x: i + para1Width/2, y: para1Height/2, z: 4, zindex: 1,
                    spriteName: 'para1', scale: bgScale
                });

                Game.para1.push(para1Slice);
            }*/

            Game.background = [];

            //var bgSpriteWidth = 1024;
            var bgHeight = bgBH*bgScale;
            var bgWidth = bgBW*bgScale;
            var count = 0;
            for(i=0;i<levelW;i=i+bgWidth)
            {
                count++;
                var spriteName = 'platform';
                if( count <= levelSlices) spriteName = 'lvl_'+count;

                var bgSlice = new EnvironmentSlice({
                    x: i + bgWidth/2, y: bgHeight/2, z: 0, zindex: 15,
                    spriteName: spriteName, scale: bgScale
                });

                Game.background.push(bgSlice);
            }

            Game.ground = [];

            var groundHeight = levelH - bgHeight;
            var groundWidth = bgWidth; //TODO : fixer la largeur du chemin

            for(i=0;i<levelW;i=i+groundWidth)
            {
                var groundSlice = new EnvironmentSlice({
                    x: i, y: bgHeight + groundHeight/2, zindex: 11,
                    fillColor: '#611', width: groundWidth, height: groundHeight
                });

                /*var groundSlice = new DE.GameObject({
                    x: i, y: bgHeight + groundHeight/2, zindex: 2,
                    renderer: new DE.BoxRenderer( { "fillColor": "#611" }, groundWidth, groundHeight  )
                });*/

                Game.ground.push(groundSlice);
            }

            Game.foreground = [];

            var fgSpriteWidth = 512;
            for(i=0;i<levelW;i=i+fgSpriteWidth)
            {
                var fgSlice = new EnvironmentSlice({
                    x: i, y: screenH + 150, zindex: 99,
                    spriteName: 'platform', scale: 1
                });

                /*var fgSlice = new DE.GameObject({
                    x: i, y: screenH + 150, zindex: 99,
                    renderer: new DE.SpriteRenderer( { 'spriteName': 'platform', scale: 1, offsetY: 0 } )
                });*/
                Game.foreground.push(fgSlice);
            }

            /***** Player *****/

            var player = new Player({
                x: 400,
                y: 470,
                zindex: 11,
                tag: "player",
                width: 50,
                height: 50,
                moveSpeed: 6,
                xBound: 100,
                spriteNames: [
                    { name: 'heroIdleLeft', tag: 'idleLeft' },
                    { name: 'heroIdleRight', tag: 'idleRight' },
                    { name: 'heroWalkRight', tag: 'walkRight' },
                    { name: 'heroWalkLeft', tag: 'walkLeft' },
                    { name: 'heroAttack', tag: 'attack' }
                ],
                scale: 0.5
            });
            player.selectRenderer('idleRight');
            Game.player = player;

            Game.camera.focus( player, { lock: { y: true }, offsets: { x: 200, y: 0 } } );

            /***** Talkables *****/

            var king = new Talkable({
                x: 5753,
                y: 252,
                zindex: 11,
                tag: "talkable",
                width: 150,
                height: 300,
                spriteName: 'king',
                scale: 0.32,
                offsetY: -138
            });
            Game.king = king;

            var chief = new Talkable({
                x: 12300,
                y: 470,
                zindex: 11,
                tag: "talkable",
                width: 150,
                height: 300,
                spriteName: 'monsterChief',
                scale: 0.5,
                offsetY: -138
            });
            Game.chief = chief;

            var monsterChild = new Talkable({
                x: 11300,
                y: 455,
                zindex: 11,
                tag: "talkable",
                width: 150,
                height: 300,
                spriteName: 'monsterChild',
                scale: 0.5,
                offsetY: -138
            });
            Game.monsterChild = monsterChild;

            /***** Events *****/

            king.onMouseClick = function(mouse)
            {
                Game.onTalkableClick(king, player, mouse, function(){
                    if(dialog.hasWaiting("attente_action(roi)")){
                        nodePlayer.e_interface_choix_pn(1); //Choosing the King
                        Game.openTextWindow();
                    }
                });
            };

            chief.onMouseClick = function(mouse)
            {
                Game.onTalkableClick(chief, player, mouse, function(){
                    if(dialog.hasWaiting("attente_action(chefVillage)")) {
                        nodePlayer.e_interface_choix_pn(2); //Choosing the Chief
                        Game.openTextWindow();
                    }
                });
            };

            monsterChild.onMouseClick = function(mouse){
                Game.onTalkableClick(monsterChild, player, mouse, function(){
                    if(dialog.hasWaiting("attente_action(petit)")) {
                        nodePlayer.e_interface_choix_pn(1); //Choosing the child
                        Game.openTextWindow();
                    }
                });
            };

            var noHelper = false;
            Game.camera.onLastMouseClick = function(mouse)
            {
                if(Game.titleScreen){

                    Game.titleScreen.fadeOut(500);
                    setTimeout(function(){
                        $('.dialog').css('display', 'block');
                        Game.scene.remove(Game.titleScreen);
                    }, 500);

                    Game.titleScreen = null;
                }
                else{
                    if(!noHelper){
                        noHelper = true;
                        var newX = mouse.x + this.scenePosition.x;
                        var pointerHelper = new PointerHelper({
                            x:newX, y: mouse.y + this.scenePosition.y, zindex: 100,
                            spriteName: "pointerHelper", scene: Game.scene
                        });

                        var difference = (newX - player.position.x);
                        player.selectRenderer('walkRight');
                        player.direction = 'Right';
                        if(difference < 0) {
                            player.selectRenderer('walkLeft');
                            player.direction = 'Left';
                            difference = -difference;
                        }
                        player.moveTo({x: newX }, difference*3, function(){
                            player.selectRenderer('idle'+player.direction);
                        });
                        setTimeout(function(){
                            //Game.closeTextWindow();
                            //hasTextOpen = false;
                        }, 20);
                        setTimeout(function(){
                            noHelper = false;
                        }, 1000);
                    }
                }
            };

            /*****  *****/
            dialogWindow = {
                el: '.dialog',
                setTitle: function(text){$(this.el).text(text)}
            };

            /***** Adding to scene *****/

            Game.scene.add(Game.titleScreen);

            Game.scene.add(player, king, chief, monsterChild);

            Game.addBiomesToScene(Game.scene, skies1);
            Game.addBiomesToScene(Game.scene, skies2);
            Game.addBiomesToScene(Game.scene, biomes);
            Game.addCollectionToScene(Game.scene, Game.background);
            Game.addCollectionToScene(Game.scene, Game.ground);
            Game.addCollectionToScene(Game.scene, Game.foreground);

            /***** Story engine *****/

            var nodeEventReceiver = {
                e_dire_interface_fermer_player: function(){
                    console.log('fermer player');
                },
                e_dire_interface_o_projet_dispo: function(){
                    console.log('projet dispo');
                    this.nodePlayer.tester();
                },
                e_dire_interface_type_pn: function(no)
                {
                    console.log('type de planche : '+no);
                    dialog.plancheNo = no;
                    if(dialog.plancheNo != no) Game.changePlanche();
                },
                e_dire_interface_texte_0: function(s){
                    console.log('text0 : '+s);
                    dialog.nextText = s;
                    dialog.buttons = [];
                    dialog.waitings = [];
                },
                e_dire_interface_texte_btn: function(no, s)
                {
                    console.log('text button '+no+' - '+s);
                    if(dialog.nextText.length === 0){
                        dialog.waitings.push(s.replace(' ', ''));
                    }
                    else{
                        dialog.buttons.push({no: no, s: s});
                    }
                },
                e_dire_interface_commande: function(s)
                {
                    console.log('interface commande : '+s);
                    dialog.nextText = "";
                    dialog.buttons = [];
                    dialog.waitings = [];

                    //Game.closeTextWindow();
                    Game.callCommand(s);
                }
            };

            var testText = {"nom_du_projet":"Nom du projet","arr_planches":[{"s_nom_de_la_planche":"Départ","s_type":"planche","win_y":0,"arr_pns":[{"x":80.2,"type":6,"arr_pointeurs":[-1,1],"y":356},{"x":235.45,"type":8,"arr_pointeurs":[0,2],"y":355.2,"commande":"var bonte = 0\rvar b_casque = 1\rvar b_jambieres = 1\rvar b_joyau = 1\rvar action_jour_3 = 0\rvar action_jour_4 = 0\rvar action_jour_5 = 0\rvar b_petit = 0\rvar b_voleuse = 0\rvar b_archer = 0"},{"x":485.7,"type":9,"y":356.45,"titre":"jour_3","vers_planche":"jour_3","arr_pointeurs":[1]}],"win_x":0},{"s_nom_de_la_planche":"chaine","s_type":"chaine","win_y":0,"arr_pns":[{"x":50,"type":6,"arr_pointeurs":[-1,-1],"y":342}],"win_x":0},{"s_nom_de_la_planche":"intro","s_type":"planche","win_y":0,"arr_pns":[{"x":50,"type":6,"arr_pointeurs":[-1,-1],"y":342},{"x":230.1,"type":1,"y":361.95,"texte":"Good people. We have found the secret entrance of the terrible dragon that scares our kingdom. Go there and butcher it in the name of your King !","titre":"quete du roi","arr_pointeurs":[-1],"arr_choix":[{"titre":"rep","texte":"Yes my King !"}]},{"x":438.95,"type":1,"y":362.75,"texte":"A trap blocks the passage. It is impossible to pass through without unplug it.","titre":"voleuse","arr_pointeurs":[-1],"arr_choix":[{"titre":"hero","texte":"Gabi the thief, this is a job for you."}]},{"x":645.65,"type":2,"y":359.5,"texte":"Oh my god. This trap is tricky. I've never seen such a mechanism.","titre":"doute","arr_pointeurs":[-1,-1],"arr_choix":[{"titre":"rep 1","texte":"Come on ! You are a thief or not ?"},{"titre":"rep 2","texte":"I'm sure it's not so complex. It must have been set several decade from now. They haven't the technology of today.\r"}]}],"win_x":0},{"s_nom_de_la_planche":"jour_1_quete_roi","s_type":"planche","win_y":0,"arr_pns":[{"x":50,"type":6,"arr_pointeurs":[-1,-1],"y":342},{"x":245.45,"type":1,"y":371.65,"texte":"The realm needs you ! An horrible monster threatens our people. It lives in the forest. Slay it and your fame is granted.","titre":"quete du roi","arr_pointeurs":[-1],"arr_choix":[{"titre":"rep","texte":"Yes my king. I am the hero you need ! I will do the task with pride."}]}],"win_x":0},{"s_nom_de_la_planche":"jour_3","s_type":"planche","win_y":0,"arr_pns":[{"x":53,"type":6,"arr_pointeurs":[-1,22],"y":60.2},{"x":373.5,"type":1,"y":96.6,"texte":"\"The village of monsters hasn't payed their due. I don't accept any delay. Go there and collect the tax.\"","titre":"quete du roi","arr_pointeurs":[22,19],"arr_choix":[{"titre":"oui","texte":"\"Yes my King. Your order is my desire.\""}]},{"x":156.9,"type":2,"y":238.8,"texte":"","titre":"attente btn","arr_pointeurs":[20,3,4],"arr_choix":[{"titre":"attente petit","texte":"attente_action(petit)"},{"titre":"attente chef_village","texte":"attente_action(chefVillage)\r"}]},{"x":310.1,"type":1,"y":206.4,"texte":"\"Ouin ! Mother ! What happened to you ? Why don't you move anymore ?\"","titre":"petit","arr_pointeurs":[2,6],"arr_choix":[{"titre":"rep 1","texte":"It seems this monster had a kid."}]},{"x":475.5,"type":2,"y":259.1,"texte":"You find the chief at the center of the village.\r\"What ? You want me to give you 10 gold. But this is all that we have, as your people plundered our tresory. How will we survive if we have not any gold ? We will starve to death !\"","titre":"chef du village","arr_pointeurs":[2,8,5],"arr_choix":[{"titre":"donne l'or","texte":"\"This is out of my concern, monster ! Give the money !\""},{"titre":"menace dragon","texte":"\"Your tresory was kept by an horrible dragon that threatened our land.\"\r"}]},{"x":613.6,"type":2,"y":355.1,"texte":"\"No ! Our dragon was our guardian ! It never went out, in order to protect our gold from your greedy king.\"","titre":"chef du village","arr_pointeurs":[4,9,12],"arr_choix":[{"titre":"tais toi","texte":"\"Watch your mouth, monster ! Don't talk about my king in such a way !\""},{"titre":"que dis tu ?","texte":"\"What do you say ? Your dragon killed a lot of our people with its burning breath.\"\r"}]},{"x":360.35,"type":11,"arr_pointeurs":[3,7],"y":291.1},{"x":106,"type":11,"arr_pointeurs":[6,2],"y":290.1},{"x":612.5,"type":2,"y":178.8,"texte":"But, we will die !","titre":"chef","arr_pointeurs":[4,9,9],"arr_choix":[{"titre":"tu préfères mourir","texte":"Do you prefer to die just right now ?"},{"titre":"passe l'or","texte":"Give the money right now, i ain't got time !\r"}]},{"x":958.55,"type":2,"y":196.3,"texte":"The chief take a purse out of his pocket.\r\"Please ! I beg you !\"","titre":"chef","arr_pointeurs":[12,10,11],"arr_choix":[{"titre":"le tuer","texte":"\"It's enough ! I warned you ! Say hello to death !\"\rYou beat him to death."},{"titre":"prendre l'or","texte":"\"Shut up !\"\rYou catch the purse violently.\r"}]},{"x":1095,"type":8,"arr_pointeurs":[9,15],"y":114.95,"commande":"var bonte -= 10\rvar action_jour_3 = 1\raction(tuer_chef_village)\r"},{"x":1124.5,"type":8,"arr_pointeurs":[9,15],"y":226.65,"commande":"var action_jour_3 = 2\raction(prendre_or)\r"},{"x":783.35,"type":2,"y":376.35,"texte":"\"That a lie ! If our dragon went out, how could we protect our tresory efficiently ? Furthermore, did it attack you ? It was so peaceful and kind.\"","titre":"chef","arr_pointeurs":[5,9,13],"arr_choix":[{"titre":"troublé","texte":"\"I don't want to hear anymore lies ! Give the money and i get lost !\""},{"titre":"c pas faux","texte":"\"Mmm.. You get the point. It's true the dragon didn't attack us.\""}]},{"x":948.2,"type":1,"y":403.75,"texte":"\"So please ! Find a solution. Don't let us die of starving.\"","titre":"chef","arr_pointeurs":[12,14],"arr_choix":[{"titre":"ok","texte":"\"Ok, i will pay for you this time. I can afford it.\"\rYou leave the chief."}]},{"x":1083.5,"type":8,"arr_pointeurs":[13,15],"y":321.6,"commande":"var bonte += 10\rvar action_jour_3 = 3\raction(payer_de_sa_poche)\r"},{"x":1198.75,"type":11,"arr_pointeurs":[14,16],"y":494.9},{"x":125.6,"type":11,"arr_pointeurs":[15,17],"y":496.2},{"x":178.9,"type":1,"y":619.7,"texte":"","titre":"attente btn","arr_pointeurs":[16,18],"arr_choix":[{"titre":"attente petit","texte":"attente_action(petit)"}]},{"x":354.1,"type":2,"y":621.95,"texte":"The baby is still on his dead mother. The rain begins falling.","titre":"il pleut","arr_pointeurs":[17,23,21],"arr_choix":[{"titre":"le laisser","texte":"You decide to go away."},{"titre":"le protéger","texte":"\"Poor little baby ! Take my helmet to protect you from the rain\"\rYou put the helmet on the creature and continue your way.\r"}]},{"x":422.7,"type":11,"arr_pointeurs":[1,20],"y":122.65},{"x":107.45,"type":11,"arr_pointeurs":[19,2],"y":123.85},{"x":549.9,"type":8,"arr_pointeurs":[18,23],"y":623.9,"commande":"var bonte++\rvar b_casque = 0\rvar b_petit = 1\raction(donner_son_casque)\r"},{"x":189,"type":1,"y":90.1,"texte":"","titre":"attente btn","arr_pointeurs":[0,1],"arr_choix":[{"titre":"attente roi","texte":"attente_action(roi)"}]},{"x":828.2,"type":9,"y":593.3,"titre":"jour_4","vers_planche":"jour_4","arr_pointeurs":[18]}],"win_x":0},{"s_nom_de_la_planche":"jour_4","s_type":"planche","win_y":0,"arr_pns":[{"x":48.85,"type":6,"arr_pointeurs":[-1,1],"y":73.3},{"x":195.4,"type":1,"y":100.7,"texte":"","titre":"attente btn","arr_pointeurs":[0,2],"arr_choix":[{"titre":"attente roi","texte":"attente_action(roi)"}]},{"x":371.45,"type":2,"y":103.1,"texte":"\"The rebels chief has been identified. It's called the engeneer. He lives in the workshop of the monsters village. Show no mercy and butcher him.\"","titre":"quete roi","arr_pointeurs":[1,3,6],"arr_choix":[{"titre":"oui","texte":"\"Yes my lord. Consider him dead.\""},{"titre":"euh","texte":"\"My king, are you sure he is so dangerous ? It is a poor village almost in ruin.\""}]},{"x":492.3,"type":11,"arr_pointeurs":[6,4],"y":147.65},{"x":108.65,"type":11,"arr_pointeurs":[3,5],"y":147.5},{"x":161.85,"type":2,"y":273.7,"texte":"","titre":"attente btn","arr_pointeurs":[4,-1,7],"arr_choix":[{"titre":"attente ingenieur","texte":"attente_action(ingenieur)"},{"titre":"attente voleuse","texte":"attente_action(voleuse)\r"}]},{"x":574.9,"type":1,"y":102.05,"texte":"\"Do you contest the will of your king ?\"","titre":"roi","arr_pointeurs":[2,3],"arr_choix":[{"titre":"j'obeis","texte":"\"Not at all. I will obey.\""}]},{"x":300.95,"type":2,"y":369.5,"texte":"Gaby the thief doesn't look so happy to see you.\r\"What do you want ?\"","titre":"voleuse","arr_pointeurs":[5,15,13],"arr_choix":[{"titre":"rien","texte":"\"Nothing. Just on my way.\""},{"titre":"comment vas tu","texte":"\"How do you do ? Do you suffer from your injuries ?\""}]},{"x":478,"type":3,"y":423.6,"texte":"\"Are you kidding me ? How do you think i feel without any arms ?\"","titre":"voleuse","arr_pointeurs":[13,15,15,10],"arr_choix":[{"titre":"ta gueule","texte":"\"This is not my problem, but i can help you stopping your suffering by death !\""},{"titre":"pas déranger","texte":"\"Sorry, i didn't want to disturb you.\""},{"titre":"tiens le coup","texte":"\"Stay calm ! I am sure there is a solution.\""}]},{"x":123.1,"type":2,"y":561.95,"texte":"You find a strange workshop. A friendly face smiles at you.\r\"Hello stranger. How can i help you ?\"","titre":"ingenieur","arr_pointeurs":[17,11,12],"arr_choix":[{"titre":"tuer","texte":"\"Please, don't move while i cut you half.\"\rYou execute your sentence."},{"titre":"menacer","texte":"\"There is a price on your head, cause by your forfetery.\"\r"}]},{"x":637.6,"type":8,"arr_pointeurs":[8,15],"y":444.4,"commande":"var bonte++"},{"x":632.55,"type":8,"arr_pointeurs":[14,28],"y":545.7,"commande":"var bonte -= 10\rvar action_jour_4 = 1\raction(tuer_ingenieur)\r"},{"x":291.35,"type":3,"y":635.2,"texte":"\"What ? I do nothing wrong. I just help villagers the best i can.\"","titre":"ingenieur","arr_pointeurs":[9,11,14,24],"arr_choix":[{"titre":"tuer","texte":"You lie : \"You stealed the King's gold and raped his daughter. You deserve to die !\" And you kill him."},{"titre":"douter","texte":"\"Don't you build war machines in your workshop ?\"\r"},{"titre":"b_voleuse == 1","texte":"\"You seem nice. A friend of mine has lost his arms. Can you help her ?\"\r"}]},{"x":338.75,"type":8,"arr_pointeurs":[7,8],"y":430.45,"commande":"var b_voleuse = 1"},{"x":470,"type":2,"y":656.45,"texte":"\"No ! Never ! I build houses, attics, doors... all that needs mechanics stuff.\"","titre":"ingenieur","arr_pointeurs":[12,11,18],"arr_choix":[{"titre":"pas confiance","texte":"\"I don't trust you. Die !\"\rYou kill the engeneer."},{"titre":"trop dangereux","texte":"\r\"Ok, you don't seem so dangerous, but your workshop is a threat for my king. I have to destroy it.\"\rYou put the workshop on fire."}]},{"x":896.45,"type":10,"arr_pointeurs":[10,16],"y":313.95},{"x":891.05,"type":11,"arr_pointeurs":[15,17],"y":470.5},{"x":67.85,"type":11,"arr_pointeurs":[16,9],"y":475.9},{"x":640.05,"type":8,"arr_pointeurs":[14,28],"y":642.2,"commande":"var bonte--\rvar action_jour_4 = 2\raction(bruler_atelier)\r"},{"x":303.7,"type":1,"y":828.55,"texte":"\"It's a pleasure ! A love helping the needles. Send her to me.\"","titre":"ingenieur","arr_pointeurs":[26,20],"arr_choix":[{"titre":"merci","texte":"\"Thanks ! I confess her condition is my fault. I let you live, but please, be discreet.\""}]},{"x":638.65,"type":1,"y":839.85,"texte":"","titre":"attente btn","arr_pointeurs":[19,21],"arr_choix":[{"titre":"attente voleuse","texte":"attente_action(voleuse)"}]},{"x":810.65,"type":1,"y":846.35,"texte":"You find Gabi the thief crying, alone.","titre":"voleuse","arr_pointeurs":[20,22],"arr_choix":[{"titre":"aide","texte":"\"Gabi ! I find a way to make you recover arms... mechanics arms. Go to see the engeneer, in the monsters village. Don't be afraid, he is very kind.\""}]},{"x":976.9,"type":1,"y":847.6,"texte":"\"What ? Mechanics arms ? Sounds good. I will go... Thanks !\"","titre":"voleuse","arr_pointeurs":[21,23],"arr_choix":[{"titre":"de rien","texte":"\"My pleasure !\""}]},{"x":1131.1,"type":8,"arr_pointeurs":[22,28],"y":778.1,"commande":"var bonte += 10\rvar action_jour_4 = 4\rvar b_jambieres = 0\raction(sauver_voleuse)\r"},{"x":338.8,"type":11,"arr_pointeurs":[12,25],"y":697.7},{"x":88.5,"type":11,"arr_pointeurs":[24,26],"y":697.7},{"x":137.85,"type":2,"y":781.3,"texte":"\"Of course ! I have already done this kind of mechanics. But i need some metal.. like your greaves for example.\"","titre":"ingenieur","arr_pointeurs":[25,27,19],"arr_choix":[{"titre":"non","texte":"\"Never mind. I don't want to leave them.\""},{"titre":"ok","texte":"\"If it's needed, take it.\"\r"}]},{"x":853.45,"type":8,"arr_pointeurs":[26,28],"y":714.55,"commande":"var bonte ++\rvar action_jour_4 = 3\raction(laisser_ingenieur)\r"},{"x":1121.45,"type":9,"y":524.7,"titre":"jour_5","vers_planche":"jour_5","arr_pointeurs":[23]}],"win_x":0},{"s_nom_de_la_planche":"jour_5","s_type":"planche","win_y":0,"arr_pns":[{"x":53.25,"type":6,"arr_pointeurs":[-1,1],"y":107.1},{"x":207.35,"type":1,"y":135.5,"texte":"","titre":"attente btn","arr_pointeurs":[0,2],"arr_choix":[{"titre":"attente roi","texte":"attente_action(roi)"}]},{"x":375.7,"type":1,"y":145.5,"texte":"\"Some outlaws are hidden in the woods. They are wanted dead or alive.\"","titre":"quete roi","arr_pointeurs":[1,3],"arr_choix":[{"titre":"oui","texte":"\"Yes my King ! I will handle it.\""}]},{"x":153.05,"type":2,"y":265.1,"texte":"","titre":"attente btn","arr_pointeurs":[2,5,22],"arr_choix":[{"titre":"attente foret","texte":"attente_action(foret)"},{"titre":"attente archer","texte":"attente_action(archer)"}]},{"x":542.15,"type":1,"y":277.85,"texte":"The baby monster seems to snort on a track.","titre":"foret","arr_pointeurs":[5,6],"arr_choix":[{"titre":"cherche","texte":"\"Come on ! Search.\""}]},{"x":328.5,"type":13,"arr_pointeurs":[24,4,8],"y":264.85,"arr_conditions":[{"texte":"b_casque == 0"}]},{"x":786.4,"type":2,"y":294.2,"texte":"You find three childs that tried to hide themselves behind a bush.","titre":"trouvé","arr_pointeurs":[4,13,14],"arr_choix":[{"titre":"charge","texte":"\"Charge !\"\rYou charge the bush, swing your sword violently and kill them in one shot."},{"titre":"leur parler","texte":"\"Don't move or i kill you !\"\r"}]},{"x":638.4,"type":1,"y":377.7,"texte":"I are lost, deep into the woods.","titre":"pas trouvé","arr_pointeurs":[8,10],"arr_choix":[{"titre":"chercher","texte":"Continue the search."}]},{"x":427.7,"type":12,"arr_pointeurs":[12,6,7,7,7,6,9,9,9],"y":329.1},{"x":571.4,"type":1,"y":449.45,"texte":"You are completely lost.","titre":"pas trouvé","arr_pointeurs":[8,10],"arr_choix":[{"titre":"continue","texte":"Continue your wandering."}]},{"x":724.65,"type":10,"arr_pointeurs":[9,11],"y":431.35},{"x":724.65,"type":11,"arr_pointeurs":[10,12],"y":475.25},{"x":417.95,"type":11,"arr_pointeurs":[11,8],"y":475.35},{"x":978.9,"type":8,"arr_pointeurs":[6,29],"y":277.1,"commande":"var bonte -= 10\rvar action_jour_5 = 1\raction(tuer_esclaves)\r"},{"x":924.7,"type":2,"y":426.95,"texte":"\"Please ! Don't hurt us ! We didn't do bad things.\"","titre":"esclaves","arr_pointeurs":[6,16,15],"arr_choix":[{"titre":"non","texte":"\"You belong to the King. Only him can judge you. Follow me and i won't kill you.\"\rThey execute your order and let you tie them."},{"titre":"parler","texte":"\"The King want you dead or alive. You must have done bad things !\"\r"}]},{"x":989.9,"type":2,"y":559.55,"texte":"\"We have been enslaved by a bad guy, and maltreated by the King. We just flee our sad condition.\"","titre":"esclave","arr_pointeurs":[14,16,19],"arr_choix":[{"titre":"pas mon probleme","texte":"\"It is not my concern. Follow me and shut up. I bring you back to the King.\"\rYou tie them and go out of the forest."},{"titre":"mechant roi","texte":"\"It's true the King seems to be cruel and tricky some times. But you are wanted dead or alive.\"\r"}]},{"x":1135.65,"type":8,"arr_pointeurs":[15,29],"y":407.55,"commande":"var bonte--\rvar action_jour_5 = 2\raction(capturer_esclaves)\r"},{"x":147.95,"type":1,"y":672.15,"texte":"\"We are just kids. Help us !\"","titre":"esclaves","arr_pointeurs":[20,18],"arr_choix":[{"titre":"ok","texte":"\"Ok ! I will tell i butcher you so badly that i could not take a proof except rivers of blood. Go far from the village to hide. Nobody must see you again.\""}]},{"x":314.7,"type":8,"arr_pointeurs":[17,21],"y":653.8,"commande":"var bonte += 10\rvar action_jour_5 = 3\raction(liberer_esclaves)\r"},{"x":1041.1,"type":11,"arr_pointeurs":[15,20],"y":597.8},{"x":95.65,"type":11,"arr_pointeurs":[19,17],"y":594.4},{"x":518.25,"type":1,"y":683.45,"texte":"","titre":"attente btn","arr_pointeurs":[18,26],"arr_choix":[{"titre":"attente archer","texte":"attente_action(archer)"}]},{"x":158.55,"type":2,"y":360.75,"texte":"You recognise your old friend Jo the archer, but he doesn't. He is blind.\r\"Who is here ?\"","titre":"archer","arr_pointeurs":[3,5,23],"arr_choix":[{"titre":"c rien","texte":"You don't answer and go away."},{"titre":"c moi","texte":"\"That's me !\"\r"}]},{"x":164.15,"type":2,"y":487.8,"texte":"\"You bastard ! Get away ! I will never forgive you treason.\"","titre":"archer","arr_pointeurs":[22,5,24],"arr_choix":[{"titre":"ok","texte":"\"Ok\""},{"titre":"sorry","texte":"\"I'm sorry. I should never force you to face the dragon alone. I didn't know it will burn your face and make you blind.\"\r"}]},{"x":311.8,"type":8,"arr_pointeurs":[23,5],"y":526.85,"commande":"var bonte++\rvar b_archer = 1\r"},{"x":846.35,"type":2,"y":750.55,"texte":"\"Who are you ? Is it you again ?\"","titre":"archer","arr_pointeurs":[26,29,28],"arr_choix":[{"titre":"desole","texte":"\"I hope you will forgive me one day.\""},{"titre":"donner baby","texte":"\"Let me help you and offer you this baby pet. It is young but very smart. I am sure it will guide you and let you travel where you want.\"\rHe doesn't seem to enjoy the idea, but at the very moment he touches the pet, they become ultimate friends."}]},{"x":708.55,"type":13,"arr_pointeurs":[21,27,25],"y":659.65,"arr_conditions":[{"texte":"b_archer == 0"}]},{"x":916.85,"type":1,"y":669.9,"texte":"You recognise your old friend Jo the archer, but he doesn't. He is blind.\r\"Who is here ?\"","titre":"archer","arr_pointeurs":[26,29],"arr_choix":[{"titre":"c rien","texte":"You don't answer and go away."}]},{"x":1042.1,"type":8,"arr_pointeurs":[25,29],"y":752,"commande":"var b_petit = 0\rvar bonte += 10\rvar action_jour_5 = 4\raction(aider_archer)\r"},{"x":1153.65,"type":9,"y":666.05,"titre":"jour_6","vers_planche":"jour_6","arr_pointeurs":[28]}],"win_x":0},{"s_nom_de_la_planche":"jour_6","s_type":"planche","win_y":0,"arr_pns":[{"x":61.85,"type":6,"arr_pointeurs":[-1,1],"y":58.2},{"x":227.05,"type":1,"y":92.25,"texte":"","titre":"attente btn","arr_pointeurs":[0,2],"arr_choix":[{"titre":"attente roi","texte":"attente_action(roi)"}]},{"x":441.3,"type":2,"y":94.4,"texte":"\"I fed up with this village of monsters ! Burn it all !\"","titre":"quete roi","arr_pointeurs":[1,4,3],"arr_choix":[{"titre":"oui","texte":"\"Yes my Lord. Nothing will remain.\""},{"titre":"mais","texte":"\"But, what about the villagers ?\"\r"}]},{"x":644.55,"type":1,"y":141.15,"texte":"You heard a servant speak to the King :\r\"The village is the perfect placement for your future castle.\"\rBut the King answers to you :\r\"I don't ask you to think, just obey.\"","titre":"roi","arr_pointeurs":[2,4],"arr_choix":[{"titre":"oui","texte":"\"Yes my King. I will do everything you want.\""}]},{"x":780.3,"type":10,"arr_pointeurs":[3,5],"y":76.75},{"x":781.3,"type":11,"arr_pointeurs":[4,6],"y":170.55},{"x":81.3,"type":11,"arr_pointeurs":[5,7],"y":175.95},{"x":135.7,"type":2,"y":305.1,"texte":"","titre":"attente btn","arr_pointeurs":[6,11,10],"arr_choix":[{"titre":"attente village","texte":"attente_action(village)"},{"titre":"attente mendiant","texte":"attente_action(mendiant)\r"}]},{"x":531.3,"type":1,"y":315.65,"texte":"\"You set fire to the village. Every villager run away, screaming.\"\rYou don't know why, but you feel guilty.","titre":"village","arr_pointeurs":[11,12],"arr_choix":[{"titre":"what do we do","texte":"What do we do now ?"}]},{"x":464.85,"type":1,"y":422.6,"texte":"You throw your sword on the ground and give the mendiant your dragon's jewel hoping it will change his life. And you get away from this selfish King.","titre":"mendiant","arr_pointeurs":[10,12],"arr_choix":[{"titre":"what do you do","texte":"What do you do know ?"}]},{"x":273.4,"type":8,"arr_pointeurs":[7,9],"y":395.45,"commande":"var bonte += 10\rvar b_joyau = 0\raction(donner_joyau)\r"},{"x":344.35,"type":8,"arr_pointeurs":[7,8],"y":286.85,"commande":"var bonte -= 10\raction(bruler_village)\r"},{"x":796.75,"type":7,"arr_pointeurs":[9],"y":340.15}],"win_x":0}]};


            nodePlayer = new XTextualNodePlayer({
                main: nodeEventReceiver
            });
            nodeEventReceiver.nodePlayer = nodePlayer;
            nodePlayer.charger(testText);

            Popups.templateName = "popupTemplate";
            Popups.selector = '#popupsContainer';

            // always let a little delay between the real load and the visual load, better feeling
            setTimeout(function () {
                DE.States.down("isLoading");
            }, 200);
        };

        Game.addCollectionToScene = function(scene, collection)
        {
            for(var i=0;i<collection.length;i++)
            {
                scene.add(collection[i]);
            }
        };

        Game.addBiomesToScene = function(scene, biomes)
        {
            for(var i=0;i<biomes.length;i++)
            {
                this.addCollectionToScene(scene, biomes[i].slices);
            }
        };

        Game.openTextWindow = function()
        {
            if(dialog.nextText.length === 0){
                Game.closeTextWindow();
            }
            else if(currentPopup == null){
                var actions = {};
                var contexts = [];
                var closes = [];

                for(i=0;i<dialog.buttons.length;i++)
                {
                    var button = dialog.buttons[i];
                    closes.push(button.s);
                    actions[button.s] = function(e){
                        var buttonString = $(e.target).attr('class');
                        nodePlayer.e_interface_choix_pn(this.getNoForString(buttonString));
                        currentPopup = null;
                        setTimeout(function(){ Game.openTextWindow()}, 200);
                    };
                }

                this.getNoForString = function(buttonString){
                    for(i=0;i<dialog.buttons.length;i++)
                    {
                        var button = dialog.buttons[i];
                        if(button.s.indexOf(buttonString) != -1) return button.no + 1;
                        //if(button.s == buttonString) return button.no + 1;
                    }
                };

                currentPopup = Popups.create(dialog.nextText, "custom", actions, this, closes);
            }
        };

        Game.closeTextWindow = function()
        {
            if(currentPopup != null) {
                Popups.remove(currentPopup.id);
                currentPopup = null;
            }
        };

        Game.onTalkableClick = function(talkable, player, mouse, callback)
        {
            var diff = talkable.position.x - player.position.x;
            var speed = diff*3;
            if(diff < 0){
                player.selectRenderer('walkLeft');
                player.direction = 'Left';
            }
            else{
                player.selectRenderer('walkRight');
                player.direction = 'Right';
            }
            if(diff < 100 && diff > - 100)
            {
                speed = 1000;
            }
            player.moveTo({x: talkable.position.x - 200 }, speed, function(){
                player.selectRenderer('idleRight');
                callback();
            });
            mouse.stopPropagation = true;
            return true;
        };

        Game.callCommand = function(command)
        {
            command = command.trim();
            switch(command) {
                case 'action(prendre_or)':
                    console.log("je prends l'or");
                    break;
                case 'action(tuer_chef_village)':
                    Game.player.selectRenderer('attack');
                    DE.AudioManager.fx.play('deathSound');
                    Game.chief.fadeOut(576*2);
                    setTimeout(function(){
                        Game.player.selectRenderer('idleRight');
                        Game.scene.remove(Game.chief);
                    }, 576*2);//144*4
                    break;
                default:
                    console.log('default command called');
                    break;
            }
        };

        window.Game = Game; // debug only
        window.DREAM_E = DE;
        return Game;
    });