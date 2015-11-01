KanbanBoard.module('CardsApp.Edit',
function(Edit, KanbanBoard, Backbone, Mn, $, _) {
  Edit.Card = KanbanBoard.CardsApp.Common.Views.Form.extend({
    title: 'Edit Card'
  });
});
