// SIMPLE DRAWING TEST FOR TESTING THE HAND/PERSON TRACKING

import React, { useState, useEffect, useRef } from "react";
import "./base.css";


let average = 0;
let average2 = 0;

export default function Grid() {
	const [xVal, setXval] = useState(0);
	const [zVal, setZval] = useState(0);
	const [x, setX] = useState(0);
	const [z, setZ] = useState(0);
	const [selectedTile, setSelectedTile] = useState(null);

	const canvasRef = useRef(null);

	let numbers = [];
	let vals = [];
	let total = 0;
	let vals2 = [];
	let total2 = 0;
	let tileSize = 200;
	let lastTile;

	window.ipcRender.receive("main-to-render", (result) => {
		//getting coordinates of users' hands

		if (String(result).startsWith("X:")) {
			numbers = String(result).match(/-?\d+/g).map(Number);

			setXval(numbers[0]);
			setZval(numbers[2]);
			// console.log(numbers)
			setX(xVal)
			setZ(zVal)
		}

	

	});

	const draw = (canvasRef) => {
		const canvas = canvasRef.current;
		let ctx = canvas.getContext("2d");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		// converting to canvas x and y ranges

		let x1 = convertCoordinates(1900, -1900, 0, canvas.width, x);
		let y1 = convertCoordinates(1000, 3000, 0, canvas.height, z);
		// drawGrid(canvas, ctx, tileSize, tileNum);

		// const tileX = ~~(x1 / tileSize);
		// const tileY = ~~(y1 / tileSize);
		// const tileNum = Math.round(tileX + (canvas.width / tileSize) * tileY);
		// setSelectedTile(tileNum)

		// if (tileNum !== lastTile) {
		// 	lastTile = tileNum;
		// 	ctx.clearRect(0, 0, canvas.width, canvas.height);
		// 	drawGrid(canvas, ctx, tileSize, tileNum);
		// }
		// lastTile = -1;

		ctx.strokeStyle = "red"
		ctx.strokeRect(x1, y1, 200, 200)

        
	};

	function drawGrid(canvas, ctx, tileSize, highlightNum) {
		let boxes = Math.floor(canvas.width / tileSize);

		for (let y = 0; y < boxes; y++) {
			for (let x = 0; x < boxes; x++) {
				const parity = (x + y) % 2;
				const tileNum = Math.round(x + (canvas.width / tileSize) * y);
				const xx = x * tileSize;
				const yy = y * tileSize;

				if (tileNum === highlightNum) {
					ctx.fillStyle = "#f0f";
				} else {
					ctx.fillStyle = parity ? "#555" : "#ddd";
				}

				ctx.fillRect(xx, yy, tileSize, tileSize);
				ctx.fillStyle = parity ? "#fff" : "#000";
				ctx.font = "21px courier";
				ctx.textBaseline = "top";
				ctx.fillText(tileNum, xx, yy);
			}
		}
	}

	function convertCoordinates(oldMin, oldMax, newMin, newMax, oldValue) {
		let oldRange = oldMax - oldMin;
		let newRange = newMax - newMin;

		let newValue = ((oldValue - oldMin) * newRange) / oldRange + newMin;
		return newValue;
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
		<div className="background">
			<div className="track">
				<canvas className="canvas" ref={canvasRef} />
			</div>
      
		</div>
	);
}
