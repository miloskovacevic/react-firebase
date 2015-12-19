var React = require('react');
var ListItem = require('./ListItem');
var List = React.createClass({
    renderList: function () {
        if(!this.props.items){
            return <h4>Add a TO to get started</h4>;
        }else{

            var children = [];

            for(var k in this.props.items){
                var item = this.props.items[k];
                item.key = k;
                children.push(
                   <ListItem
                       item={item}
                       key={k}
                       />
                );
            }
            return children;
        }
    },

    render: function(){
        console.log(this.props);
        return (
            <div>
                {this.renderList()}
            </div>
        );
    }
});

module.exports = List;