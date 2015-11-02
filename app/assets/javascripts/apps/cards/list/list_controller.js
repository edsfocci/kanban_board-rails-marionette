KanbanBoard.module('CardsApp.List',
function(List, KanbanBoard, Backbone, Mn, $, _) {
  List.Controller = {
    listCards: function (sectionView, section) {
      var cardsPromise = KanbanBoard.request('card:entities', section);

      $.when(cardsPromise).done(function(cards) {
        section.cards = cards;

        var cardsListView = new List.Cards({
          collection: cards
        });

        cardsListView.on('childview:card:edit', function(childView, model) {
          var cardEditView = new KanbanBoard.CardsApp.Edit.Card({
            model: model,
            asModal: true
          });

          cardEditView.on('form:submit', function(data) {
            data.title = data.title.trim();

            if (model.save(data)) {
              childView.render();
              KanbanBoard.rootView.dialogRegion.empty();
            } else cardEditView.triggerMethod('form:data:invalid',
              model.validationError);
          });

          KanbanBoard.rootView.dialogRegion.show(cardEditView);
        });

        cardsListView.on('card:reorder', function(reorderData) {
          reorderData.boardId = section.get('board_id');

          KanbanBoard.BoardsApp.Edit.Controller.editCardOrder(reorderData);
        });

        sectionView.cardsRegion.show(cardsListView);
        // KanbanBoard.SectionsApp.List.Controller
        //   .cardsListViewAttach(cardsListView);
      });
    }
  };
});
