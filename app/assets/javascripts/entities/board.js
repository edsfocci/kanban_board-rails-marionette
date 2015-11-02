KanbanBoard.module('Entities',
function(Entities, KanbanBoard, Backbone, Mn, $, _) {
  Entities.Board = Backbone.Model.extend({
    urlRoot: 'boards'
  });

  Entities.BoardCollection = Backbone.Collection.extend({
    url: 'boards',
    model: Entities.Board
  });

  var API = {
    getBoardEntities: function() {
      return (new Entities.BoardCollection()).fetch();
    },

    getBoardEntity: function(boardId) {
      var defer = $.Deferred();

      (new Entities.Board({ id: boardId })).fetch({
        success: function(model) {
          defer.resolve(model);
        }
      });

      return defer.promise();
    }
  };

  KanbanBoard.reqres.setHandler('board:entities', function() {
    return API.getBoardEntities();
  });

  KanbanBoard.reqres.setHandler('board:entity', function(id) {
    return API.getBoardEntity(id);
  });
});
