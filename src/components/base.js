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

	const videoRefs = useRef([]);

	window.ipcRender.receive("main-to-render", (result) => {
		//getting coordinates of users' hands
		handleInteraction(result);
	});

	useEffect(() => {
		if (presence1) {
			!foundedOnPrinciple ? videoRefs.current[8].play() : null 
		}
		if (presence2) {
			!ratedHighest ? videoRefs.current[9].play() : null
		}
		if (presence3) {
			!check ? videoRefs.current[10].play() : null
		}
		if (presence4) {
			!notJustForTeachers ? videoRefs.current[11].play() : null
		}
		if (presence5) {
			!mission ? videoRefs.current[12].play() : null
		}

		if (foundedOnPrinciple) {
			setPresence1(false)
			videoRefs.current[1].play();
		}
		if (ratedHighest) {
			setPresence2(false)
			videoRefs.current[2].play();
		}
		if (check) {
			setPresence3(false)
			videoRefs.current[3].play();
		}
		if (notJustForTeachers) {
			setPresence4(false)
			videoRefs.current[4].play();
		}
		if (mission) {
			setPresence5(false)
			videoRefs.current[5].play();
		}
		if (butterfly) {
			videoRefs.current[6].play();
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

	function handleInteraction(name) {
		switch (name) {
			case "prox1": {
				!presence1 ? setPresence1(true) : null
				break;
			}
			case "prox2": {
				!presence2 ? setPresence2(true) : null
				break;
			}
			case "prox3": {
				!presence3 ? setPresence3(true) : null
				break;
			}
			case "prox4": {
				!presence4 ? setPresence4(true): null
				break;
			}
			case "prox5": {
				!presence5 ? setPresence5(true) : null
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

	return (
		<div className="background1">
			<video
				src={proxVid1}
				key="proximityLoop01"
				id="proximityLoop01"
				preload="auto"
				// muted="false"
				ref={(el) => (videoRefs.current[8] = el)}
				onEnded={() => setPresence1(false)}
				hidden={presence1 ? false : true}
			/>
			<video
				src={proxVid2}
				key="proximityLoop02"
				id="proximityLoop02"
				preload="auto"
				// muted="false"
				ref={(el) => (videoRefs.current[9] = el)}
				onEnded={() => setPresence2(false)}
				hidden={presence2 ? false : true}
			/>
			<video
				src={proxVid3}
				key="proximityLoop03"
				id="proximityLoop03"
				preload="auto"
				// muted="false"
				ref={(el) => (videoRefs.current[10] = el)}
				onEnded={() => setPresence3(false)}
				hidden={presence3 ? false : true}
			/>
			<video
				src={proxVid4}
				key="proximityLoop04"
				id="proximityLoop04"
				preload="auto"
				// muted="false"
				ref={(el) => (videoRefs.current[11] = el)}
				onEnded={() => setPresence4(false)}
				hidden={presence4 ? false : true}
			/>
			<video
				src={proxVid5}
				key="proximityLoop05"
				id="proximityLoop05"
				preload="auto"
				// muted="false"
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
				muted
				loop
				hidden={foundedOnPrinciple ? true : false}
				onMouseEnter={() => setPresence1(true)}
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
			/>

			<video
				src={notJustForTeachers0}
				key={notJustForTeachers0}
				id={"notJustForTeachers"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={notJustForTeachers ? true : false}
				onMouseEnter={() => setPresence4(true)}
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
			/>
			<video
				src={ratedOneOfTheHighest0}
				key={ratedOneOfTheHighest0}
				id={"ratedHighest"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={ratedHighest ? true : false}
				onMouseEnter={() => setPresence2(true)}
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
			/>

			<video
				src={wereOnAMission0}
				key={wereOnAMission0}
				id={"mission"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={mission ? true : false}
				onMouseEnter={() => setPresence5(true)}
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
			/>

			<video
				src={neverMissACheck0}
				key={neverMissACheck0}
				id={"check"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={check ? true : false}
				onMouseEnter={() => setPresence3(true)}
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
			/>
		</div>
	);
}
