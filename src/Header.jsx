var React = require('react');

var Header = React.createClass({
    getInitialState: function(){
        return {
            text: ''
        };
    },

    handleClick: function () {
        var itemValue = this.state.text;
        this.props.itemsStore.push({
            text: itemValue,
            done: false
        });

        this.setState({
            text: ''
        });
    },
    handleInputChange: function(e){
        this.setState({
            text: e.target.value
        });
    },

    render: function () {
        return (
            <div className="input-group">
                <input
                    value={this.state.text}
                    onChange={this.handleInputChange}
                    type="text" className="form-control" />
                <span className="input-group-btn">
                    <button
                        onClick={this.handleClick}
                        className="btn btn-default" type="button">
                        Dodaj
                    </button>
                </span>
                <span>{this.props.stanje}</span>
            </div>
        );
    }

});

module.exports = Header;