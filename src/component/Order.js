import React, { Component } from 'react';
import '../style/Order.css';
import Button from 'react-toolbox/lib/button/Button';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Avatar from 'react-toolbox/lib/avatar/Avatar';
import Chip from 'react-toolbox/lib/chip/Chip';
import Input from 'react-toolbox/lib/input/Input';
import { strings } from "./Localization";

class Order extends Component{

	state = {
		active: true,
		menuText: ""
	};

	constructor(props) {
		super(props);
		this.itemList = [1, 2, 1];
	}

	componentDidMount(){
		this.generateMenuText();
	}

	generateMenuText = () => {
		let menuText = "";
		for (let i = 0; i < this.itemList.length; i ++) {
			if (this.itemList[i] === 1) {
				menuText += strings.textO;
			} else if (this.itemList[i] === 2) {
				menuText += strings.textRe;
			} else if (this.itemList[i] === 3) {
				menuText += strings.textAnd;
			}
		}
		this.setState({
			menuText: menuText
		});
	};

	handleToggle = () => {
		this.setState({active: !this.state.active});
	};

	addO = () => {
		this.itemList.push(1);
		this.generateMenuText();
	};

	addRe = () => {
		this.itemList.push(2);
		this.generateMenuText();
	};

	addAnd = () => {
		this.itemList.push(3);
		this.generateMenuText();
	};

	removeOne = () => {
		this.itemList.pop();
		this.generateMenuText();
	};

	refresh = () => {
		this.setState({});
		this.generateMenuText();
	};

	handleOrder = () => {
		this.props.scene.current.createOreo(this.itemList);
		this.handleToggle();
	};

	render(){

		const actions = [
			{
				label: strings.OrderNow,
				className: "submit-order",
				onClick: this.handleOrder
			},
			{
				label: strings.WaitAMinute,
				className: "cancel-order",
				onClick: this.handleToggle
			}
		];

		return(
			<div>
				<Button className={"order-button"}
						icon='map'
						label={strings.OneMore}
						raised
						accent
						onClick={this.handleToggle.bind(this)}/>
				<Dialog
					actions={actions}
					active={this.state.active}
					onEscKeyDown={this.handleToggle}
					onOverlayClick={this.handleToggle}
					className={"order-dialog"}
				>
					<p className="menu-title">{strings.Courtesy}</p>
					<Input className={"menu-result"}
						   type='text'
						   label={strings.Menu}
						   disabled
						   value={this.state.menuText} />
					<Chip className={"menu-item"}>
						<Avatar className={"add-icon"}
								icon="add"
								onClick={this.addO}/>
						<span className={"add-item-name"}>{strings.O}</span>
					</Chip>
					<Chip className={"menu-item"}>
						<Avatar className={"add-icon"}
								icon="add"
								onClick={this.addRe}/>
						<span className={"add-item-name"}>{strings.Re}</span>
					</Chip>
					<Chip className={"menu-item"}>
						<Avatar className={"add-icon"}
								icon="add"
								onClick={this.addAnd}/>
						<span className={"add-item-name"}>{strings.And}</span>
					</Chip>
					<Chip className={"menu-item"}>
						<Avatar className={"remove-icon"}
								icon="remove"
								onClick={this.removeOne}/>
						<span className={"sub-item-name"}>{strings.Sub}</span>
					</Chip>
				</Dialog>
			</div>
		)
	}
}

export default Order;