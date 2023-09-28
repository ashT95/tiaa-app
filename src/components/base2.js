// SIMPLE DRAWING TEST FOR TESTING THE HAND/PERSON TRACKING

import React, { useState, useEffect, useRef } from "react";
import "./base.css";
import Window2 from "./windows/window2";

export default function Base2() {
	const [xVal, setXval] = useState(0);
	const [zVal, setZval] = useState(0);

	const [coords1, setCoords1] = useState([670, 1800]);
	const [coords2, setCoords2] = useState([80, 2200]);
	const [coords3, setCoords3] = useState([-570, 1800]);
	const [coords4, setCoords4] = useState([-1300, 3300]);
	const [coords5, setCoords5] = useState([-600, 2000]);

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

		let radius = 270; // radius of the mid-point circles

		ctx.strokeStyle = "white";
		// ctx.strokeRect(x0, y0, x1, y1)
		ctx.strokeRect(430, 330, 350, 390)
		ctx.strokeRect(740, 670, 350, 230)
		ctx.strokeRect(1020, 320, 410, 250)
		ctx.strokeRect(1270, 670, 330, 240)

		// drawCircle(430 + (350 / 2), 330 + (390 / 2), 10, ctx)
		// drawCircle(740 + (350 / 2), 670 + (230 / 2), 10, ctx)
		// drawCircle(1020 + (410 / 2), 320 + (250 / 2), 10, ctx)
		// drawCircle(1270 + (330 / 2), 670 + (240 / 2), 10, ctx)

		// ctx.font = "41px courier";
		// ctx.textBaseline = "top";
		// let text = `${xVal}, ${zVal}`;
		// ctx.strokeStyle = "red"
		// ctx.lineWidth = 15
		// ctx.fillText(text, 200, 400);

		if (coords1 !== null) {
			if (check_a_point(xVal, zVal, coords1[0], coords1[1], radius)) {
				setOne(true);
			}
		}
		if (coords2 !== null) {
			if (check_a_point(xVal, zVal, coords2[0], coords2[1], radius)) {
				setTwo(true);
			}
		}
		if (coords3 !== null) {
			if (check_a_point(xVal, zVal, coords3[0], coords3[1], radius)) {
				setThree(true);
			}
		}
		if (coords4 !== null) {
			if (check_a_point(xVal, zVal, coords4[0], coords4[1], radius)) {
				setFour(true);
			}
		}
		if (coords5 !== null) {
			if (check_a_point(xVal, zVal, coords5[0], coords5[1], radius)) {
				setFive(true);
			}
		}
	};

	function drawCircle(x, y, radius, ctx) {
		ctx.fillStyle = "#c82124";
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.closePath()
		ctx.fill()

		ctx.fillStyle = "";
		ctx.strokeStyle = "red"
		ctx.lineWidth = 5
		ctx.beginPath();
		ctx.arc(x, y, radius * 27, 0, 2 * Math.PI);
		ctx.closePath()
		ctx.stroke()


		// ctx.font = "21px courier";
		// ctx.textBaseline = "top";
		// let text = `${x}, ${y}`;
		// ctx.fillText(text, x, y);
	}

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
		<div className="background2">
			<Window2
				play1={one}
				setPlay1={setOne}
				play2={two}
				setPlay2={setTwo}
				play3={three}
				setPlay3={setThree}
				play4={four}
				setPlay4={setFour}
			/>
			<div>
				<canvas className="canvas2" ref={canvasRef} />
			</div>

		</div>
	);
}
