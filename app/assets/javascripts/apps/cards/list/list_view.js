KanbanBoard.module('CardsApp.List',
function(List, KanbanBoard, Backbone, Mn, $, _) {
  List.Card = Mn.ItemView.extend({
    template: '#card-list-item',
    className: 'card',

    attributes: function() {
      return {
        'data-id': this.model.get('id')
      };
    },

    events: {
      'click .js-card-edit': 'editClicked'
    },

    editClicked: function() {
      this.trigger('card:edit', this.model);
    }
  });

  List.Cards = Mn.CompositeView.extend({
    template: '#card-list',
    childView: List.Card,
    childViewContainer: '.card-stack',

    triggers: {
      'click .js-card-new': 'card:new'
    },

    onShow: function() {
      var self = this;

      $('.card-stack').sortable({
        cursor: 'grabbing',
        connectWith: '.card-stack',
        placeholder: 'card-placeholder',
        tolerance: 'pointer',

        activate: function(e, ui) {
          ui.item.reorderData = {};
          ui.item.reorderData.origin = {};

          ui.item.reorderData.cardId = $(ui.item).data('id');

          // this.reorderData.origin.section =
          //   $(ui.item).closest('.board-section').find('h1.text-center').html();
          ui.item.reorderData.origin.section =
            $(ui.item).closest('.board-section').data('id');

          ui.item.reorderData.origin.cardPos = $(this)
            .sortable('toArray', { attribute: 'data-id' })
            .indexOf(ui.item.reorderData.cardId.toString());
        },

        update: function(e, ui) {
          ui.item.reorderData.dest = {};

          // this.reorderData.dest.section =
          //   $(ui.item).closest('.board-section').find('h1.text-center').html();
          ui.item.reorderData.dest.section =
            $(ui.item).closest('.board-section').data('id');

          ui.item.reorderData.dest.cardPos = $(this)
            .sortable('toArray', { attribute: 'data-id' })
            .indexOf(ui.item.reorderData.cardId.toString());

          self.trigger('card:reorder', ui.item.reorderData);
        }
      });
    },

    onRenderCollection: function() {
      this.attachHtml = function(collectionView, itemView, index) {
        $(this.childViewContainer).prepend(itemView.el);
        itemView.model.set('item_view', itemView);
      };
    }
  });
});