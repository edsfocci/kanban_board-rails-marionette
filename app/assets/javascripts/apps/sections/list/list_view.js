KanbanBoard.module('SectionsApp.List',
function(List, KanbanBoard, Backbone, Mn, $, _) {
  List.Section = Mn.LayoutView.extend({
    className: 'col-sm-4 board-section',
    template: '#section-list-item',

    attributes: function() {
      return {
        'data-id': this.model.get('id')
      };
    },

    regions: {
      addCard: '.add-card',
      cardsRegion: '.cards-region'
    },

    onBeforeShow: function() {
      // this.trigger('card:addview');
      this.trigger('card:list', this.model);
      // this.addCard.show(cardAddView);
      // this.cardsRegion.show(cardsListView);
    }
  });

  List.Sections = Mn.CollectionView.extend({
    childView: List.Section
  });
});
