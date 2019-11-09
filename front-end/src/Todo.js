import React from 'react';
import './Todo.css'

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
				<button class="btn btn-danger btn-sm">x</button>
			</span>
		</p>
	);
};

export default Todo;
