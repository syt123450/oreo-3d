import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';

class Metas extends Component {
	render() {
		return (
			<div>
				<MetaTags>
					<meta name="description" content="沙雕 3D 奥利奥" />
					<meta name="viewport" content="width = device-width, initial-scale =1.0, maximum-scale = 1.0, user-scalable = no" />
				</MetaTags>
			</div>
		)
	}
}

export default Metas;