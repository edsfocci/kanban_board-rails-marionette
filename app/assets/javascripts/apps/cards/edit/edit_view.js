KanbanBoard.module('CardsApp.Edit',
function(Edit, KanbanBoard, Backbone, Mn, $, _) {
  Edit.Card = KanbanBoard.CardsApp.Common.Views.Form.extend({
    title: 'Edit Card',

    onRender: function() {
        var $button = $('<button>',
          { text: 'Delete', class: 'btn btn-danger' });

        var self = this;
        $button.click(function() {
          self.trigger('card:delete', self.model);
        });

        this.$el.append($button);
    }
  });
});
