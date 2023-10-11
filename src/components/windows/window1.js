import React, { useState, useEffect, useRef } from "react";
import "../base.css";
import bg1 from "../../assets/images/wall-1-print.png";

import notJustForTeachers0 from "../../assets/Animations/Not-Just-for-Teachers/BlkBG_Teachers_Projection_09262023.mp4";
import notJustForTeachers1 from "../../assets/Videos/Not Just Teachers 1.mp4";

import wereOnAMission0 from "../../assets/Animations/We're-on-a-Mission/BlackBG_We're on a Mission_PROJECTION_09282023.mp4";
import wereOnAMission1 from "../../assets/Videos/On a Mission 1.mp4";

import foundedOnPrinciple0 from "../../assets/Animations/Founded-on-Principle/BLACKBG_Andrew Carnegie_PROJECTION_09282023_NEW.mp4";
import foundedOnPrinciple1 from "../../assets/Videos/Founded_on_principle_1.mp4";

import neverMissACheck0 from "../../assets/Animations/Never-Miss-a-Check/BLACK BG_CHECKS_PROJECTION_10022023.mp4";
import neverMissACheck1 from "../../assets/Videos/Never Miss a Check 1.mp4";

import ratedOneOfTheHighest0 from "../../assets/Animations/Rated-One-of-the-Highest/BlackBG_Rated One of the Highest_PROJECTION_09262023.mp4";
import ratedOneOfTheHighest1 from "../../assets/Videos/Rated One of the Highest 1.mp4";

import butterfly from "../../assets/Animations/_Miscellaneous/BLACKBG_Wall 1_NEVER MISS A CHECK_BUTTERFLY_09282023.mp4";
import lawnMower from "../../assets/Animations/_Miscellaneous/BlackBG_Wall 1_LAWNMOWER GRASS_10052023.mp4";

import proximityVideo01 from "../../assets/Videos/ProximityNoteB.mp4";
import proximityVideo02 from "../../assets/Videos/ProximityNoteC.mp4";
import proximityVideo03 from "../../assets/Videos/ProximityNoteD.mp4";
import proximityVideo04 from "../../assets/Videos/ProximityNoteE.mp4";
import proximityVideo05 from "../../assets/Videos/ProximityNoteG.mp4";

