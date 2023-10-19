// SIMPLE DRAWING TEST FOR TESTING THE HAND/PERSON TRACKING

import React, { useState, useEffect, useRef } from "react";
import "./base.css";


export default function Calibration() {
	const [xVal, setXval] = useState(0);
	const [zVal, setZval] = useState(0);
	const [counter, setCounter] = useState(1);
	const [endCounter, setEndCounter] = useState(0);

	const [pointX, setPointX] = useState(0);
	const [pointY, setPointY] = useState(0);

	const [coords1, setCoords1] = useState(null);
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

		let x0 = 350;
		let y0 = 320;
		let x1 = 1270;
		let y1 = 740;

		ctx.strokeStyle = "white";
		ctx.fillStyle = "white";
		ctx.stroke();
		ctx.strokeRect(x0, y0, x1, y1)
		ctx.fillText(`${xVal}, ${zVal}`, 1670, 600 )

		// left line is (x0, y0) to (x0, y1)
		let midLeft = y0 + (y1 / 2)
		let midTop = x0 + (x1 / 2)
		drawCircle(350, 230, 5, ctx)
		drawCircle(1620, 230, 5, ctx)
		drawCircle(350, 970, 5, ctx)
		drawCircle(1620, 970, 5, ctx)
		// converting to canvas x and y ranges

		// let pX = convertCoordinates(250, -250, 0, canvas.width, xVal);
		// let pY = convertCoordinates(900, 1250, 0, canvas.height, zVal);


		// setPointX(pX);
		// setPointY(pY);

		// drawCircle(pX, pY, 20, ctx);


	};

	function check_a_point(a, b, x, y, r) {
		var dist_points = (a - x) * (a - x) + (b - y) * (b - y);
		r *= r;
		if (dist_points < r) {
			return true;
		}
		return false;
	}

	function drawCircle(x, y, radius, ctx) {
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.strokeStyle = "white";
		ctx.fillStyle = "white";
		ctx.stroke();

		ctx.font = "21px courier";
		ctx.textBaseline = "top";
		let text = `${x}, ${y}`;
		ctx.fillText(text, x, y);
	}

	function convertCoordinates(oldMin, oldMax, newMin, newMax, oldValue) {
		let oldRange = oldMax - oldMin;
		let newRange = newMax - newMin;

		let newValue = ((oldValue - oldMin) * newRange) / oldRange + newMin;
		return newValue;
	}

	function handleClick() {
		let temp1 = pointX;
		let temp2 = pointY;

		if (counter === 1) {
			setCoords1([temp1, temp2]);
			setCounter((counter) => (counter += 1));
		} else if (counter === 2) {
			setCoords2([temp1, temp2]);
			setCounter((counter) => (counter += 1));
		} else if (counter === 3) {
			setCoords3([temp1, temp2]);
			setCounter((counter) => (counter += 1));
		} else if (counter === 4) {
			setCoords4([temp1, temp2]);
			setCounter((counter) => (counter += 1));
		} else if (counter === 5) {
			setCoords5([temp1, temp2]);
			setCounter((counter) => (counter += 1));
		} else if (counter > 5) {
			setCoords1(null);
			setCoords2(null);
			setCoords3(null);
			setCoords4(null);
			setCoords5(null);
			setCounter((counter) => (counter = 1));
		}
	}

	useEffect(() => {
		let animationFrameId;

		const render = () => {
			draw(canvasRef);
			animationFrameId = window.requestAnimationFrame(render);
		};

		if (coords1 !== null) {
			if (check_a_point(pointX, pointY, coords1[0], coords1[1], 250)) {
				setOne(true);
			}
		}
		if (coords2 !== null) {
			if (check_a_point(pointX, pointY, coords2[0], coords2[1], 250)) {
				setTwo(true);
			}
		}
		if (coords3 !== null) {
			if (check_a_point(pointX, pointY, coords3[0], coords3[1], 250)) {
				setThree(true);
			}
		}
		if (coords4 !== null) {
			if (check_a_point(pointX, pointY, coords4[0], coords4[1], 250)) {
				setFour(true);
			}
		}
		if (coords5 !== null) {
			if (check_a_point(pointX, pointY, coords5[0], coords5[1], 250)) {
				setFive(true);
			}
		}

		render();
		return () => {
			window.cancelAnimationFrame(animationFrameId);

		};
	}, [draw]);

	return (
		<div className="background1">

			<Window1 play1={one} play2={two} play3={three} play4={four} play5={five} />
			<div>
				<button className="done-button" onClick={() => handleClick()}>
					Done
				</button>
				<canvas className="canvas1" ref={canvasRef} />

			</div>


		</div>
	);
}
