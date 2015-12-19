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
    this.fb = new Firebase(rootUrl + 'items/');
    //ova bindAsObject metoda je iz ReactFire API-ja...
    this.bindAsObject(this.fb, 'items');
    //ovim saljemo podatke na this.state.items...
    this.fb.on('value', this.handleDataLoaded);
  },

  deleteButtonHtml: function () {
    if(!this.state.loaded){
        return null;
    } else {
        return <div className="text-center clear-complete">
                  <hr/>
                  <button className="btn btn-deafult" type="button" onClick={this.deleteAllChecked}>Clear Complete</button>
               </div>
    }
  },

  deleteAllChecked: function () {
    for(var key in this.state.items) {
        if(this.state.items[key].done === true){
            this.fb.child(key).remove();
        }
    }
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
                 {this.deleteButtonHtml()}
                </div>
            </div>
          </div>
    );
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
