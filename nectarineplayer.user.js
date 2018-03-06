// ==UserScript==
// @name     song info for Nectarine Player
// @namespace skd.nectarine.player
// @description Display current song's details (title and time left) in Nectarine Player from scenemusic.net
// @version  1.0
// license: GPL
// @grant    none
// @include  https://www.scenemusic.net/player/
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require  https://www.scenemusic.net/static/js/dutils.js?v=20170202v02
// ==/UserScript==

function updateSongDetails(data) {
  var songdetails=$(data).find('div[data-name=nowplaying]');
  $('#songdetails > #title').html($(songdetails).find('.songname'));
  $('#songdetails > #timeleft').html($(songdetails).find('span[data-name=counter]'));
  var timeleft=$('span[data-name=counter]').attr('data-sec');
  if ($.isNumeric(timeleft)) {
    setupUpdateSongDetails(timeleft);
  }
  $("a").css({
    "font-weight": "bold",
    "text-decoration": "none",
    "color": "#a60"
  });
}

function setupUpdateSongDetails(delaysec) {
  console.log('setup update after ' + delaysec + 's');
  window.setTimeout(function() {
    console.log('get song data');
		$.get('https://www.scenemusic.net/demovibes', updateSongDetails);
  }, delaysec * 1000);
}

/* Update counter using js from nectarine page (GPL code) */
function counterUpdater() {
  counter();
}

this.$ = this.jQuery = jQuery.noConflict(true);

/* Add div for song info */
$(".jp-controls").after("<div id='songdetails'><span id='title' style='display: inline-block; width: 90%;'>title</span><span id='timeleft'>0:00</span></div>");

setupUpdateSongDetails(1);
window.setInterval(counterUpdater, 1000);
