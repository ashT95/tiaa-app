// SIMPLE DRAWING TEST FOR TESTING THE HAND/PERSON TRACKING

import React, { useState, useEffect, useRef } from "react";
import "./base.css";

import Window1 from "./windows/window1";

export default function Base() {
	const [xVal, setXval] = useState(0);
	const [yVal, setYval] = useState(0)
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
			setYval(numbers[1])
			setZval(numbers[2]);
			// console.log(numbers)
		}
	});

	const draw = (canvasRef) => {
		const canvas = canvasRef.current;
		let ctx = canvas.getContext("2d");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		if (xVal >= 800 && xVal < 1500 && zVal >= 1700 && zVal < 2600) {
			setOne(true)
		}
		if (xVal >= 50 && xVal < 200 && zVal >= 1200 && zVal < 2100) {
			setTwo(true)
		}
		if (xVal >= -100 && xVal < 150 && zVal >= 2100 && zVal < 2600) {
			setThree(true)
		}
		if (xVal >= -1000 && xVal < -900 && zVal >= 1500 && zVal < 2200) {
			setFour(true)
		}
		if (xVal >= -1400 && xVal < -1000 && zVal >= 2000 && zVal < 2600) {
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
		<div className="background1">
			<Window1
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
				<canvas className="canvas1" ref={canvasRef} />
			</div>

		</div>
	);
}
