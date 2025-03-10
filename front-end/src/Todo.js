import React from 'react';
import './Todo.css'
import DeleteIcon from '@material-ui/icons/Delete';

const Todo = ({todo, remove}) => {
	return (
		<div className="todos">
			<div className="todo-content">
				<span className="todo-text">{todo.name}</span>
			</div>
			<button
				className="removeBtn"
				onClick={() => remove(todo.id)}
				aria-label="Delete item"
			>
				<DeleteIcon className="delete-icon" />
			</button>
		</div>
	);
};

export default Todo;
