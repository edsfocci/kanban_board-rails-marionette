KanbanBoard.module('CardsApp.Common.Views',
function(Views, KanbanBoard, Backbone, Mn, $, _) {
  Views.Form = Mn.ItemView.extend({
    template: '#card-form',

    events: {
      'click js-card-submit': 'submitClicked'
    },

    submitClicked: function(e) {
      e.preventDefault();
      var data = Backbone.Syphon.serialize(this);
      this.trigger('form:submit', data);
    },

    onShow: function() {
      this.$el.dialog({
        modal: true,
        title: this.title,
        width: 'auto'
      });
    },

    onFormDataInvalid: function(errors) {
      var $view = this.$el;

      var clearFormErrors = function() {
        $view.find('.help-block').each(function() { this.remove(); });

        var controlGroupHasError = $view.find('.control-group.has-error');
        for (var i = 0; i < controlGroupHasError.length, i++)
          controlGroupHasError[i].removeClass('has-error');
      };

      var markErrors = function(value, key) {
        var $controlGroup = $view.find('#card-' + key).parent();
        var $errorEl = $('<span>', { class: 'help-block', text: value });

        $controlGroup.append($errorEl).addClass('has-error');
      };

      clearFormErrors();
      _.each(errors, markErrors);
    }
  });
});
