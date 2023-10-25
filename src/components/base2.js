import React, { useState, useEffect, useRef } from "react";
import "./base.css";

import friendship0 from "../assets/Animations/_ProjectionLoopsSmaller/BLACKBG_INVESTING WITH IMPACT_PROJECTION_SMALLER_10182023.mp4";
import friendship1 from "../assets/Animations/_AnimationsWithSound/INVESTING WITH IMPACT_SOUND.mp4";

import conserving0 from "../assets/Animations/_ProjectionLoopsSmaller/BLACKBG_CONSERVING NATURAL RESOURCES_PROJECTION_SMALLER_10182023.mp4";
import conserving1 from "../assets/Animations/_AnimationsWithSound/CONSERVING NATURAL RESOURCES_SOUND.mp4";

import responsibleRealEstate0 from "../assets/Animations/Responsible-Real-Estate/BlkBG_Responsible Real Estate_Projection_09222023.mp4";
import responsibleRealEstate1 from "../assets/Animations/Responsible-Real-Estate/BlackBG_Responsible Real Estate_AnimationBeat_10062023.mp4";

import grapeInvestments0 from "../assets/Animations/_ProjectionLoopsSmaller/BLACKBG_VINEYARDS_PROJECTION_SMALLER_10182023.mp4";
import grapeInvestments1 from "../assets/Animations/_AnimationsWithSound/SUSTAINABLE VINEYARDS_SOUND.mp4";

import shootingStar from "../assets/Animations/_Miscellaneous/BlackBG_Wall 2_ShootingStar_10162023.mp4";
import titleAnimation from "../assets/Animations/_Miscellaneous/wall2-title-animation.mp4";
import bgAnim2 from "../assets/Animations/_Miscellaneous/BlackBG_Wall 2_STARS AND PLANTS_10162023.mp4";

import proxVid1 from "../assets/Animations/Proximity/proximity-popup_B.mp4";
import proxVid2 from "../assets/Animations/Proximity/proximity-popup_C.mp4";
import proxVid3 from "../assets/Animations/Proximity/proximity-popup_D.mp4";
import proxVid4 from "../assets/Animations/Proximity/proximity-popup_E.mp4";

import layout2 from "../assets/Images/wall-2-print.png";

