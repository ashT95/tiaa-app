// SIMPLE DRAWING TEST FOR TESTING THE HAND/PERSON TRACKING

import React, { useState, useEffect, useRef } from "react";
import "./base.css";
import Window1 from "./windows/window1";
import Window2 from "./windows/window2";
import Window3 from "./windows/window3";

export default function Base() {
	const [xVal, setXval] = useState(0);
	const [zVal, setZval] = useState(0);

	const [coords1, setCoords1] = useState([130, 980]);
	const [coords2, setCoords2] = useState(null);
	const [coords3, setCoords3] = useState(null);
	const [coords4, setCoords4] = useState(null);
	const [coords5, setCoords5] = useState(null);

	const [one, setOne] = useState(false);
	const [two, setTwo] = useState(false);
	const [three, setThree] = useState(false);
	const [four, setFour] = useState(false);
	const [five, setFive] = useState(false);

	const canvasRef = useRef(null);
	let numbers = [];

	window.ipcRender.receive("main-to-render", (result) => {
		//getting coordinates of users' hands

		if (String(result).startsWith("WINDOWONE:")) {
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

		if (coords1 !== null) {
			if (check_a_point(xVal, zVal, coords1[0], coords1[1], 250)) {
				setOne(true);
			}
		}
		if (coords2 !== null) {
			if (check_a_point(xVal, zVal, coords2[0], coords2[1], 250)) {
				setTwo(true);
			}
		}
		if (coords3 !== null) {
			if (check_a_point(xVal, zVal, coords3[0], coords3[1], 250)) {
				setThree(true);
			}
		}
		if (coords4 !== null) {
			if (check_a_point(xVal, zVal, coords4[0], coords4[1], 250)) {
				setFour(true);
			}
		}
		if (coords5 !== null) {
			if (check_a_point(xVal, zVal, coords5[0], coords5[1], 250)) {
				setFive(true);
			}
		}
	};

	function check_a_point(a, b, x, y, r) {
		var dist_points = (a - x) * (a - x) + (b - y) * (b - y);
		r *= r;
		if (dist_points < r) {
			return true;
		}
		return false;
	}

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
				<canvas className="canvas1" ref={canvasRef} />
			</div>
		</div>
	);
}
