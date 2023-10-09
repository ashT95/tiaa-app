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

	const [personX, setPersonX] = useState(0);
	const [personY, setPersonY] = useState(0);
	const [personZ, setPersonZ] = useState(0);

	const [presence1, setPresence1] = useState(false);
	const [presence2, setPresence2] = useState(false);
	const [presence3, setPresence3] = useState(false);
	const [presence4, setPresence4] = useState(false);
	const [presence5, setPresence5] = useState(false);

	const canvasRef = useRef(null);
	let numbers = [];

	window.ipcRender.receive("main-to-render", (result) => {
		//getting coordinates of users' hands

		if (String(result).startsWith("HAND:")) {
			numbers = String(result).match(/-?\d+/g).map(Number);

			setXval(numbers[0]);
			// setYval(numbers[1])
			setZval(numbers[2]);
			// console.log(numbers)
		}

		if (String(result).startsWith("PERSON:")) {
			numbers = String(result).match(/-?\d+/g).map(Number);

			setPersonX(numbers[0]);
			// setPersonY(numbers[1])
			setPersonZ(numbers[2]);

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

		// if (personX >= 800 && personX < 1500 && personZ >= 1700 && personZ < 2600) {
		// 	setPresence1(true)
		// }
		// if (personX >= 50 && personX < 200 && personZ >= 1200 && personZ < 2100) {
		// 	setPresence2(true)
		// }
		// if (personX >= -100 && personX < 150 && personZ >= 2100 && personZ < 2600) {
		// 	setPresence3(true)
		// }
		// if (personX >= -1000 && personX < -900 && personZ >= 1500 && personZ < 2200) {
		// 	setPresence4(true)
		// }
		// if (personX >= -1400 && personX < -1000 && personZ >= 2000 && personZ < 2600) {
		// 	setPresence5(true)
		// }
		
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

				presence1={presence1}
				setPresence1={setPresence1}
				presence2={presence2}
				setPresence2={setPresence2}
				presence3={presence3}
				setPresence3={setPresence3}
				presence4={presence4}
				setPresence4={setPresence4}
				presence5={presence5}
				setPresence5={setPresence5}
			/>
			<div>
				<canvas className="canvas1" ref={canvasRef} />
			</div>

		</div>
	);
}