export default function Base2() {
	const [friendship, setFriendship] = useState(false);
	const [conserving, setConserving] = useState(false);
	const [responsibleRealEstate, setResponsibleRealEstate] = useState(false);
	const [grapeInvestments, setGrapeInvestments] = useState(false);

	const [presence1, setPresence1] = useState(false);
	const [presence2, setPresence2] = useState(false);
	const [presence3, setPresence3] = useState(false);
	const [presence4, setPresence4] = useState(false);

	const [audioOutput, setAudioOutput] = useState(null);

	let data = require("../../config.json");
	let camData = require("../../camConfig.json");

	const [l1, setL1] = useState(Number(data["Wall2Animation1"]["left"]));
	const [l2, setL2] = useState(Number(data["Wall2Animation2"]["left"]));
	const [l3, setL3] = useState(Number(data["Wall2Animation3"]["left"]));
	const [l4, setL4] = useState(Number(data["Wall2Animation4"]["left"]));

	const [t1, setT1] = useState(Number(data["Wall2Animation1"]["top"]));
	const [t2, setT2] = useState(Number(data["Wall2Animation2"]["top"]));
	const [t3, setT3] = useState(Number(data["Wall2Animation3"]["top"]));
	const [t4, setT4] = useState(Number(data["Wall2Animation4"]["top"]));

	const [anim2topLeft, setAnim2topLeft] = useState(
		Number(camData["anim_topLeft2_y"].replace(/[^0-9\.]+/g, ""))
	);
	const [anim2bottomRight, setAnim2bottomRight] = useState(
		Number(camData["anim_bottomRight2_y"].replace(/[^0-9\.]+/g, ""))
	);

	const defaultVals = [265, 135, 663, 483, 825, 39, 1128, 401];
	const defaultCamVals = [0.12, 0.32, 0.49, 0.56];

	const [count, setCount] = useState(1);
	const [showBg, setShowBg] = useState(false);

	const videoRefs = useRef([]);

	const getAudioDevs = async () => {
		await navigator.mediaDevices
			.enumerateDevices()
			.then((devices) => {
				devices.forEach((device) => {
					// console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
					if (device.label == "Speakers (Razer Kraken X USB) (1532:0526)") {
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

	window.ipcRender.receive("main-to-render", (result) => {
		//getting coordinates of users' hands
		handleInteraction(result);
	});

	useEffect(() => {
		videoRefs.current[5].volume = 0;
		videoRefs.current[6].volume = 0;
		videoRefs.current[7].volume = 0;
		videoRefs.current[8].volume = 0;

		if (presence1) {
			!conserving ? videoRefs.current[5].play() : null;
		}
		if (presence2) {
			!friendship ? videoRefs.current[6].play() : null;
		}
		if (presence3) {
			!responsibleRealEstate ? videoRefs.current[7].play() : null;
		}
		if (presence4) {
			!grapeInvestments ? videoRefs.current[8].play() : null;
		}

		if (conserving) {
			setPresence1(false);
			if (!videoRefs.current[1].isPlaying) {
				videoRefs.current[1].play();
			}
		} else if (!conserving) {
			videoRefs.current[1].currentTime = 0;
		}
		if (friendship) {
			setPresence2(false);
			if (!videoRefs.current[2].isPlaying) {
				videoRefs.current[2].play();
			}
		} else if (!friendship) {
			videoRefs.current[2].currentTime = 0;
		}
		if (responsibleRealEstate) {
			setPresence3(false);
			if (!videoRefs.current[3].isPlaying) {
				videoRefs.current[3].play();
			}
		} else if (!responsibleRealEstate) {
			videoRefs.current[3].currentTime = 0;
		}
		if (grapeInvestments) {
			setPresence4(false);
			if (!videoRefs.current[4].isPlaying) {
				videoRefs.current[4].play();
			}
		} else if (!grapeInvestments) {
			videoRefs.current[4].currentTime = 0;
		}
	}, [
		presence1,
		presence2,
		presence3,
		presence4,
		conserving,
		friendship,
		responsibleRealEstate,
		grapeInvestments,
	]);

	useEffect(() => {
		if (audioOutput) {
			videoRefs.current[1].setSinkId(audioOutput);
			videoRefs.current[2].setSinkId(audioOutput);
			videoRefs.current[3].setSinkId(audioOutput);
			videoRefs.current[4].setSinkId(audioOutput);
		}
	}, [audioOutput]);

	function handleInteraction(name) {
		switch (name) {
			case "prox6": {
				!presence1 ? setPresence1(true) : null;
				break;
			}
			case "prox7": {
				!presence2 ? setPresence2(true) : null;
				break;
			}
			case "prox8": {
				!presence3 ? setPresence3(true) : null;
				break;
			}
			case "prox9": {
				!presence4 ? setPresence4(true) : null;
				break;
			}

			case "play6": {
				setPresence1(false);
				setConserving(true);
				break;
			}
			case "play7": {
				setPresence2(false);
				setFriendship(true);
				break;
			}
			case "play8": {
				setPresence3(false);
				setResponsibleRealEstate(true);
				break;
			}
			case "play9": {
				setPresence4(false);
				setGrapeInvestments(true);
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
					if (count == 4) setCount(1);
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

					break;
				}
				case " ": {
					setShowBg(!showBg);
					break;
				}
				case "Enter": {
					window.ipcRender.send("render-to-main", [
						"wall2",
						l1,
						t1,
						l2,
						t2,
						l3,
						t3,
						l4,
						t4,
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

					window.ipcRender.send("render-to-main", [
						"wall2",
						l1,
						t1,
						l2,
						t2,
						l3,
						t3,
						l4,
						t4,
					]);
					break;
				}
				case "w": {
					let temp1 = anim2topLeft - 0.01;
					let temp2 = anim2bottomRight - 0.01;
					setAnim2topLeft(temp1);
					setAnim2bottomRight(temp2);
					window.ipcRender.send("render-to-main", [
						"cam2",
						anim2topLeft,
						anim2bottomRight,
					]);
					break;
				}
				case "s": {
					let temp1 = anim2topLeft + 0.01;
					let temp2 = anim2bottomRight + 0.01;
					setAnim2topLeft(temp1);
					setAnim2bottomRight(temp2);
					window.ipcRender.send("render-to-main", [
						"cam2",
						anim2topLeft,
						anim2bottomRight,
					]);
					break;
				}
				case "8": {
					setAnim2topLeft(defaultCamVals[2]);
					setAnim2bottomRight(defaultCamVals[3]);
					window.ipcRender.send("render-to-main", [
						"cam2",
						anim2topLeft,
						anim2bottomRight,
					]);
					break;
				}
			}
		},
		{ once: true }
	);

	return (
		<div className="background2">
			{showBg && (
				<div className="layout">
					<img src={layout2} alt="bg" />
				</div>
			)}
			{!showBg && (
				<div>
					<video
						src={proxVid1}
						key="proximityLoop21"
						id="proximityLoop21"
						preload="auto"
						ref={(el) => (videoRefs.current[5] = el)}
						onEnded={() => setPresence1(false)}
						hidden={presence1 ? false : true}
					/>
					<video
						src={proxVid2}
						key="proximityLoop22"
						id="proximityLoop22"
						preload="auto"
						ref={(el) => (videoRefs.current[6] = el)}
						onEnded={() => setPresence2(false)}
						hidden={presence2 ? false : true}
					/>
					<video
						src={proxVid3}
						key="proximityLoop23"
						id="proximityLoop23"
						preload="auto"
						ref={(el) => (videoRefs.current[7] = el)}
						onEnded={() => setPresence3(false)}
						hidden={presence3 ? false : true}
					/>
					<video
						src={proxVid4}
						key="proximityLoop24"
						id="proximityLoop24"
						preload="auto"
						ref={(el) => (videoRefs.current[8] = el)}
						onEnded={() => setPresence4(false)}
						hidden={presence4 ? false : true}
					/>

					<video
						src={titleAnimation}
						key={titleAnimation}
						id={"titleAnimation"}
						preload="auto"
						autoPlay
						loop
					/>

					<video
						src={shootingStar}
						key={shootingStar}
						id={"shootingStar"}
						preload="auto"
						autoPlay
						loop
					/>
					<video
						src={bgAnim2}
						key={bgAnim2}
						id={"bgAnim2"}
						preload="auto"
						autoPlay
						loop
					/>

					{/* interaction videos */}

					<video
						src={friendship0}
						key={friendship0}
						id={"friendship"}
						preload="auto"
						autoPlay
						loop
						hidden={friendship ? true : false}
						onMouseEnter={() => setPresence2(true)}
						onClick={() => handleInteraction("play7")}
						style={{
							transform: `translate(${l2}px, ${t2}px)`,
						}}
					/>
					<video
						src={friendship1}
						key={friendship1}
						id={"friendship"}
						preload="auto"
						autoPlay={false}
						loop={false}
						ref={(el) => (videoRefs.current[2] = el)}
						hidden={friendship ? false : true}
						onEnded={() => setFriendship(false)}
						style={{
							transform: `translate(${l2}px, ${t2}px)`,
						}}
					/>
					<video
						src={responsibleRealEstate0}
						key={responsibleRealEstate0}
						id={"responsibleRealEstate"}
						preload="auto"
						autoPlay
						loop
						hidden={responsibleRealEstate ? true : false}
						onMouseEnter={() => setPresence3(true)}
						onClick={() => handleInteraction("play8")}
						style={{
							transform: `translate(${l3}px, ${t3}px)`,
						}}
					/>
					<video
						src={responsibleRealEstate1}
						key={responsibleRealEstate1}
						id={"responsibleRealEstate"}
						preload="auto"
						autoPlay={false}
						loop={false}
						ref={(el) => (videoRefs.current[3] = el)}
						hidden={responsibleRealEstate ? false : true}
						onEnded={() => setResponsibleRealEstate(false)}
						style={{
							transform: `translate(${l3}px, ${t3}px)`,
						}}
					/>
					<video
						src={conserving0}
						key={conserving0}
						id={"conserving"}
						preload="auto"
						autoPlay
						loop
						hidden={conserving ? true : false}
						onMouseEnter={() => setPresence1(true)}
						onClick={() => handleInteraction("play6")}
						style={{
							transform: `translate(${l1}px, ${t1}px)`,
						}}
					/>
					<video
						src={conserving1}
						key={conserving1}
						id={"conserving"}
						preload="auto"
						autoPlay={false}
						loop={false}
						ref={(el) => (videoRefs.current[1] = el)}
						hidden={conserving ? false : true}
						onEnded={() => setConserving(false)}
						style={{
							transform: `translate(${l1}px, ${t1}px)`,
						}}
					/>
					<video
						src={grapeInvestments0}
						key={grapeInvestments0}
						id={"grapeInvestments"}
						preload="auto"
						autoPlay
						loop
						hidden={grapeInvestments ? true : false}
						onMouseEnter={() => setPresence4(true)}
						onClick={() => handleInteraction("play9")}
						style={{
							transform: `translate(${l4}px, ${t4}px)`,
						}}
					/>
					<video
						src={grapeInvestments1}
						key={grapeInvestments1}
						id={"grapeInvestments"}
						preload="auto"
						autoPlay={false}
						loop={false}
						ref={(el) => (videoRefs.current[4] = el)}
						hidden={grapeInvestments ? false : true}
						onEnded={() => setGrapeInvestments(false)}
						style={{
							transform: `translate(${l4}px, ${t4}px)`,
						}}
					/>
				</div>
			)}
		</div>
	);
}
