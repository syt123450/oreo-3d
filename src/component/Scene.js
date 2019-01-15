import React, { Component } from 'react';
import '../style/Scene.css';
import * as THREE from 'three';
let STLLoader = require('three-stl-loader')(THREE);
let TrackballControls = require('three-trackballcontrols');

class Scene extends Component{

	componentDidMount(){

		const width = this.mount.clientWidth;
		const height = this.mount.clientHeight;

		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 0x72645b );
		this.scene.fog = new THREE.Fog( 0x72645b, 2, 15 );

		this.camera = new THREE.PerspectiveCamera(
			35,
			width / height,
			1,
			15
		);
		this.camera.position.set( 0, 3, 3 );
		this.camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.gammaInput = true;
		this.renderer.gammaOutput = true;
		this.renderer.shadowMap.enabled = true;
		this.renderer.setSize(width, height);
		this.mount.appendChild(this.renderer.domElement);

		let plane = new THREE.Mesh(
			new THREE.PlaneBufferGeometry( 40, 40 ),
			new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
		);
		plane.rotation.x = - Math.PI / 2;
		plane.position.y = - 0.5;
		this.scene.add( plane );
		plane.receiveShadow = true;

		this.scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
		this.addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
		this.addShadowedLight( 0.5, 1, - 1, 0xffaa00, 1 );
		this.addShadowedLight( 0, 1, -0.5, 0xffaa00, 1 );
		this.addShadowedLight( 0, -1, -0.5, 0xffaa00, 1 );

		let reGeometry = new THREE.CylinderBufferGeometry( 0.8, 0.8, 0.1, 32 );
		let reMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, shininess: 200 } );
		this.reMesh = new THREE.Mesh( reGeometry, reMaterial );

		this.ingredients = [];

		let loader = new STLLoader();
		let material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x111111, shininess: 200 } );
		loader.load( './model/oreo_fixed.stl', function ( geometry ) {

			this.oMesh = new THREE.Mesh( geometry, material );
			this.createOreo([1, 2, 1]);

		}.bind(this) );

		this.controls = new TrackballControls( this.camera );

		this.controls.rotateSpeed = 1.0;
		this.controls.zoomSpeed = 1.2;
		this.controls.panSpeed = 0.8;
		this.controls.noZoom = false;
		this.controls.noPan = false;
		this.controls.staticMoving = true;
		this.controls.dynamicDampingFactor = 0.3;
		this.controls.keys = [ 65, 83, 68 ];
		this.controls.addEventListener( 'change', this.render );

		window.addEventListener( 'resize', this.onWindowResize, false );

		this.animate();

	}

	animate = () => {
		window.requestAnimationFrame(this.animate);
		this.renderScene();
		this.controls.update();
	};

	renderScene = () => {
		this.renderer.render(this.scene, this.camera)
	};

	onWindowResize = () => {
		this.camera.aspect = this.mount.clientWidth / this.mount.clientHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( this.mount.clientWidth, this.mount.clientHeight );
	};

	addShadowedLight = ( x, y, z, color, intensity ) => {
		let directionalLight = new THREE.DirectionalLight( color, intensity );
		directionalLight.position.set( x, y, z );
		this.scene.add( directionalLight );
		directionalLight.castShadow = true;
		let d = 1;
		directionalLight.shadow.camera.left = - d;
		directionalLight.shadow.camera.right = d;
		directionalLight.shadow.camera.top = d;
		directionalLight.shadow.camera.bottom = - d;
		directionalLight.shadow.camera.near = 1;
		directionalLight.shadow.camera.far = 4;
		directionalLight.shadow.mapSize.width = 1024;
		directionalLight.shadow.mapSize.height = 1024;
		directionalLight.shadow.bias = - 0.002;
	};

	createOreo = ( contentList ) => {

		this.disposeOreo();

		let bottom = 0;

		for ( let i = 0; i < contentList.length; i ++ ) {
			let content = contentList[ contentList.length - 1 - i ];
			if (content === 1) {
				bottom = this.createO(i, bottom);
			} else if (content === 2) {
				bottom = this.createRe(i, bottom);
			} else if (content === 3) {
				bottom = this.createAnd(i, bottom);
			}
		}

	};

	disposeOreo = () => {

		for ( let i = 0; i < this.ingredients.length; i ++ ) {

			this.scene.remove(this.ingredients[i]);

		}

		this.ingredients = [];

	};

	createO = (index, bottom) => {

		let o1 = this.oMesh.clone();

		o1.position.set( 0, bottom, 0 );

		let rotation;
		if (index === 0) {
			rotation = Math.PI / 2;
		} else {
			rotation = - Math.PI / 2;
		}

		o1.rotation.set( rotation, 0, 0 );
		o1.scale.set( 0.0005, 0.0005, 0.001 );
		o1.castShadow = true;
		o1.receiveShadow = true;

		this.ingredients.push(o1);

		this.scene.add( o1 );

		if (index !== 0) {
			bottom += 0.2;
		}

		return bottom;

	};

	createRe = (index, bottom) => {

		let re1 = this.reMesh.clone();
		re1.position.set(0, bottom + 0.05, 0);
		this.scene.add( re1 );

		this.ingredients.push(re1);

		bottom += 0.101;

		return bottom;

	};

	createAnd = (index, bottom) => {

		bottom += 0.1;

		return bottom;

	};

	render(){
		return(
			<div className={"oreo-container"}
				 ref={(mount) => { this.mount = mount }}
			/>
		)
	}
}

export default Scene;