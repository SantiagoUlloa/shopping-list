import React from 'react';
import Todo from './Todo';
import './List.css'

const List = ({todos, remove}) => {
	let allTodos = [];

	if(todos.length > 0) {
		allTodos = todos.map(todo => {
			// passing todo and remove method reference
			return (<Todo todo={todo} remove={remove} />);
			//return (<p>{todo.value}</p>);
		});
	} else {
		allTodos.push(<h3 id="acu">There are no items in your list!</h3>);
	}

	return (
		<div id="list">
			<h4 id="info"> Your Items: </h4>
			{allTodos}
		</div>
	);
};

export default List;
