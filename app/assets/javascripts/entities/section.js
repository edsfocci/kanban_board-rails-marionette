KanbanBoard.module('Entities',
function(Entities, KanbanBoard, Backbone, Mn, $, _) {
  Entities.Section = Backbone.Model.extend({
    urlRoot: 'sections'
  });

  Entities.SectionCollection = Backbone.Collection.extend({
    url: 'sections',
    model: Entities.Section
  });

  var initializeSections = function(board) {
    var boardId = board.get('id');

    var sections = new Entities.SectionCollection([
      { 
        id: 0,
        title: 'To Do',
        card_order: board.get('card_order')[0],
        board_id: boardId
      },
      {
        id: 1,
        title: 'Doing',
        card_order: board.get('card_order')[1],
        board_id: boardId
      },
      {
        id: 2,
        title: 'Done',
        card_order: board.get('card_order')[2],
        board_id: boardId
      }
    ]);

    return sections;
  };

  var API = {
    getSectionEntities: function(board) {
      // return (new Entities.SectionCollection()).fetch();
      return initializeSections(board);
    },

    getSectionEntity: function(sectionId) {
      return (new Entities.Section({ id: sectionId })).fetch();
    }
  };

  KanbanBoard.reqres.setHandler('section:entities', function(board) {
    return API.getSectionEntities(board);
  });

  KanbanBoard.reqres.setHandler('section:entity', function(id) {
    return API.getSectionEntity(id);
  });
});
