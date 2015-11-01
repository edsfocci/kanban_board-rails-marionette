KanbanBoard.module('CardsApp.List',
function(List, KanbanBoard, Backbone, Mn, $, _) {
  List.Controller = {
    listCards: function () {
      var cardsPromise = KanbanBoard.request('card:entities');

      $.when(cardsPromise).done(function(cards) {
        var cardsListView = new List.Cards({
          collection: cards
        });

        cardsListView.on('card:new', function() {
          var newCard = new KanbanBoard.Entities.Card();

          var cardNewView = new KanbanBoard.CardsApp.New.Card({
            model: newCard,
            asModal: true
          });

          cardNewView.on('form:submit', function(data) {
            console.log(cards);
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
            if (model.save(data)) {
              childView.render();
              KanbanBoard.rootView.dialogRegion.empty();
            } else cardEditView.triggerMethod('form:data:invalid',
              model.validationError);
          });

          KanbanBoard.rootView.dialogRegion.show(cardEditView);
        });

        KanbanBoard.rootView.mainRegion.show(cardsListView);
      });
    }
  };
});
