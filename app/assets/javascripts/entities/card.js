KanbanBoard.module('Entities',
function(Entities, KanbanBoard, Backbone, Mn, $, _) {
  Entities.Card = Backbone.Model.extend({
    urlRoot: 'cards',

    defaults: {
      title: ''
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
    getCardEntities: function(boardId) {
      var defer = $.Deferred();

      (new Entities.CardCollection()).fetch({
        data: { board_id: boardId },
        success: function(collection) {
          defer.resolve(collection);
        }
      });

      return defer.promise();

      // var cards = new Entities.CardCollection();
      // cards.fetch();
      // return cards;
    },

    getCardEntity: function(boardId, cardId) {
      return (new Entities.Card({ id: cardId, board_id: boardId })).fetch();
    }
  };

  KanbanBoard.reqres.setHandler('card:entities', function(boardId) {
    return API.getCardEntities(boardId);
  });

  KanbanBoard.reqres.setHandler('card:entity', function(boardId, id) {
    return API.getCardEntity(boardId, id);
  });
});