KanbanBoard.module('CardsApp.List',
function(List, KanbanBoard, Backbone, Mn, $, _) {
  List.Card = Mn.ItemView.extend({
    template: '#card-list-item',
    className: 'card',

    events: {
      'click .js-card-edit': 'editClicked'
    },

    editClicked: function() {
      this.trigger('card:edit', this.model);
    }
  });

  List.Cards = Mn.CompositeView.extend({
    className: 'col-sm-4 board-section',
    template: '#card-list',
    childView: List.Card,
    childViewContainer: '.card-stack',

    triggers: {
      'click .js-card-new': 'card:new'
    },

    onShow: function() {
      $('.card-stack').sortable({
        cursor: 'grabbing',
        connectWith: '.card-stack',
        placeholder: 'card-placeholder',
        tolerance: 'pointer'
      });
    }
  });
});