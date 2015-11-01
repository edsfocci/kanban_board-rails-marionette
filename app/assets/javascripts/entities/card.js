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
    getCardEntities: function() {
      var defer = $.Deferred();

      (new Entities.CardCollection()).fetch({
        success: function(collection) {
          defer.resolve(collection);
        }
      });

      return defer.promise();

      // var cards = new Entities.CardCollection();
      // cards.fetch();
      // return cards;
    },

    getCardEntity: function(cardId) {
      return (new Entities.Card({ id: cardId })).fetch();
    }
  };

  KanbanBoard.reqres.setHandler('card:entities', function() {
    return API.getCardEntities();
  });

  KanbanBoard.reqres.setHandler('card:entity', function(id) {
    return API.getCardEntity(id);
  });
});