export default function Window1(props) {
	const {
		play1,
		play2,
		play3,
		play4,
		play5,
		setPlay1,
		setPlay2,
		setPlay3,
		setPlay4,
		setPlay5,
		presence1,
		presence2,
		presence3,
		presence4,
		presence5,
		setPresence1,
		setPresence2,
		setPresence3,
		setPresence4,
		setPresence5,
	} = props;

	const videoRefs = useRef([]);

	const [class01, setClass01] = useState("visible");
	const [class02, setClass02] = useState("visible");
	const [class03, setClass03] = useState("visible");
	const [class04, setClass04] = useState("visible");
	const [class05, setClass05] = useState("visible");

	useEffect(() => {
		if (presence1 == true) {
			videoRefs.current[8].play();
		}
		if (presence2 == true) {
			videoRefs.current[9].play();
		}
		if (presence3 == true) {
			videoRefs.current[10].play();
		}
		if (presence4 == true) {
			videoRefs.current[11].play();
		}
		if (presence5 == true) {
			videoRefs.current[12].play();

			// setTimeout(() => {
			// 	setClass05("hidden");
			// }, 7000);
		}

		if (play1 == true) {
			setPresence1(false);
			videoRefs.current[1].play();
		}
		if (play2 == true) {
			setPresence2(false);
			videoRefs.current[2].play();
		}
		if (play3 == true) {
			setPresence3(false);
			videoRefs.current[3].play();
			videoRefs.current[6].play();
		}
		if (play4 == true) {
			setPresence4(false);
			videoRefs.current[4].play();
		}
		if (play5 == true) {
			setPresence5(false);
			videoRefs.current[5].play();
		}
	}, [
		presence1,
		presence2,
		presence3,
		presence4,
		presence5,
		play1,
		play2,
		play3,
		play4,
		play5,
	]);

	return (
		<div>
			<video
				src={proximityVideo01}
				key={"proximityLoop01"}
				id={"proximityLoop01"}
				preload="auto"
				autoPlay={false}
				muted={false}
				loop={false}
				onEnded={() => setPresence1(false)}
				ref={(el) => (videoRefs.current[8] = el)}
				hidden={presence1 ? false : true}
			/>

			<video
				src={proximityVideo02}
				key={"proximityLoop02"}
				id={"proximityLoop02"}
				preload="auto"
				autoPlay={false}
				muted={false}
				loop={false}
				onEnded={() => setPresence2(false)}
				ref={(el) => (videoRefs.current[9] = el)}
				hidden={presence2 ? false : true}
			/>

			<video
				src={proximityVideo03}
				key={"proximityLoop03"}
				id={"proximityLoop03"}
				preload="auto"
				autoPlay={false}
				muted={false}
				loop={false}
				onEnded={() => setPresence3(false)}
				ref={(el) => (videoRefs.current[10] = el)}
				hidden={presence3 ? false : true}
			/>

			<video
				src={proximityVideo04}
				key={"proximityLoop04"}
				id={"proximityLoop04"}
				preload="auto"
				autoPlay={false}
				muted={false}
				loop={false}
				onEnded={() => setPresence4(false)}
				ref={(el) => (videoRefs.current[11] = el)}
				hidden={presence4 ? false : true}
			/>

			<video
				src={proximityVideo05}
				key={"proximityLoop05"}
				id={"proximityLoop05"}
				preload="auto"
				autoPlay={false}
				muted={false}
				loop={false}
				onEnded={() => setPresence5(false)}
				ref={(el) => (videoRefs.current[12] = el)}
				hidden={presence5 ? false : true}
			/>

			{/* interaction videos */}

			<video
				src={butterfly}
				key={butterfly}
				id={"butterfly"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[6] = el)}
			/>
			<video
				src={foundedOnPrinciple0}
				key={foundedOnPrinciple0}
				id={"principle0"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={play1 ? true : false}
			/>
			<video
				src={foundedOnPrinciple1}
				key={foundedOnPrinciple1}
				id={"principle0"}
				preload="auto"
				autoPlay={false}
				muted={false}
				loop={false}
				ref={(el) => (videoRefs.current[1] = el)}
				hidden={play1 ? false : true}
				onEnded={() => setPlay1(false)}
			/>
			<video
				src={ratedOneOfTheHighest0}
				key={ratedOneOfTheHighest0}
				id={"ratedHighest"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={play2 ? true : false}
			/>
			<video
				src={ratedOneOfTheHighest1}
				key={ratedOneOfTheHighest1}
				id={"ratedHighest"}
				preload="auto"
				autoPlay={false}
				muted={false}
				loop={false}
				ref={(el) => (videoRefs.current[2] = el)}
				hidden={play2 ? false : true}
				onEnded={() => setPlay2(false)}
			/>
			<video
				src={neverMissACheck0}
				key={neverMissACheck0}
				id={"check"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={play3 ? true : false}
			/>
			<video
				src={neverMissACheck1}
				key={neverMissACheck1}
				id={"check"}
				preload="auto"
				autoPlay={false}
				muted={false}
				loop={false}
				ref={(el) => (videoRefs.current[3] = el)}
				hidden={play3 ? false : true}
				onEnded={() => setPlay3(false)}
			/>
			<video
				src={notJustForTeachers0}
				key={notJustForTeachers0}
				id={"notJustForTeachers"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={play4 ? true : false}
			/>
			<video
				src={notJustForTeachers1}
				key={notJustForTeachers1}
				id={"notJustForTeachers"}
				preload="auto"
				autoPlay={false}
				muted={false}
				loop={false}
				ref={(el) => (videoRefs.current[4] = el)}
				hidden={play4 ? false : true}
				onEnded={() => setPlay4(false)}
			/>
			<video
				src={wereOnAMission0}
				key={wereOnAMission0}
				id={"mission"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={play5 ? true : false}
			/>
			<video
				src={wereOnAMission1}
				key={wereOnAMission1}
				id={"mission"}
				preload="auto"
				autoPlay={false}
				muted={false}
				loop={false}
				ref={(el) => (videoRefs.current[5] = el)}
				hidden={play5 ? false : true}
				onEnded={() => setPlay5(false)}
			/>
		</div>
	);
}
