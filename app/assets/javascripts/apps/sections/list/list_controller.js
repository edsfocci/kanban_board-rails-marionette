KanbanBoard.module('SectionsApp.List',
function(List, KanbanBoard, Backbone, Mn, $, _) {
  List.Controller = {
    listSections: function(board) {
      var sections = KanbanBoard.request('section:entities', board);

      var sectionsListView = new List.Sections({
        collection: sections
      });

      sectionsListView.on('childview:card:addview', function() {
        KanbanBoard.CardsApp.New.Controller.newCardView();
      });

      sectionsListView.on('childview:card:list', function(childView, model) {
        KanbanBoard.CardsApp.List.Controller.listCards(childView, model);
      });

      KanbanBoard.rootView.mainRegion.show(sectionsListView);
    }
  };
});
