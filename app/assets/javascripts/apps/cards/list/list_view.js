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
    className: 'col-sm-4 board-section',
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
          this.reorderData = {};
          this.reorderData.origin = {};

          this.reorderData.cardId = $(ui.item).data('id');

          this.reorderData.origin.section =
            $(ui.item).closest('.board-section').find('h1.text-center').html();

          this.reorderData.origin.cardPos = $(this)
            .sortable('toArray', { attribute: 'data-id' })
            .indexOf(this.reorderData.cardId.toString());
        },

        update: function(e, ui) {
          this.reorderData.dest = {};

          this.reorderData.dest.section =
            $(ui.item).closest('.board-section').find('h1.text-center').html();

          this.reorderData.dest.cardPos = $(this)
            .sortable('toArray', { attribute: 'data-id' })
            .indexOf(this.reorderData.cardId.toString());

          self.trigger('card:reorder', this.reorderData);
        }
      });
    },

    onRenderCollection: function() {
      this.attachHtml = function(collectionView, itemView, index) {
        $(this.childViewContainer).prepend(itemView.el);
      };
    }
  });
});