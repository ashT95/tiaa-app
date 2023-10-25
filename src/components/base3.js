import React, { useState, useEffect, useRef } from "react";
import "./base.css";

import empoweringAbilities0 from "../assets/Animations/_ProjectionLoopsSmaller/BLACKBG_EMPOWERING ABILITIES_PROJECTION_SMALLER_10182023.mp4";
import empoweringAbilities1 from "../assets/Animations/_AnimationsWithSound/EMPOWERING ABILITIES_SOUND.mp4";

import financialLiteracy0 from "../assets/Animations/_ProjectionLoopsSmaller/BLACKBG_FINANCIAL WELLNESS_PROJECTION_SMALLER_10182023.mp4";
import financialLiteracy1 from "../assets/Animations/_AnimationsWithSound/FINANCIAL WELLNESS_SOUND.mp4";

import girlsInTech0 from "../assets/Animations/_ProjectionLoopsSmaller/BLACKBG_FUTURE LEADERS_PROJECTION_SMALLER_10182023.mp4";
import girlsInTech1 from "../assets/Animations/_AnimationsWithSound/FUTURE LEADERS_SOUND.mp4";

import ceoLoop0 from "../assets/Animations/_ProjectionLoopsSmaller/BLACKBG_CEO_CLIFTON LOOP_PROJECTION_SMALLER_10182023.mp4";
import ceoWipe0 from "../assets/Animations/_AnimationsWithSound/CEOs1_SOUND.mp4";
import ceoLoop1 from "../assets/Animations/_ProjectionLoopsSmaller/BLACKBG_CEO_THASUNDA LOOP_PROJECTION_SMALLER_10182023.mp4";
import ceoWipe1 from "../assets/Animations/_AnimationsWithSound/CEOs2_SOUND.mp4";
import ceoGlowLoop from "../assets/Animations/Groundbreaking-CEOs/Masked_BLACK BG_GLOWING CIRCLE FRAME LOOP_10052023.mp4";

import retiringInequality0 from "../assets/Animations/_ProjectionLoopsSmaller/BLACKBG_RETIRING INEQUALITY_PROJECTION_SMALLER_10182023.mp4";
import retiringInequality1 from "../assets/Animations/_AnimationsWithSound/RETIRING INEQUALITY_SOUND.mp4";
import retiringInequalityLoop1 from "../assets/Animations/_Miscellaneous/BlackBG_RETIREMENT SIGN_Retiring Inequality Loops_10032023.mp4";
import retiringInequalityLoop2 from "../assets/Animations/_Miscellaneous/BLACKBG_ROCKS FALL_Retiring INequaltiy_10032023.mp4";

import rocket1 from "../assets/Animations/Girls-in-Tech/BlackBG_GIRLS IN TECH_AIRPLANE_FULL WALL3_10042023.mp4";
import catLoop from "../assets/Animations/Girls-in-Tech/BlackBG_Cat_WALL 3_10092023.mp4";
import canyonBird from "../assets/Animations/_Miscellaneous/BlackBG_CanyonBird_10062023.mp4";

import proxVid1 from "../assets/Animations/Proximity/proximity-popup_B.mp4";
import proxVid2 from "../assets/Animations/Proximity/proximity-popup_C.mp4";
import proxVid3 from "../assets/Animations/Proximity/proximity-popup_D.mp4";
import proxVid4 from "../assets/Animations/Proximity/proximity-popup_E.mp4";
import proxVid5 from "../assets/Animations/Proximity/proximity-popup_G.mp4";

import layout3 from "../assets/Images/wall-3-print.png";

