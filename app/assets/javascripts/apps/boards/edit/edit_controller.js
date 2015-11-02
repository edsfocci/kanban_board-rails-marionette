KanbanBoard.module('BoardsApp.Edit',
function(Edit, KanbanBoard, Backbone, Mn, $, _) {
  Edit.Controller = {
    editCardOrder: function(reorderData) {
      var boardPromise =
        KanbanBoard.request('board:entity', reorderData.boardId);

      $.when(boardPromise).done(function(board) {
        var movedCardId = reorderData.cardId;
        var cardOrder = board.get('card_order');

        var originSection = reorderData.origin.section;

        var originPos = reorderData.origin.cardPos;
        cardOrder[originSection].splice(originPos, 1);

        var destSection = reorderData.dest.section;

        var destPos = reorderData.dest.cardPos;
        cardOrder[destSection].splice(destPos, 0, movedCardId);

        board.set('card_order', cardOrder);
        board.save();
      });
    }
  };
});
