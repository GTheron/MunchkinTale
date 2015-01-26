/**
* @ContributorsList
* @Inateno / http://inateno.com / http://dreamirl.com
*
***
* @sound mouseclick1 : Credit (Kenney or www.kenney.nl)
*
* 
***
*
* @singleton
* audioList
this is the audioList will be available in the project.
Please declare in the same way than this example.
To load audio as default just set "preload" to true.
**/

define( [ 'DE.CONFIG' ],
function( CONFIG )
{
  var audioList = [
    // MUSICS
    //[ "game_music", "audio/Game_Music", [ 'ogg', 'mp3' ], { "preload": true, "loop": true, "isMusic": true } ]
    
    // FX
    [ "mouseclick1", "audio/mouseclick1", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ],
    [ "music1", "audio/fra_medieval_dark_8", [ 'mp3' ], { "preload": true, "loop": true, "isMusic": true } ],
    [ "music2", "audio/fra_medieval_total_2", [ 'mp3' ], { "preload": true, "loop": true, "isMusic": true } ],
    [ "deathSound", "audio/tuer_chef_village", [ 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
  ];
  CONFIG.debug.log( "audioList loaded", 3 );
  return audioList;
} );