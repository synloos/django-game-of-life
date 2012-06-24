// The lowest level component, a single cell on the game board.
var Cell = Backbone.Model.extend({
});

// A collection of cells.
var Cells = Backbone.Collection.extend({
  model: Cell
});

// The view for each cell.
var CellView = Backbone.View.extend({
  tagName: "div",
  className: "cell",
  event: {
    "click": "openDialog",
  },

  render: function() {
    // Replace with better render function.
    $(this.el).html('<div class="cell"></div>');
  },

  openDialog: function() {
    // Replace with dialog box for modifying cell
  },
});

/*
 *  Commented till I know what is going on with backbone
 *
// A wrapper for the Cells Collection which represents a row of cells.
var Row = Backbone.Model.extend({
  initialize: function() {
    this.cells = new Cells;
    this.cells.url = '/asdfasdf/';
    this.cells.on("reset", this.updateCounts);
  },
});

// A collection of rows whic make up the game board.
var Board = Backbone.Collection.extend({
  model: Row
});

var BoardView = Backbone.Collection.extend({
  tagName: "div",
  className: "board",
  render: function() {
    // render the game board
  }
});
*/

//
// Ajax Send CSRF Protection
// https://docs.djangoproject.com/en/dev/ref/contrib/csrf/
//
$(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});
