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
      this.trigger('card:addview', this.model);
      this.trigger('card:list', this.model);
    },

    events: {
      'mousemove.element': 'mouseMoved'
    },

    mouseMoved: function(e) {
      // // console.log(e);
      // // console.log($(this).children());
      // var id = this.model.get('id');
      // var cardsRegion = $($('.board-section')[id]).children('.cards-region');
      // var cardStack = $($('.board-section')[id]).find('.card-stack');
      // // cardsRegion.scrollTop(cardsRegion.scrollTop()+1);
      // console.log(cardStack.height());
      // cardStack.height(0);
      // console.log(cardStack.height());
      // // cardStack.height(cardStack.height()+100);
    }
  });

  List.Sections = Mn.CollectionView.extend({
    childView: List.Section
  });
});
