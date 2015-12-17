var React = require('react');
var rootUrl = 'https://react-firebase1.firebaseio.com/';
var Firebase = require('firebase');


var ListItem = React.createClass({
    getInitialState: function(){
        return {
            text: this.props.item.text,
            done: this.props.item.done
        };
    },

    componentWillMount: function () {
      this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key );
    },

    handleDoneChange: function (e) {
        var update = { done: e.target.checked };
        //apdejt lokalnog stejta...
        this.setState(update);
        //apdejt Firebase-a...
        this.fb.update(update);
    },

    render: function () {
        return (
            <div className="input-group">
                <span className = "input-group-addon">
                    <input type="checkbox" onChange={this.handleDoneChange} checked={this.state.done} />
                </span>
                <input type="text"
                    className="form-control"
                    value={this.state.text}
                    />
                <span className="input-group-btn">
                    <button className="btn btn-default">Delete</button>
                </span>
            </div>

        );
    }
});

module.exports = ListItem;

