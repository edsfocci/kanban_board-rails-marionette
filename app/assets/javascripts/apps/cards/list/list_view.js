KanbanBoard.module('CardsApp.List',
function(List, KanbanBoard, Backbone, Mn, $, _) {
  List.Card = Mn.ItemView.extend({
    template: '#card-list-item',
    className: 'card',

    events: {
      'click js-card-edit': 'editClicked'
    },

    editClicked: function(e) {
      this.trigger('card:edit', this.model);
    }
  });

  List.Cards = Mn.CollectionView.extend({
    childView: List.Card
  });
});