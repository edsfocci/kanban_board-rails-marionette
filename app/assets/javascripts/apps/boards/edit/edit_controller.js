KanbanBoard.module('BoardsApp.Edit',
function(Edit, KanbanBoard, Backbone, Mn, $, _) {
  Edit.Controller = {
    editCardOrder: function(reorderData) {
      var boardPromise =
        KanbanBoard.request('board:entity', reorderData.boardId);

      $.when(boardPromise).done(function(board) {
        var movedCardId = reorderData.origin.cardId;
        var cardOrder = board.get('card_order');
        console.log(cardOrder);

        var sections = ['To Do', 'Doing', 'Done'];
        var originSection = sections.indexOf(reorderData.origin.section);

        // TODO: test performance of both methods:
        var originPos = reorderData.origin.cardPos;
        cardOrder[originSection].splice(originPos, 1);
        // cardOrder[section].filter(function(cardId) {
        //   return cardId !== movedCardId;
        // });

        var destSection = sections.indexOf(reorderData.dest.section);

        var destPos = reorderData.dest.cardPos;
        cardOrder[destSection].splice(destPos, 0, movedCardId);

        console.log(cardOrder);
        board.set('card_order', cardOrder);
        board.save();
      });
    }
  };
});
