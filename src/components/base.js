// SIMPLE DRAWING TEST FOR TESTING THE HAND/PERSON TRACKING

import React, { useState, useEffect, useRef } from "react";
import "./base.css";

import Window1 from "./windows/window1";

export default function Base() {
	const [result, setResult] = useState("none");
	const [one, setOne] = useState(false);
	const [two, setTwo] = useState(false);
	const [three, setThree] = useState(false);
	const [four, setFour] = useState(false);
	const [five, setFive] = useState(false);

	const [presence1, setPresence1] = useState(false);
	const [presence2, setPresence2] = useState(false);
	const [presence3, setPresence3] = useState(false);
	const [presence4, setPresence4] = useState(false);
	const [presence5, setPresence5] = useState(false);

	const canvasRef = useRef(null);
	let numbers = [];

	window.ipcRender.receive("main-to-render", (result) => {
		//getting coordinates of users' hands

		if (result === "play1") {
			!one ? setOne(true) : null
		}
		if (result === "play2") {
			!two ? setTwo(true) : null
		}
		if (result === "play3") {
			!three ? setThree(true) : null
		}
		if (result === "play4") {
			!four ? setFour(true) : null
		}
		if (result === "play5") {
			!five ? setFive(true) : null
		}

		if (result === "prox1") {
			!presence1 ? setPresence1(true) : null
		}
		if (result === "prox2") {
			!presence2 ? setPresence2(true) : null
		}
		if (result === "prox3") {
			!presence3 ? setPresence3(true) : null
		}
		if (result === "prox4") {
			!presence4 ? setPresence4(true) : null
		}
		if (result === "prox5") {
			!presence5 ? setPresence5(true) : null
		}

		
	});

	const draw = (canvasRef) => {
		const canvas = canvasRef.current;
		let ctx = canvas.getContext("2d");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;


	};


	useEffect(() => {
		let animationFrameId;
		let interval;

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
