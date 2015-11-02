KanbanBoard.module('CardsApp.New',
function(New, KanbanBoard, Backbone, Mn, $, _) {
  New.CardButton = Mn.ItemView.extend({
    template: '#card-new',

    triggers: {
      'click .js-card-new': 'card:new'
    }
  });

  New.Card = KanbanBoard.CardsApp.Common.Views.Form.extend({
    title: 'New Card'
  });
});
