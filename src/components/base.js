import React, { useState, useEffect, useRef } from "react";
import "./base.css";

import notJustForTeachers0 from "../assets/Animations/_ProjectionLoopsSmaller/BLACKBG_NOT JUST TEACHERS_PROJECTION_SMALLER_10182023.mp4";
import notJustForTeachers1 from "../assets/Animations/_AnimationsWithSound/NOT JUST TEACHERS_SOUND.mp4";

import foundedOnPrinciple0 from "../assets/Animations/_ProjectionLoopsSmaller/BLACKBG_FOUNDED ON PRINCIPLE_PROJECTION_SMALLER_10182023.mp4";
import foundedOnPrinciple1 from "../assets/Animations/_AnimationsWithSound/FOUNDED ON PRINCIPLE_SOUND.mp4";

import ratedOneOfTheHighest0 from "../assets/Animations/_ProjectionLoopsSmaller/BLACKBG_RATED ONE OF THE HIGHEST_PROJECTION_SMALLER_10182023.mp4";
import ratedOneOfTheHighest1 from "../assets/Animations/_AnimationsWithSound/RATED ONE OF THE HIGHEST_SOUND.mp4";

import wereOnAMission0 from "../assets/Animations/_ProjectionLoopsSmaller/BLACKBG_WE ARE ON A MISSION_PROJECTION_SMALLER_10182023.mp4";
import wereOnAMission1 from "../assets/Animations/_AnimationsWithSound/WE R ON A MISSION_SOUND.mp4";

import neverMissACheck0 from "../assets/Animations/_ProjectionLoopsSmaller/BLACKBG_NEVER MISS A CHECK_PROJECTION_SMALLER_10182023.mp4";
import neverMissACheck1 from "../assets/Animations/_AnimationsWithSound/NEVER MISS A CHECK_SOUND.mp4";

import butterfly1 from "../assets/Animations/_Miscellaneous/BLACK BG_WALL 1_CHCK_BUTTERFLY_10162023.mp4";
import lawnMower1 from "../assets/Animations/_Miscellaneous/BLACK BG_WALL 1_TEACHERS_LAWNMOWER_10162023.mp4";

import proxVid1 from "../assets/Animations/Proximity/proximity-popup_B.mp4";
import proxVid2 from "../assets/Animations/Proximity/proximity-popup_C.mp4";
import proxVid3 from "../assets/Animations/Proximity/proximity-popup_D.mp4";
import proxVid4 from "../assets/Animations/Proximity/proximity-popup_E.mp4";
import proxVid5 from "../assets/Animations/Proximity/proximity-popup_G.mp4";

import layout1 from "../assets/Images/wall-1-print.png";

