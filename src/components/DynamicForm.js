import React from 'react';
import Item from './Item';

class DynamicForm extends React.Component {
  state = {};
  constructor(props) {
    super(props);
  }

  onSubmit = () => {
    // Replace data with composing your form data
    const data = this.state;
    this.props.onSubmit(data); // dont edit this line
  };

  onChange = (e, key) => {
    this.setState(
      {
        [key]: e.target.value
      }
    );
  }

  renderItems = (items) => {
    return items.map((item) => {
      return <Item item={item} key={item.name} onChange={this.onChange}/>
    })
  }

  render() {
    const config = this.props.config;
    const items = (config && config.items) || [];
    return (
      <form>
        {this.renderItems(items)}
        <button onClick={this.onSubmit}>Submit</button>
      </form>
    );
  }
}

export default DynamicForm;