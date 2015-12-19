var React = require('react');
var rootUrl = 'https://react-firebase1.firebaseio.com/';
var Firebase = require('firebase');


var ListItem = React.createClass({
    getInitialState: function(){
        return {
            text: this.props.item.text,
            done: this.props.item.done,
            textChanged: false
        };
    },

    componentWillMount: function () {
    //ovim smo vezali ovaj todo item...
      this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key );
    },

    handleDoneChange: function (e) {
        var update = { done: e.target.checked };
        //apdejt lokalnog stejta...
        this.setState(update);
        //apdejt Firebase-a...
        this.fb.update(update);
    },
    handleDeleteClick: function () {
      this.fb.remove();
    },
    handleTextChange: function(e){
        this.setState({
            text: e.target.value,
            textChanged: true
        });
    },

    changesButtons: function () {
      if(!this.state.textChanged){
          return null;
      }
      else {
        return [
                    <button onClick={this.handleSave} className="btn btn-default">Save</button>,
                    <button onClick={this.handleUndo} className="btn btn-default">Undo</button>
               ];
      }
    },

    handleSave: function () {
        var update = {text: this.state.text};
        this.fb.update(update);

        this.setState({
            textChanged: false
        });
    },

    handleUndo: function () {
        this.setState({
            text: this.props.item.text,
            textChanged: false
        });
    },

    render: function () {
        return (
            <div className="input-group">
                <span className = "input-group-addon">
                    <input type="checkbox"  onChange={this.handleDoneChange} checked={this.state.done} />
                </span>
                <input type="text"
                    disabled={this.state.done}
                    className="form-control"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                    />
                <span className="input-group-btn">
                    {this.changesButtons()}
                    <button onClick={this.handleDeleteClick} className="btn btn-default">Delete</button>
                </span>
            </div>

        );
    }
});

module.exports = ListItem;