export default function Base() {
	const [notJustForTeachers, setNotJustForTeachers] = useState(false);
	const [foundedOnPrinciple, setFoundedOnPrinciple] = useState(false);
	const [check, setCheck] = useState(false);
	const [mission, setMission] = useState(false);
	const [ratedHighest, setRatedHighest] = useState(false);

	const [butterfly, setButterfly] = useState(false);

	const [presence1, setPresence1] = useState(false);
	const [presence2, setPresence2] = useState(false);
	const [presence3, setPresence3] = useState(false);
	const [presence4, setPresence4] = useState(false);
	const [presence5, setPresence5] = useState(false);

	const [audioOutput, setAudioOutput] = useState(null);

	let data = require("../../config.json");

	const [l1, setL1] = useState(Number(data["Wall1Animation1"]["left"]));
	const [l2, setL2] = useState(Number(data["Wall1Animation2"]["left"]));
	const [l3, setL3] = useState(Number(data["Wall1Animation3"]["left"]));
	const [l4, setL4] = useState(Number(data["Wall1Animation4"]["left"]));
	const [l5, setL5] = useState(Number(data["Wall1Animation5"]["left"]));

	const [t1, setT1] = useState(Number(data["Wall1Animation1"]["top"]));
	const [t2, setT2] = useState(Number(data["Wall1Animation2"]["top"]));
	const [t3, setT3] = useState(Number(data["Wall1Animation3"]["top"]));
	const [t4, setT4] = useState(Number(data["Wall1Animation4"]["top"]));
	const [t5, setT5] = useState(Number(data["Wall1Animation5"]["top"]));

	const defaultVals = [74, 233, 602, 37, 658, 513, 1066, 86, 1224, 435];

	const [count, setCount] = useState(1);
	const [showBg, setShowBg] = useState(false);

	const videoRefs = useRef([]);


	const getAudioDevs = async () => {
		await navigator.mediaDevices
			.enumerateDevices()
			.then((devices) => {
				devices.forEach((device) => {
					console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
					if (device.label == 'DVS Transmit  1-2 (Dante Virtual Soundcard)') {
						setAudioOutput(device.deviceId);
						// console.log(audioOutput);
					}
				});
			})
			.catch((err) => {
				console.error(`${err.name}: ${err.message}`);
			});
	};


	getAudioDevs();

	window.ipcRender.receive("main-to-render", (result) => {
		//getting coordinates of users' hands
		handleInteraction(result);
		// setResult(result)
	});

	useEffect(() => {
		videoRefs.current[8].volume = 0;
		videoRefs.current[9].volume = 0;
		videoRefs.current[10].volume = 0;
		videoRefs.current[11].volume = 0;
		videoRefs.current[12].volume = 0;

		if (presence1) {
			!foundedOnPrinciple ? videoRefs.current[8].play() : null;
		}
		if (presence2) {
			!ratedHighest ? videoRefs.current[9].play() : null;
		}
		if (presence3) {
			!check ? videoRefs.current[10].play() : null;
		}
		if (presence4) {
			!notJustForTeachers ? videoRefs.current[11].play() : null;
		}
		if (presence5) {
			!mission ? videoRefs.current[12].play() : null;
		}

		if (foundedOnPrinciple) {
			setPresence1(false);
			if (!videoRefs.current[1].isPlaying) {
				videoRefs.current[1].play();
			}
		} else if (!foundedOnPrinciple) {
			videoRefs.current[1].currentTime = 0;
		}
		if (ratedHighest) {
			setPresence2(false);
			if (!videoRefs.current[2].isPlaying) {
				videoRefs.current[2].play();
			}
		} else if (!ratedHighest) {
			videoRefs.current[2].currentTime = 0;
		}
		if (check) {
			setPresence3(false);
			if (!videoRefs.current[3].isPlaying) {
				videoRefs.current[3].play();
			}
		} else if (!check) {
			videoRefs.current[3].currentTime = 0;
		}
		if (notJustForTeachers) {
			setPresence4(false);
			if (!videoRefs.current[4].isPlaying) {
				videoRefs.current[4].play();
			}
		} else if (!notJustForTeachers) {
			videoRefs.current[4].currentTime = 0;
		}
		if (mission) {
			setPresence5(false);
			if (!videoRefs.current[5].isPlaying) {
				videoRefs.current[5].play();
			}
		} else if (!mission) {
			videoRefs.current[5].currentTime = 0;
		}
		if (butterfly) {
			videoRefs.current[6].play();
		} else if (!butterfly) {
			videoRefs.current[6].currentTime = 0;
		}
	}, [
		presence1,
		presence2,
		presence3,
		presence4,
		presence5,
		notJustForTeachers,
		check,
		mission,
		foundedOnPrinciple,
		butterfly,
		ratedHighest,
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
			case "prox1": {
				!presence1 ? setPresence1(true) : null;
				break;
			}
			case "prox2": {
				!presence2 ? setPresence2(true) : null;
				break;
			}
			case "prox3": {
				!presence3 ? setPresence3(true) : null;
				break;
			}
			case "prox4": {
				!presence4 ? setPresence4(true) : null;
				break;
			}
			case "prox5": {
				!presence5 ? setPresence5(true) : null;
				break;
			}

			case "play1": {
				setPresence1(false);
				setFoundedOnPrinciple(true);
				break;
			}
			case "play2": {
				setPresence2(false);
				setRatedHighest(true);
				break;
			}
			case "play3": {
				setPresence3(false);
				setCheck(true);
				setButterfly(true);
				break;
			}
			case "play4": {
				setPresence4(false);
				setNotJustForTeachers(true);
				break;
			}
			case "play5": {
				setPresence5(false);
				setMission(true);
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
						"wall1",
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
						"wall1",
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
				
			}
		},
		{ once: true }
	);

	return (
		<div className="background1">
			{showBg && (
				<div className="layout">
					<img src={layout1} alt="bg" />
				</div>
			)}
			{!showBg && (
				<div>
					<video
						src={proxVid1}
						key="proximityLoop01"
						id="proximityLoop01"
						preload="auto"
						ref={(el) => (videoRefs.current[8] = el)}
						onEnded={() => setPresence1(false)}
						hidden={presence1 ? false : true}
					/>
					<video
						src={proxVid2}
						key="proximityLoop02"
						id="proximityLoop02"
						preload="auto"
						ref={(el) => (videoRefs.current[9] = el)}
						onEnded={() => setPresence2(false)}
						hidden={presence2 ? false : true}
					/>
					<video
						src={proxVid3}
						key="proximityLoop03"
						id="proximityLoop03"
						preload="auto"
						ref={(el) => (videoRefs.current[10] = el)}
						onEnded={() => setPresence3(false)}
						hidden={presence3 ? false : true}
					/>
					<video
						src={proxVid4}
						key="proximityLoop04"
						id="proximityLoop04"
						preload="auto"
						ref={(el) => (videoRefs.current[11] = el)}
						onEnded={() => setPresence4(false)}
						hidden={presence4 ? false : true}
					/>
					<video
						src={proxVid5}
						key="proximityLoop05"
						id="proximityLoop05"
						preload="auto"
						ref={(el) => (videoRefs.current[12] = el)}
						onEnded={() => setPresence5(false)}
						hidden={presence5 ? false : true}
					/>

					{/* interaction videos */}

					<video
						src={butterfly1}
						key={butterfly1}
						id={"butterfly"}
						preload="auto"
						autoPlay={false}
						loop={false}
						ref={(el) => (videoRefs.current[6] = el)}
						hidden={butterfly ? false : true}
						onEnded={() => setButterfly(false)}
					/>

					<video
						src={foundedOnPrinciple0}
						key={foundedOnPrinciple0}
						id={"foundedOnPrinciple"}
						preload="auto"
						autoPlay
						loop
						hidden={foundedOnPrinciple ? true : false}
						// onMouseEnter={() => setPresence1(true)}
						// onClick={() => handleInteraction("play1")}
						style={{
							transform: `translate(${l1}px, ${t1}px)`,
						}}
					/>
					<video
						src={foundedOnPrinciple1}
						key={foundedOnPrinciple1}
						id={"foundedOnPrinciple"}
						preload="auto"
						autoPlay={false}
						loop={false}
						ref={(el) => (videoRefs.current[1] = el)}
						hidden={foundedOnPrinciple ? false : true}
						onEnded={() => setFoundedOnPrinciple(false)}
						style={{
							transform: `translate(${l1}px, ${t1}px)`,
						}}
					/>

					<video
						src={notJustForTeachers0}
						key={notJustForTeachers0}
						id={"notJustForTeachers"}
						preload="auto"
						autoPlay
						loop
						hidden={notJustForTeachers ? true : false}
						// onMouseEnter={() => setPresence4(true)}
						// onClick={() => handleInteraction("play4")}
						style={{
							transform: `translate(${l4}px, ${t4}px)`,
						}}
					/>
					<video
						src={notJustForTeachers1}
						key={notJustForTeachers1}
						id={"notJustForTeachers"}
						preload="auto"
						autoPlay={false}
						loop={false}
						ref={(el) => (videoRefs.current[4] = el)}
						hidden={notJustForTeachers ? false : true}
						onEnded={() => setNotJustForTeachers(false)}
						style={{
							transform: `translate(${l4}px, ${t4}px)`,
						}}
					/>
					<video
						src={ratedOneOfTheHighest0}
						key={ratedOneOfTheHighest0}
						id={"ratedHighest"}
						preload="auto"
						autoPlay
						loop
						hidden={ratedHighest ? true : false}
						// onMouseEnter={() => setPresence2(true)}
						// onClick={() => handleInteraction("play2")}
						style={{
							transform: `translate(${l2}px, ${t2}px)`,
						}}
					/>
					<video
						src={ratedOneOfTheHighest1}
						key={ratedOneOfTheHighest1}
						id={"ratedHighest"}
						preload="auto"
						autoPlay={false}
						loop={false}
						ref={(el) => (videoRefs.current[2] = el)}
						hidden={ratedHighest ? false : true}
						onEnded={() => setRatedHighest(false)}
						style={{
							transform: `translate(${l2}px, ${t2}px)`,
						}}
					/>

					<video
						src={wereOnAMission0}
						key={wereOnAMission0}
						id={"mission"}
						preload="auto"
						autoPlay
						loop
						hidden={mission ? true : false}
						// onMouseEnter={() => setPresence5(true)}
						// onClick={() => handleInteraction("play5")}
						style={{
							transform: `translate(${l5}px, ${t5}px)`,
						}}
					/>
					<video
						src={wereOnAMission1}
						key={wereOnAMission1}
						id={"mission"}
						preload="auto"
						autoPlay={false}
						loop={false}
						ref={(el) => (videoRefs.current[5] = el)}
						hidden={mission ? false : true}
						onEnded={() => setMission(false)}
						style={{
							transform: `translate(${l5}px, ${t5}px)`,
						}}
					/>

					<video
						src={neverMissACheck0}
						key={neverMissACheck0}
						id={"check"}
						preload="auto"
						autoPlay
						loop
						hidden={check ? true : false}
						// onMouseEnter={() => setPresence3(true)}
						// onClick={() => handleInteraction("play3")}
						style={{
							transform: `translate(${l3}px, ${t3}px)`,
						}}
					/>
					<video
						src={neverMissACheck1}
						key={neverMissACheck1}
						id={"check"}
						preload="auto"
						autoPlay={false}
						loop={false}
						ref={(el) => (videoRefs.current[3] = el)}
						hidden={check ? false : true}
						onEnded={() => setCheck(false)}
						style={{
							transform: `translate(${l3}px, ${t3}px)`,
						}}
					/>
				</div>
			)}
		</div>
	);
}
