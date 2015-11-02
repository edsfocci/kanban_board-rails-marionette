KanbanBoard.module('CardsApp.List',
function(List, KanbanBoard, Backbone, Mn, $, _) {
  List.Controller = {
    listCards: function (sectionView, section) {
      var cardsPromise = KanbanBoard.request('card:entities', section);

      $.when(cardsPromise).done(function(cards) {
        var cardsListView = new List.Cards({
          collection: cards
        });

        // cardsListView.on('card:new', function() {
        //   var section = section.get('id');

        //   var newCard = new KanbanBoard.Entities.Card({ section: section });

        //   var cardNewView = new KanbanBoard.CardsApp.New.Card({
        //     model: newCard,
        //     asModal: true
        //   });

        //   cardNewView.on('form:submit', function(data) {
        //     data.title = data.title.trim();
        //     data.board_id = section.get('board_id');

        //     if (newCard.save(data, {
        //       success: function(model) {
        //         model.get('item_view').$el.attr('data-id', model.get('id'));
        //       }
        //     })) {
        //       cards.add(newCard);
        //       KanbanBoard.rootView.dialogRegion.empty();
        //     } else cardNewView.triggerMethod('form:data:invalid',
        //       newCard.validationError);
        //   });

        //   KanbanBoard.rootView.dialogRegion.show(cardNewView);
        // });

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
