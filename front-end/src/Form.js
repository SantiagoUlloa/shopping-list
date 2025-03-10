import React, { Component } from 'react';
import './Form.css'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';



class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleNewTodoAddition = this.handleNewTodoAddition.bind(this);
	}

	handleChange(event) {
		this.setState({
			value: event.target.value
		});
	}

	handleNewTodoAddition() {
		if(this.input.value !== '') {
			this.props.addTodo(this.input.value);
			this.setState({
				value: ''
			});
			this.input.placeholder = "Add items here...";
		}
	}

	render() {
		return (
			<div id="form">
				<input className="item-input"
					ref={node => {
						this.input = node;
					}}
					value={this.state.value}
					placeholder="Add items here..."
					autocomplete="off"
					onChange={this.handleChange}
				/>

				<div className="add-icon-wrapper">
					<AddShoppingCartIcon 
						className="add-icon" 
						style={{ fontSize: '28px' }}
						onClick={this.handleNewTodoAddition}
					/>
				</div>
			</div>
		);
	}
}

export default Form;
