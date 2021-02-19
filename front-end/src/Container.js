import React, { Component } from 'react';
import Title from './Title';
import Form from './Form';
import List from './List';
import Footer from './Footer';
import Todo from './Todo';
import './Container.css'


// Contaner Component
// Todo Id
class Container extends Component {
	constructor(props) {
		super(props);

		const introData = [
			{
				id: -3,
				value: "Eggs"
			},
			{
				id: -2,
				value: "Cereal"
			},
			{
				id: -1,
				value: "Milk"
			}
		];

		const localData = localStorage.todos && JSON.parse(localStorage.todos);

		this.state = {
				data: localData || introData
			};

		// binding methods
		this.addTodo = this.addTodo.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
	}
	// Handler to update localStorage
	updateLocalStorage() {
		if (typeof(Storage) !== "undefined")
			localStorage.todos = JSON.stringify(this.state.data);
	}
	// Handler to add todo
	addTodo(val) {
		let id;
		// if localStorage is available then increase localStorage count
		// else use global window object's id variable
		if (typeof(Storage) !== "undefined") {
			id = Number(localStorage.count);
			localStorage.count = Number(localStorage.count) + 1;
		} else {
			id = window.id++;
		}

		const todo = {
			value: val,
			id: id
		};

		this.state.data.push(todo);
		// update state
		this.setState({
			data: this.state.data
		}, () => {
			// update localStorage
			this.updateLocalStorage();
		});
	}
	// Handler to remove todo
	removeTodo(id) {
		// filter out the todo that has to be removed
		const list = this.state.data.filter(todo => {
			if (todo.id !== id)
				return todo;
		});
		// update state
		this.setState({
			data: list
		}, () => {
			// update localStorage
			this.updateLocalStorage();
		});
	}

	componentDidMount() {
		localStorage.clear();
		if (typeof(Storage) !== "undefined") {
			if(!localStorage.todos) {
				localStorage.todos = JSON.stringify(this.state.data);
			}
			if(!localStorage.count) {
				localStorage.count = 0;
			}

		} else {
			 console.log("App will not remember todos created as LocalStorage is not available");
			window.id = 0;
		}
	}

	render() {
		return (
			<div id="container">
				<Title />
				<Form addTodo={this.addTodo} />
				<List todos={this.state.data} remove={this.removeTodo} />
				<Footer />
			</div>
		);
	}
}


export default Container;
