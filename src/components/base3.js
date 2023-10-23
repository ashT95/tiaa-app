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

	const videoRefs = useRef([]);

	window.ipcRender.receive("main-to-render", (result) => {
		//getting coordinates of users' hands
		handleInteraction(result);
	});

	useEffect(() => {
		videoRefs.current[10].volume = 0;
		videoRefs.current[11].volume = 0;
		videoRefs.current[12].volume = 0;
		videoRefs.current[13].volume = 0;
		videoRefs.current[14].volume = 0;

		if (presence1) {
			!wipe0 && !wipe1 ? videoRefs.current[10].play() : null;
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
			if (!videoRefs.current[5].isPlaying) {
				videoRefs.current[5].play();
			}
		} else if (!wipe0) {
			videoRefs.current[5].currentTime = 0;
		}
		if (loop1) {
			if (!videoRefs.current[6].isPlaying) {
				videoRefs.current[6].play();
			}
		} else if (!loop1) {
			videoRefs.current[6].currentTime = 0;
		}
		if (loop0) {
			if (!videoRefs.current[7].isPlaying) {
				videoRefs.current[7].play();
			}
		} else if (!loop0) {
			videoRefs.current[7].currentTime = 0;
		}
		if (wipe1) {
			setPresence1(false);
			if (!videoRefs.current[8].isPlaying) {
				videoRefs.current[8].play();
			}
		} else if (!wipe1) {
			videoRefs.current[8].currentTime = 0;
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
					setWipe0(true);
					setLoop0(false);
				}
				if (loop1) {
					setWipe1(true);
					setLoop1(false);
				}
				break;
			}
			case "play111": {
				setLoop1(true);
				setWipe0(false);
				break;
			}
			case "play112": {
				setLoop0(true);
				setWipe1(false);
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

	return (
		<div className="background3">
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
			/>
			<video
				src={ceoGlowLoop}
				key={ceoGlowLoop}
				id={"ceoGlowLoop"}
				preload="auto"
				autoPlay
				loop
			/>
			<video
				src={ceoLoop0}
				key={ceoLoop0}
				id={"groundbreakingCEOs"}
				preload="auto"
				autoPlay
				loop
				ref={(el) => (videoRefs.current[7] = el)}
				hidden={loop0 ? false : true}
				onMouseEnter={() => setPresence1(true)}
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
			/>
			<video
				src={ceoLoop1}
				key={ceoLoop1}
				id={"groundbreakingCEOs"}
				preload="auto"
				autoPlay
				loop
				ref={(el) => (videoRefs.current[6] = el)}
				hidden={loop1 ? false : true}
				onMouseEnter={() => setPresence1(true)}
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
			/>
			<video
				src={retiringInequalityLoop1}
				key={retiringInequalityLoop1}
				id={"retiringInequality"}
				preload="auto"
				autoPlay
				loop
			/>
			<video
				src={retiringInequalityLoop2}
				key={retiringInequalityLoop2}
				id={"retiringInequality"}
				preload="auto"
				autoPlay
				loop
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
			/>
		</div>
	);
}
