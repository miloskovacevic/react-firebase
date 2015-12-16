var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootUrl = 'https://react-firebase1.firebaseio.com/';
var Header = require('./Header');

var App = React.createClass({
  mixins: [ReactFire],

  componentWillMount: function(){
    //ova bindAsObject metoda je iz ReactFire API-ja...
    this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items');
  },

  render: function() {
    return (
          <div className="row panel panel-default">
            <div className="col-md-8 col-md-offset-2">
                <h2 className="text-center">
                    TO-DO LIST
                </h2>
                <Header  itemsStore={this.firebaseRefs.items} />
            </div>
          </div>
    );
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
