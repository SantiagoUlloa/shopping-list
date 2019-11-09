import React from 'react';
import './Todo.css'
import Icon from '@material-ui/core/Icon';

const Todo = ({todo, remove}) => {
	// single todo
	return (
		<p className="todos">
			{todo.value}
			<span
				className="removeBtn"
				onClick={()=> {
					remove(todo.id)
				}}>
				<Icon className="delete-icon">delete</Icon>
			</span>
		</p>
	);
};

export default Todo;
