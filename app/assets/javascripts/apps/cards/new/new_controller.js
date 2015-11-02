KanbanBoard.module('CardsApp.New',
function(New, KanbanBoard, Backbone, Mn, $, _) {
  New.Controller = {
    newCard: function(sectionView, section) {
      var cardNewBtn = new KanbanBoard.CardsApp.New.CardButton();

      cardNewBtn.on('card:new', function() {
        var sectionId = section.get('id');

        var newCard = new KanbanBoard.Entities.Card({ section: sectionId });

        var cardNewView = new KanbanBoard.CardsApp.New.Card({
          model: newCard,
          asModal: true
        });

        cardNewView.on('form:submit', function(data) {
          data.title = data.title.trim();
          data.board_id = section.get('board_id');

          if (newCard.save(data, {
            success: function(model) {
              model.get('item_view').$el.attr('data-id', model.get('id'));
            }
          })) {
            section.cards.add(newCard);
            KanbanBoard.rootView.dialogRegion.empty();
          } else cardNewView.triggerMethod('form:data:invalid',
            newCard.validationError);
        });

        KanbanBoard.rootView.dialogRegion.show(cardNewView);
      });

      sectionView.addCard.show(cardNewBtn);
    }
  };
});
