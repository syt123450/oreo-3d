import React, { Component } from 'react';
import '../style/Localization.css';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import LocalizedStrings from 'react-localization';

import enIcon from '../assets/img/en_icon.jpg';
import zhIcon from '../assets/img/zh_icon.jpg';

let strings = new LocalizedStrings({
	en:{
		OneMore: "Order",
		OrderNow: "Order",
		WaitAMinute: "Wait",
		O: "O",
		Re: "Re",
		And: "And",
		Sub: "Remove",
		Menu: "Menu",
		Courtesy: "Can I have a",
		ExportLabel: "Export",
		textO: "O",
		textRe: "RE",
		textAnd: "+"
	},
	zh: {
		OneMore: "再点一单",
		OrderNow: "马上下单",
		WaitAMinute: "考虑一下",
		O: "奥",
		Re: "利",
		And: "与",
		Sub: "减一",
		Menu: "菜单",
		Courtesy: "给我来一个",
		ExportLabel: "打包带走",
		textO: "奥",
		textRe: "利",
		textAnd: "+"
	}
});

strings.setLanguage('zh');

class Localization extends Component{

	state = {
		language: 2
	};

	languages = [
		{
			value: 1,
			label: 'English',
			img: enIcon
		},
		{
			value: 2,
			label: '中文',
			img: zhIcon
		}
	];

	handleLanguageChange = (value) => {
		if (value === 1) {
			strings.setLanguage('en');
		} else if (value === 2) {
			strings.setLanguage('zh');
		}
		this.setState({language: value});
		this.triggerRefresh();
	};

	triggerRefresh = () => {
		const refreshComponents = this.props.refreshComponents;
		for (let i = 0; i < refreshComponents.length; i ++) {
			refreshComponents[i].current.refresh();
		}
	};

	render(){

		const customItem = function (item) {
			return (
				<div className={"selector-item"}>
					<img src={item.img}
						 className={"selector-item-image"}
						 alt={"language icon"}/>
					<div className={"selector-item-content"}>
						{item.label}
					</div>
				</div>
			);
		};

		return(
			<div className={"language-selector"}>
				<Dropdown
					auto={false}
					source={this.languages}
					onChange={this.handleLanguageChange}
					template={customItem}
					value={this.state.language}
				/>
			</div>
		)
	}
}

export { Localization, strings };