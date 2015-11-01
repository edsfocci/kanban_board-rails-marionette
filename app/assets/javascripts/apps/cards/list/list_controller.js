KanbanBoard.module('CardsApp.List',
function(List, KanbanBoard, Backbone, Mn, $, _) {
  List.Controller = {
    listCards: function () {
      var cards = KanbanBoard.request('card:entities');

      var cardsListView = new List.Cards({
        collection: cards
      });

      cardsListView.on('childview:card:edit', function(childView, model) {
        var cardEditView = new KanbanBoard.CardsApp.Edit.Card({
          model: model,
          asModal: true
        });

        cardEditView.on('form:submit', function(data) {
          if (model.save(data)) {
            childView.render();
            KanbanBoard.rootView.dialogRegion.empty();
          }
        });

        KanbanBoard.rootView.dialogRegion.show(cardEditView);
      });

      KanbanBoard.rootView.leftStack.show(cardsListView);
    }
  };
});