export default function Base3() {
	const [financialLiteracy, setFinancialLiteracy] = useState(false);
	const [empoweringAbilities, setEmpoweringAbilities] = useState(false);
	const [girlsInTech, setGirlsInTech] = useState(false);
	const [retiringInequality, setRetiringInequality] = useState(false);
	const [loop0, setLoop0] = useState(true);
	const [loop1, setLoop1] = useState(false);
	const [wipe0, setWipe0] = useState(false);
	const [wipe1, setWipe1] = useState(false);

	const [rocket, setRocket] = useState(false);

	const [presence1, setPresence1] = useState(false);
	const [presence2, setPresence2] = useState(false);
	const [presence3, setPresence3] = useState(false);
	const [presence4, setPresence4] = useState(false);
	const [presence5, setPresence5] = useState(false);

	let data = require("../../config.json");
	let camData = require("../../camConfig.json");

	const [l1, setL1] = useState(Number(data["Wall3Animation1"]["left"]));
	const [l2, setL2] = useState(Number(data["Wall3Animation2"]["left"]));
	const [l3, setL3] = useState(Number(data["Wall3Animation3"]["left"]));
	const [l4, setL4] = useState(Number(data["Wall3Animation4"]["left"]));
	const [l5, setL5] = useState(Number(data["Wall3Animation5"]["left"]));

	const [t1, setT1] = useState(Number(data["Wall3Animation1"]["top"]));
	const [t2, setT2] = useState(Number(data["Wall3Animation2"]["top"]));
	const [t3, setT3] = useState(Number(data["Wall3Animation3"]["top"]));
	const [t4, setT4] = useState(Number(data["Wall3Animation4"]["top"]));
	const [t5, setT5] = useState(Number(data["Wall3Animation5"]["top"]));

	const defaultVals = [55, 277, 477, 19, 554, 311, 1038, 20, 1116, 336];
	const defaultCamVals = [0.12, 0.32, 0.49, 0.56];

	const [count, setCount] = useState(1);
	const [showBg, setShowBg] = useState(false);

	const videoRefs = useRef([]);

	const [anim3topLeft, setAnim3topLeft] = useState(
		Number(camData["anim_topLeft3_y"].replace(/[^0-9\.]+/g, ""))
	);
	const [anim3bottomRight, setAnim3bottomRight] = useState(
		Number(camData["anim_bottomRight3_y"].replace(/[^0-9\.]+/g, ""))
	);
	
	const [audioOutput, setAudioOutput] = useState(null);

	window.ipcRender.receive("main-to-render", (result) => {
		//getting coordinates of users' hands
		handleInteraction(result);
	});

	const getAudioDevs = async () => {
		await navigator.mediaDevices
			.enumerateDevices()
			.then((devices) => {
				devices.forEach((device) => {
					// console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
					if (device.deviceId == 'e5c10d868b2c6b3118ff27f9b9ad7e1c34ad2e524692088b2e15ee3d455ba4c2') {
						setAudioOutput(device.deviceId);
						console.log(audioOutput);
						// 7144f4561d79cbeb7758d8c8233f00577e4d9d2132689a380399285f248ebe6d
					}
				});
			})
			.catch((err) => {
				console.error(`${err.name}: ${err.message}`);
			});
	};

	getAudioDevs();

	useEffect(() => {
		videoRefs.current[10].volume = 0;
		videoRefs.current[11].volume = 0;
		videoRefs.current[12].volume = 0;
		videoRefs.current[13].volume = 0;
		videoRefs.current[14].volume = 0;

		if (presence1) {
			!wipe1 && !wipe0 ? videoRefs.current[10].play() : null;
		}
		if (presence2) {
			!girlsInTech ? videoRefs.current[11].play() : null;
		}
		if (presence3) {
			!empoweringAbilities ? videoRefs.current[12].play() : null;
		}
		if (presence4) {
			!financialLiteracy ? videoRefs.current[13].play() : null;
		}
		if (presence5) {
			!retiringInequality ? videoRefs.current[14].play() : null;
		}

		if (wipe0) {
			setPresence1(false);
			videoRefs.current[5].play();
		}
		if (loop1) {
			videoRefs.current[6].play();
		}
		if (loop0) {
			videoRefs.current[7].play();
		}
		if (wipe1) {
			setPresence1(false);
			videoRefs.current[8].play();
		}

		if (girlsInTech) {
			setPresence2(false);
			if (!videoRefs.current[1].isPlaying) {
				videoRefs.current[1].play();
			}
		} else if (!girlsInTech) {
			videoRefs.current[1].currentTime = 0;
		}
		if (empoweringAbilities) {
			setPresence3(false);
			if (!videoRefs.current[2].isPlaying) {
				videoRefs.current[2].play();
			}
		} else if (!empoweringAbilities) {
			videoRefs.current[2].currentTime = 0;
		}
		if (financialLiteracy) {
			setPresence4(false);
			if (!videoRefs.current[3].isPlaying) {
				videoRefs.current[3].play();
			}
		} else if (!financialLiteracy) {
			videoRefs.current[3].currentTime = 0;
		}
		if (retiringInequality) {
			setPresence5(false);
			if (!videoRefs.current[4].isPlaying) {
				videoRefs.current[4].play();
			}
		} else if (!retiringInequality) {
			videoRefs.current[4].currentTime = 0;
		}

		if (rocket) {
			if (!videoRefs.current[9].isPlaying) {
				videoRefs.current[9].play();
			}
		} else if (!rocket) {
			videoRefs.current[9].currentTime = 0;
		}
	}, [
		presence1,
		presence2,
		presence3,
		presence4,
		presence5,
		financialLiteracy,
		empoweringAbilities,
		girlsInTech,
		retiringInequality,
		loop0,
		loop1,
		wipe0,
		wipe1,
		rocket,
	]);

	useEffect(() => {
		if (audioOutput) {
			videoRefs.current[1].setSinkId(audioOutput);
			videoRefs.current[2].setSinkId(audioOutput);
			videoRefs.current[3].setSinkId(audioOutput);
			videoRefs.current[4].setSinkId(audioOutput);
			videoRefs.current[5].setSinkId(audioOutput);
		}
	}, [audioOutput]);

	function handleInteraction(name) {
		switch (name) {
			case "prox10": {
				!presence1 ? setPresence1(true) : null;
				break;
			}
			case "prox11": {
				!presence2 ? setPresence2(true) : null;
				break;
			}
			case "prox12": {
				!presence3 ? setPresence3(true) : null;
				break;
			}
			case "prox13": {
				!presence4 ? setPresence4(true) : null;
				break;
			}
			case "prox14": {
				!presence5 ? setPresence5(true) : null;
				break;
			}

			case "play10": {
				setPresence1(false);
				if (loop0) {
					//loop 0
					setLoop0(false);
					setWipe0(true);
				} else if (loop1) {
					// loop 1
					setLoop1(false);
					setWipe1(true);
				}
				break;
			}
			case "play111": {
				setWipe0(false);
				setLoop1(true);

				break;
			}
			case "play112": {
				setWipe1(false);
				setLoop0(true);
			}
			case "play11": {
				setPresence2(false);
				setGirlsInTech(true);
				setRocket(true);
				break;
			}
			case "play12": {
				setPresence3(false);
				setEmpoweringAbilities(true);
				break;
			}
			case "play13": {
				setPresence4(false);
				setFinancialLiteracy(true);
				break;
			}
			case "play14": {
				setPresence5(false);
				setRetiringInequality(true);
				break;
			}
		}
	}

	window.addEventListener(
		"keydown",
		function (event) {
			const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

			switch (key) {
				case "Tab": {
					if (count == 1) setCount(2);
					if (count == 2) setCount(3);
					if (count == 3) setCount(4);
					if (count == 4) setCount(5);
					if (count == 5) setCount(1);
					break;
				}
				case "ArrowLeft": {
					if (count == 1) {
						let temp = l1 - 1;
						setL1(temp);
					}
					if (count == 2) {
						let temp = l2 - 1;
						setL2(temp);
					}
					if (count == 3) {
						let temp = l3 - 1;
						setL3(temp);
					}
					if (count == 4) {
						let temp = l4 - 1;
						setL4(temp);
					}
					if (count == 5) {
						let temp = l5 - 1;
						setL5(temp);
					}
					break;
				}
				case "ArrowRight": {
					if (count == 1) {
						let temp = l1 + 1;
						setL1(temp);
					}
					if (count == 2) {
						let temp = l2 + 1;
						setL2(temp);
					}
					if (count == 3) {
						let temp = l3 + 1;
						setL3(temp);
					}
					if (count == 4) {
						let temp = l4 + 1;
						setL4(temp);
					}
					if (count == 5) {
						let temp = l5 + 1;
						setL5(temp);
					}
					break;
				}
				case "ArrowUp": {
					if (count == 1) {
						let temp = t1 - 1;
						setT1(temp);
					}
					if (count == 2) {
						let temp = t2 - 1;
						setT2(temp);
					}
					if (count == 3) {
						let temp = t3 - 1;
						setT3(temp);
					}
					if (count == 4) {
						let temp = t4 - 1;
						setT4(temp);
					}
					if (count == 5) {
						let temp = t5 - 1;
						setT5(temp);
					}
					break;
				}
				case "ArrowDown": {
					if (count == 1) {
						let temp = t1 + 1;
						setT1(temp);
					}
					if (count == 2) {
						let temp = t2 + 1;
						setT2(temp);
					}
					if (count == 3) {
						let temp = t3 + 1;
						setT3(temp);
					}
					if (count == 4) {
						let temp = t4 + 1;
						setT4(temp);
					}
					if (count == 5) {
						let temp = t5 + 1;
						setT5(temp);
					}
					break;
				}
				case "ArrowDown": {
					if (count == 1) {
						let temp = t1 + 1;
						setT1(temp);
					}
					if (count == 2) {
						let temp = t2 + 1;
						setT2(temp);
					}
					if (count == 3) {
						let temp = t3 + 1;
						setT3(temp);
					}
					if (count == 4) {
						let temp = t4 + 1;
						setT4(temp);
					}
					if (count == 5) {
						let temp = t5 + 1;
						setT5(temp);
					}
					break;
				}
				case " ": {
					setShowBg(!showBg);
					break;
				}
				case "Enter": {
					window.ipcRender.send("render-to-main", [
						"wall3",
						l1,
						t1,
						l2,
						t2,
						l3,
						t3,
						l4,
						t4,
						l5,
						t5,
					]);
					break;
				}
				case "p": {
					setL1(defaultVals[0]);
					setT1(defaultVals[1]);
					setL2(defaultVals[2]);
					setT2(defaultVals[3]);
					setL3(defaultVals[4]);
					setT3(defaultVals[5]);
					setL4(defaultVals[6]);
					setT4(defaultVals[7]);
					setL5(defaultVals[8]);
					setT5(defaultVals[9]);
					window.ipcRender.send("render-to-main", [
						"wall3",
						l1,
						t1,
						l2,
						t2,
						l3,
						t3,
						l4,
						t4,
						l5,
						t5,
					]);
					break;
				}
				case "w": {
					let temp1 = anim3topLeft - 0.01;
					let temp2 = anim3bottomRight - 0.01;
					setAnim3topLeft(temp1);
					setAnim3bottomRight(temp2);
					window.ipcRender.send("render-to-main", [
						"cam3",
						anim3topLeft,
						anim3bottomRight,
					]);
					break;
				}
				case "s": {
					let temp1 = anim3topLeft + 0.01;
					let temp2 = anim3bottomRight + 0.01;
					setAnim3topLeft(temp1);
					setAnim3bottomRight(temp2);
					window.ipcRender.send("render-to-main", [
						"cam3",
						anim3topLeft,
						anim3bottomRight,
					]);
					break;
				}
				case "8": {
					setAnim3topLeft(defaultCamVals[2]);
					setAnim3bottomRight(defaultCamVals[3]);
					window.ipcRender.send("render-to-main", [
						"cam3",
						anim3topLeft,
						anim3bottomRight,
					]);
					break;
				}
			}
		},
		{ once: true }
	);

	return (
		<div className="background3">
			{showBg && (
				<div className="layout">
					<img src={layout3} alt="bg" />
				</div>
			)}
			{!showBg && (
				<div>
					<video
						src={proxVid1}
						key="proximityLoop31"
						id="proximityLoop31"
						preload="auto"
						ref={(el) => (videoRefs.current[10] = el)}
						onEnded={() => setPresence1(false)}
						hidden={presence1 ? false : true}
					/>
					<video
						src={proxVid2}
						key="proximityLoop32"
						id="proximityLoop32"
						preload="auto"
						ref={(el) => (videoRefs.current[11] = el)}
						onEnded={() => setPresence2(false)}
						hidden={presence2 ? false : true}
					/>
					<video
						src={proxVid3}
						key="proximityLoop33"
						id="proximityLoop33"
						preload="auto"
						ref={(el) => (videoRefs.current[12] = el)}
						onEnded={() => setPresence3(false)}
						hidden={presence3 ? false : true}
					/>
					<video
						src={proxVid4}
						key="proximityLoop34"
						id="proximityLoop34"
						preload="auto"
						ref={(el) => (videoRefs.current[13] = el)}
						onEnded={() => setPresence4(false)}
						hidden={presence4 ? false : true}
					/>
					<video
						src={proxVid5}
						key="proximityLoop35"
						id="proximityLoop35"
						preload="auto"
						ref={(el) => (videoRefs.current[14] = el)}
						onEnded={() => setPresence5(false)}
						hidden={presence5 ? false : true}
					/>

					{/* interaction videos */}

					<video
						src={rocket1}
						key={rocket1}
						id={"rocket"}
						preload="auto"
						autoPlay={false}
						loop={false}
						ref={(el) => (videoRefs.current[9] = el)}
						hidden={rocket ? false : true}
						onEnded={() => setRocket(false)}
					/>

					<video
						src={canyonBird}
						key={canyonBird}
						id={"canyonBird"}
						preload="auto"
						autoPlay
						loop
					/>

					<video
						src={catLoop}
						key={catLoop}
						id={"catLoop"}
						preload="auto"
						autoPlay
						loop
					/>
					<video
						src={girlsInTech0}
						key={girlsInTech0}
						id={"girlsInTech"}
						preload="auto"
						autoPlay
						loop
						onMouseEnter={() => setPresence2(true)}
						style={{
							transform: `translate(${l2}px, ${t2}px)`,
						}}
						onClick={() => handleInteraction("play11")}
					/>
					<video
						src={girlsInTech1}
						key={girlsInTech1}
						id={"girlsInTech"}
						preload="auto"
						autoPlay={false}
						loop={false}
						ref={(el) => (videoRefs.current[1] = el)}
						hidden={girlsInTech ? false : true}
						onEnded={() => setGirlsInTech(false)}
						style={{
							transform: `translate(${l2}px, ${t2}px)`,
						}}
					/>
					<video
						src={financialLiteracy0}
						key={financialLiteracy0}
						id={"financialLiteracy"}
						preload="auto"
						autoPlay
						loop
						hidden={financialLiteracy ? true : false}
						onMouseEnter={() => setPresence4(true)}
						style={{
							transform: `translate(${l4}px, ${t4}px)`,
						}}
					/>
					<video
						src={financialLiteracy1}
						key={financialLiteracy1}
						id={"financialLiteracy"}
						preload="auto"
						autoPlay={false}
						loop={false}
						ref={(el) => (videoRefs.current[3] = el)}
						hidden={financialLiteracy ? false : true}
						onEnded={() => setFinancialLiteracy(false)}
						style={{
							transform: `translate(${l4}px, ${t4}px)`,
						}}
					/>
					<video
						src={empoweringAbilities0}
						key={empoweringAbilities0}
						id={"empoweringAbilities"}
						preload="auto"
						autoPlay
						loop
						hidden={empoweringAbilities ? true : false}
						onMouseEnter={() => setPresence3(true)}
						style={{
							transform: `translate(${l3}px, ${t3}px)`,
						}}
					/>
					<video
						src={empoweringAbilities1}
						key={empoweringAbilities1}
						id={"empoweringAbilities"}
						preload="auto"
						autoPlay={false}
						loop={false}
						ref={(el) => (videoRefs.current[2] = el)}
						hidden={empoweringAbilities ? false : true}
						onEnded={() => setEmpoweringAbilities(false)}
						style={{
							transform: `translate(${l3}px, ${t3}px)`,
						}}
					/>
					<video
						src={ceoGlowLoop}
						key={ceoGlowLoop}
						id={"ceoGlowLoop"}
						preload="auto"
						autoPlay
						loop
						style={{
							transform: `translate(${l1}px, ${t1}px)`,
						}}
					/>
					<video
						src={ceoLoop0}
						key={ceoLoop0}
						id={"groundbreakingCEOs"}
						preload="auto"
						autoPlay={false}
						loop
						ref={(el) => (videoRefs.current[7] = el)}
						hidden={loop0 ? false : true}
						onMouseEnter={() => setPresence1(true)}
						onClick={() => handleInteraction("play10")}
						style={{
							transform: `translate(${l1}px, ${t1}px)`,
						}}
					/>
					<video
						src={ceoWipe0}
						key={ceoWipe0}
						id={"groundbreakingCEOs"}
						preload="auto"
						autoPlay={false}
						loop={false}
						ref={(el) => (videoRefs.current[5] = el)}
						hidden={wipe0 ? false : true}
						onEnded={() => handleInteraction("play111")}
						style={{
							transform: `translate(${l1}px, ${t1}px)`,
						}}
					/>
					<video
						src={ceoLoop1}
						key={ceoLoop1}
						id={"groundbreakingCEOs"}
						preload="auto"
						autoPlay={false}
						loop
						ref={(el) => (videoRefs.current[6] = el)}
						hidden={loop1 ? false : true}
						onMouseEnter={() => setPresence1(true)}
						onClick={() => handleInteraction("play10")}
						style={{
							transform: `translate(${l1}px, ${t1}px)`,
						}}
					/>
					<video
						src={ceoWipe1}
						key={ceoWipe1}
						id={"groundbreakingCEOs"}
						preload="auto"
						autoPlay={false}
						loop={false}
						ref={(el) => (videoRefs.current[8] = el)}
						hidden={wipe1 ? false : true}
						onEnded={() => handleInteraction("play112")}
						style={{
							transform: `translate(${l1}px, ${t1}px)`,
						}}
					/>
					<video
						src={retiringInequalityLoop1}
						key={retiringInequalityLoop1}
						id={"retiringInequality"}
						preload="auto"
						autoPlay
						loop
						style={{
							transform: `translate(${l5}px, ${t5}px)`,
						}}
					/>
					<video
						src={retiringInequalityLoop2}
						key={retiringInequalityLoop2}
						id={"retiringInequality"}
						preload="auto"
						autoPlay
						loop
						style={{
							transform: `translate(${l5}px, ${t5}px)`,
						}}
					/>
					<video
						src={retiringInequality0}
						key={retiringInequality0}
						id={"retiringInequality"}
						preload="auto"
						autoPlay
						loop
						hidden={retiringInequality ? true : false}
						onMouseEnter={() => setPresence5(true)}
						style={{
							transform: `translate(${l5}px, ${t5}px)`,
						}}
					/>
					<video
						src={retiringInequality1}
						key={retiringInequality1}
						id={"retiringInequality"}
						preload="auto"
						autoPlay={false}
						loop={false}
						ref={(el) => (videoRefs.current[4] = el)}
						hidden={retiringInequality ? false : true}
						onEnded={() => setRetiringInequality(false)}
						style={{
							transform: `translate(${l5}px, ${t5}px)`,
						}}
					/>
				</div>
			)}
		</div>
	);
}
