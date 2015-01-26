/**
* @ContributorsList
* @Inateno / http://inateno.com / http://dreamirl.com
*
***
* @images plane and touchControl : Credit (Kenney or www.kenney.nl)
*
* 
***
*
* @singleton
* imagesList
this is the imagesList will be available in the project.
Please declare in the same way than this example.
To load image as default just set "load" to true.
Otherwhise you can load/add images when you want, load images by calling the DREAM_ENGINE.ImageManager.pushImage function

- [ name, url, extension, 
parameters: load:Bool, totalFrame:Int, totalLine:Int, eachAnim:Int (ms), isAnimated:Bool, isReversed:Bool
] -

All parameters are optionnal but at least an empty object need to be set
**/
define( [ 'DE.CONFIG' ],
function( CONFIG )
{
  var datas = {
    // avalaible images sizes (engine will load optimisest images depends on user resolution)
    screenSizes: [
      { "w": 1280, "h": 720, "path": "" }
    ]

    // index of the used screen size during game conception
    , conceptionSizeIndex: 0

    // images folder name
    , folderName: "img"

    // usage name, real name (can contain subpath), extension, parameters
    , imagesList: [
      [ "platform", "platform", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "pointerHelper", "POINTER", "svg", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "dialogBox", "DIAL", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "gauge", "JAUGE", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "archer", "ARCHER", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "hero", "ATLAS_HERO", "png", { "load": true, "totalFrame": 4, "eachAnim": 1, "totalLine": 4, "isAnimated":false } ],
      [ "heroIdleLeft", "ATLAS_HERO_IDLE_LEFT", "png", { "load": true, "totalFrame": 4, "eachAnim": 144, "totalLine": 1, "isAnimated":true } ],
      [ "heroIdleRight", "ATLAS_HERO_IDLE_RIGHT", "png", { "load": true, "totalFrame": 4, "eachAnim": 144, "totalLine": 1, "isAnimated":true } ],
      [ "heroWalkLeft", "ATLAS_HERO_WALK_LEFT", "png", { "load": true, "totalFrame": 4, "eachAnim": 144, "totalLine": 1, "isAnimated":true } ],
      [ "heroWalkRight", "ATLAS_HERO_WALK_RIGHT", "png", { "load": true, "totalFrame": 4, "eachAnim": 144, "totalLine": 1, "isAnimated":true } ],
      [ "heroAttack", "ATLAS_HERO_ATTACK_RIGHT", "png", { "load": true, "totalFrame": 4, "eachAnim": 144, "totalLine": 1, "isAnimated":true } ],
      [ "monsterChief", "CHEF_MONSTRE", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "monsterChild", "ENFANT", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "engineer", "INGENIEUR", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "monsterMother", "MAMAN", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "beggar", "MENDIANT", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "king", "ROI", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "thief", "VOLEUSE", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "children", "ENFANT_3", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "servant", "SERVANT", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "horn", "TROMPETTE", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_1", "LVL_1", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_2", "LVL_2", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_3", "LVL_3", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_4", "LVL_4", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_5", "LVL_5", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_6", "LVL_6", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_7", "LVL_7", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_8", "LVL_8", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_9", "LVL_9", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_10", "LVL_10", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_11", "LVL_11", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_12", "LVL_12", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_13", "LVL_13", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_14", "LVL_14", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_15", "lvl_15", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_16", "LVL_16", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_17", "LVL_17", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_18", "lvl_18", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_19", "LVL_19", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_20", "LVL_20", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_21", "LVL_21", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_22", "LVL_22", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_23", "LVL_23", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_24", "LVL_24", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_25", "LVL_25", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "lvl_26", "LVL_26", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "biome1", "BACK_1", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "biome2", "BACK_2", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "biome3", "BACK_3", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "biome4", "BACK_4", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "biome5", "BACK_5", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "biome6", "BACK_6", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "biome7", "BACK_7", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "biome8", "BACK_8", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "skies1", "SKIES_1", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "skies2", "SKIES_2", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "tab1", "TAB_1", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ],
      [ "titleScreen", "TITLE", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ]
    ]
  };
  CONFIG.debug.log( "imagesDatas loaded", 3 );
  return datas;
} );