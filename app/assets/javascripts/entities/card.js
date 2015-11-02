KanbanBoard.module('Entities',
function(Entities, KanbanBoard, Backbone, Mn, $, _) {
  Entities.Card = Backbone.Model.extend({
    urlRoot: 'cards',

    defaults: {
      title: '',
      section: undefined
    },

    validate: function(attrs, options) {
      var errors = {};

      if (!attrs.title) errors.title = "can't be blank";

      if (! _.isEmpty(errors)) return errors;
    }
  });

  Entities.CardCollection = Backbone.Collection.extend({
    url: 'cards',
    model: Entities.Card
  });

  var API = {
    getCardEntities: function(section) {
      var defer = $.Deferred();

      (new Entities.CardCollection()).fetch({
        data: {
          board_id: section.get('board_id'),
          section_id: section.get('id')
        },
        success: function(collection) {
          defer.resolve(collection);

          // defer.resolve(collection[sectionId]);
        }
      });

      return defer.promise();
    },

    getCardEntity: function(boardId, cardId) {
      return (new Entities.Card({ id: cardId, board_id: boardId })).fetch();
    }
  };

  KanbanBoard.reqres.setHandler('card:entities', function(section) {
    return API.getCardEntities(section);
  });

  KanbanBoard.reqres.setHandler('card:entity', function(boardId, id) {
    return API.getCardEntity(boardId, id);
  });
});