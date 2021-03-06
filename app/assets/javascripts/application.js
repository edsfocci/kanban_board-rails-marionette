// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require json2
//= require jquery
//= require jquery_ujs
//= require jquery-ui/sortable
//= require jquery-ui/dialog
//= require lodash
//= require backbone
//= require backbone.marionette
//= require backbone.syphon

//= require app
//= require_tree ./entities
//= require_tree ./apps/cards
//= require_tree ./apps/sections
//= require_tree ./apps/boards

$(document).ready(function() {

  KanbanBoard.start();
});
