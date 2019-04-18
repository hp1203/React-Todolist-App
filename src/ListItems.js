import React from 'react';

const ListItem = (props) => {
    return <li className="list-group-item">
    {props.item.name}
    
    <button 
      type="button" 
      className="right-btn btn btn-default" 
      aria-label="Close"
      onClick={props.deleteTodo}
    >
      <span aria-hidden="true"><i className="fas fa-trash"></i></span>
    </button>
    <button 
      type="button" 
      className="right-btn btn btn-default" 
      aria-label="Close"
      onClick={props.editTodo}
    >
      <span aria-hidden="true"><i className="fas fa-edit"></i></span>
    </button>
    </li>;
};

export default ListItem;