KanbanBoard.module('CardsApp.New',
function(New, KanbanBoard, Backbone, Mn, $, _) {
  New.Card = KanbanBoard.CardsApp.Common.Views.Form.extend({
    title: 'New Card'
  });
});
