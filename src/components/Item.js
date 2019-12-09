import React from 'react';

const itemTypeMap = {
  "TextField": "text"
}

const Item = (props) => {
  const {item, onChange} = props;
  const {label, type, name} = item;
  return <div> 
    <label>
      {label}
      <input
        type={itemTypeMap[type]}
        key={name}
        name={name}
        ref={(key)=>{this[name] = key}}
        onChange={e => {
          onChange(e, name);
        }}
      />
    </label>
  </div>
}

export default Item;