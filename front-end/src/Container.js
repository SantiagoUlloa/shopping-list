import React, { Component } from 'react';
import Title from './Title';
import Form from './Form';
import List from './List';
import Footer from './Footer';
import { todoService } from './api/todoService';
import './Container.css'


// Contaner Component
// Todo Id
class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loading: true,
			error: null,
			tempError: null
		};

		this.addTodo = this.addTodo.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
		this.clearTempError = this.clearTempError.bind(this);
	}

	clearTempError() {
		this.setState({ tempError: null });
	}

	setTempError(message) {
		this.setState({ tempError: message });
		setTimeout(this.clearTempError, 3000); // Clear after 3 seconds
	}

	async componentDidMount() {
		try {
			// Check if token exists
			const token = localStorage.getItem('token');
			if (!token) {
				this.setState({ 
					error: 'No authentication token found. Please log in.', 
					loading: false 
				});
				return;
			}

			const todos = await todoService.getTodos();
			this.setState({ data: todos, loading: false });
		} catch (error) {
			console.error('Error details:', error);
			const errorMessage = error.message || 'Failed to load todos';
			this.setState({ 
				error: `Error: ${errorMessage}. ${!localStorage.getItem('token') ? 'No token found.' : 'Token exists.'}`,
				loading: false 
			});
		}
	}

	async addTodo(val) {
		try {
			const newTodo = await todoService.addTodo({ name: val });
			this.setState(prevState => ({
				data: [...prevState.data, newTodo],
				tempError: null
			}));
		} catch (error) {
			this.setTempError(error.message || 'Failed to add todo');
		}
	}

	async removeTodo(id) {
		try {
			const result = await todoService.deleteTodo(id);
			if (result) {
				this.setState(prevState => ({
					data: prevState.data.filter(todo => todo.id !== id),
					tempError: null
				}));
			}
		} catch (error) {
			console.error('Delete error:', error);
			this.setTempError(error.message || 'Failed to delete todo');
			// Refresh the list to ensure UI is in sync with server
			try {
				const todos = await todoService.getTodos();
				this.setState({ data: todos });
			} catch (refreshError) {
				console.error('Refresh error:', refreshError);
			}
		}
	}

	render() {
		const { data, loading, error, tempError } = this.state;

		if (loading) {
			return <div id="container">Loading...</div>;
		}

		if (error) {
			return <div id="container">Error: {error}</div>;
		}

		return (
			<div id="container">
				<Title />
				{tempError && (
					<div className="temp-error">
						{tempError}
					</div>
				)}
				<Form addTodo={this.addTodo} />
				<List todos={data} remove={this.removeTodo} />
				<Footer />
			</div>
		);
	}
}


export default Container;
