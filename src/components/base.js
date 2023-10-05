// SIMPLE DRAWING TEST FOR TESTING THE HAND/PERSON TRACKING

import React, { useState, useEffect, useRef } from "react";
import "./base.css";
import Window1 from "./windows/window1";

export default function Base() {
	const [xVal, setXval] = useState(0);
	const [zVal, setZval] = useState(0);

	const [coords1, setCoords1] = useState([1000, 2300]);
	const [coords2, setCoords2] = useState([35, 1600]);
	const [coords3, setCoords3] = useState([-20, 2500]);
	const [coords4, setCoords4] = useState([-1100, 2100]);
	const [coords5, setCoords5] = useState([-1300, 3400]);

	const [one, setOne] = useState(false);
	const [two, setTwo] = useState(false);
	const [three, setThree] = useState(false);
	const [four, setFour] = useState(false);
	const [five, setFive] = useState(false);

	const canvasRef = useRef(null);
	let numbers = [];

	window.ipcRender.receive("main-to-render", (result) => {
		//getting coordinates of users' hands

		if (String(result).startsWith("HAND:")) {
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

		let radius = 270

		ctx.strokeStyle = "white";
		ctx.strokeRect(350, 530, 250, 370)
		ctx.strokeRect(740, 330, 380, 310)
		ctx.strokeRect(740, 680, 450, 290)
		ctx.strokeRect(1130, 230, 470, 280)
		ctx.strokeRect(1210, 580, 410, 340)

		// drawCircle(350 + (250 / 2), 530 + (370 / 2), 10, ctx)
		// drawCircle(740 + (380 / 2), 330 + (310 / 2), 10, ctx)
		// drawCircle(740 + (450 / 2), 680 + (290 / 2), 10, ctx)
		// drawCircle(1130 + (470 / 2), 230 + (280 / 2), 10, ctx)
		// drawCircle(1210 + (410 / 2), 580 + (340 / 2), 10, ctx)
		
		ctx.font = "41px courier";
		ctx.textBaseline = "top";
		let text = `${xVal}, ${zVal}`;
		ctx.strokeStyle = "red"
		ctx.lineWidth = 15
		ctx.fillText(text, 200, 400);

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
