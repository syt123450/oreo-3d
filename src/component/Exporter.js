import React, { Component } from 'react';
import '../style/Exporter.css';
import Button from 'react-toolbox/lib/button/Button';
import GLTFExporter from 'three-gltf-exporter';
import { strings } from "./Localization";

class Exporter extends Component{

	exportScene = ()=> {
		let exportedScene = this.props.scene.current.scene;
		var gltfExporter = new GLTFExporter();

		gltfExporter.parse( exportedScene, function ( result ) {

			var output = JSON.stringify( result, null, 2 );

			var link = document.createElement( 'a' );
			link.style.display = 'none';
			document.body.appendChild( link );
			link.href = window.URL.createObjectURL( new Blob( [ output ], { type: 'text/plain' } ) );
			link.download = 'oreo.gltf';
			link.click();

		} );
	};

	refresh = () => {
		this.setState({});
	};

	render(){
		return(
			<div>
				<Button className={"exporter-button"}
						icon='get_app'
						label={strings.ExportLabel}
						raised
						accent
						onClick={this.exportScene.bind(this)}/>
			</div>
		)
	}
}

export default Exporter;