var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootUrl = 'https://react-firebase1.firebaseio.com/';
var Header = require('./Header');
var List = require('./List');

var App = React.createClass({
  mixins: [ReactFire],

  getInitialState: function(){
    return {
        items: {},
        loaded: false
    };
  },

  handleDataLoaded: function () {
    this.setState({
        loaded: true
    });
  },

  componentWillMount: function(){
    var fb = new Firebase(rootUrl + 'items/');
    //ova bindAsObject metoda je iz ReactFire API-ja...
    this.bindAsObject(fb, 'items');
    //ovim saljemo podatke na this.state.items...
    fb.on('value', this.handleDataLoaded);
  },

  render: function() {
    return (
          <div className="row panel panel-default">
            <div className="col-md-8 col-md-offset-2">
                <h2 className="text-center">
                    TO-DO LIST
                </h2>
                <Header  itemsStore={this.firebaseRefs.items} />
                <hr />
                <div className={ "content " +  (this.state.loaded ? 'loaded':'')}>
                  <List items={this.state.items} />
                </div>
            </div>
          </div>
    );
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
