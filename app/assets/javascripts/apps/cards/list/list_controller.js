KanbanBoard.module('CardsApp.List',
function(List, KanbanBoard, Backbone, Mn, $, _) {
  List.Controller = {
    listCards: function (board) {
      var cardsPromise = KanbanBoard.request('card:entities', board.id);

      $.when(cardsPromise).done(function(cards) {
        var cardsListView = new List.Cards({
          collection: cards
        });

        cardsListView.on('card:new', function() {
          var sections = ['To Do', 'Doing', 'Done'];
          var section = sections
            .indexOf(this.$el.find('h1.text-center').html());

          var newCard = new KanbanBoard.Entities.Card({ section: section });

          var cardNewView = new KanbanBoard.CardsApp.New.Card({
            model: newCard,
            asModal: true
          });

          cardNewView.on('form:submit', function(data) {
            data.title = data.title.trim();
            data.board_id = board.id;

            if (newCard.save(data)) {
              cards.add(newCard);
              KanbanBoard.rootView.dialogRegion.empty();
            } else cardNewView.triggerMethod('form:data:invalid',
              newCard.validationError);
          });

          KanbanBoard.rootView.dialogRegion.show(cardNewView);
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
          reorderData.boardId = board.id;

          KanbanBoard.BoardsApp.Edit.Controller.editCardOrder(reorderData);
        });

        KanbanBoard.rootView.mainRegion.show(cardsListView);
      });
    }
  };
});
