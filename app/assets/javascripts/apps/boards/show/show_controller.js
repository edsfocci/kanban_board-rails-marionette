KanbanBoard.module('BoardsApp.Show',
function(Show, KanbanBoard, Backbone, Mn, $, _) {
  Show.Controller = {
    showBoard: function(id) {
      var boardPromise = KanbanBoard.request('board:entity', id);

      $.when(boardPromise).done(function(board) {
        if (board) KanbanBoard.SectionsApp.List.Controller.listSections(board);
      });
    }
  };
});
