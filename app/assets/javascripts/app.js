var KanbanBoard = new Mn.Application();

KanbanBoard.RootView = Mn.LayoutView.extend({
  el: 'body',

  regions: {
    leftStack: '#left-stack',
    dialogRegion: '#dialog-region'
  }
});

KanbanBoard.on('start', function() {
  KanbanBoard.rootView = new KanbanBoard.RootView();
});
