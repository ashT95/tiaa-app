// SIMPLE DRAWING TEST FOR TESTING THE HAND/PERSON TRACKING

import React, { useState, useEffect, useRef } from "react";
import "./base.css";

import Window3 from "./windows/window3";

export default function Base3() {
	const [xVal, setXval] = useState(0);
	const [zVal, setZval] = useState(0);

	const [one, setOne] = useState(false);
	const [two, setTwo] = useState(false);
	const [three, setThree] = useState(false);
	const [four, setFour] = useState(false);
	const [five, setFive] = useState(false);

	const canvasRef = useRef(null);
	let numbers = [];

	window.ipcRender.receive("main-to-render", (result) => {
		//getting coordinates of users' hands

		if (String(result).startsWith("X:")) {
			numbers = String(result).match(/-?\d+/g).map(Number);

			setXval(numbers[0]);
			setZval(numbers[2]);
			// console.log(numbers)
		}
	});

	const draw = (canvasRef) => {
		const canvas = canvasRef.current;
		let ctx = canvas.getContext("2d");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		if (xVal >= 700 && xVal < 1500 && zVal >= 1700 && zVal < 2700) {
			setOne(true)
		}
		if (xVal >= 100 && xVal < 400 && zVal >= 2100 && zVal < 2400) {
			setTwo(true)
		}
		if (xVal >= 200 && xVal < 400 && zVal >= 1300 && zVal < 2100) {
			setThree(true)
		}
		if (xVal >= -1400 && xVal < -900 && zVal >= 2100 && zVal < 2400) {
			setFour(true)
		}
		if (xVal >= -800 && xVal < -500 && zVal >= 1300 && zVal < 1600) {
			setFive(true)
		}

		
	};

	
	useEffect(() => {
		let animationFrameId;

		const render = () => {
			draw(canvasRef);
			animationFrameId = window.requestAnimationFrame(render);
		};

		render();
		return () => {
			window.cancelAnimationFrame(animationFrameId);

		};
	}, [draw]);

	return (
		<div className="background3">
			<Window3
				play1={one}
				setPlay1={setOne}
				play2={two}
				setPlay2={setTwo}
				play3={three}
				setPlay3={setThree}
				play4={four}
				setPlay4={setFour}
				play5={five}
				setPlay5={setFive}
			/>
			<div>
				<canvas className="canvas3" ref={canvasRef} />
			</div>

		</div>
	);
}
