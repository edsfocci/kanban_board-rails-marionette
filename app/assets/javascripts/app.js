_.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g
};

var KanbanBoard = new Mn.Application();

KanbanBoard.RootView = Mn.LayoutView.extend({
  el: 'body',

  regions: {
    mainRegion: '#main-region',
    dialogRegion: '#dialog-region'
  }
});

KanbanBoard.on('start', function() {
  KanbanBoard.rootView = new KanbanBoard.RootView();

  KanbanBoard.CardsApp.List.Controller.listCards();
});
