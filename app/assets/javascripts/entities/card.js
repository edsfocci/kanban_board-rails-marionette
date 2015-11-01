KanbanBoard.module('Entities',
function(Entities, KanbanBoard, Backbone, Mn, $, _) {
  Entities.Card = Backbone.Model.extend({
    urlRoot: 'cards',

    validate: function(attrs, options) {
      var errors = {};

      if (!attrs.title) errors.title = "can't be blank";

      if (! _isEmpty(errors)) return errors;
    }
  });

  Entities.CardCollection = Backbone.Collection.extend({
    url: 'cards',
    model: Entities.Card
  });

  var API = {
    getCardEntities: function() {

    },

    getCardEntity: function(cardId) {

    }
  };

  KanbanBoard.reqres.setHandler('card:entities', function() {
    API.getCardEntities();
  });

  KanbanBoard.reqres.setHandler('card:entity', function(id) {
    API.getCardEntity(id);
  });
});