import React, { useState, useEffect, useRef } from "react";
import "../base.css";
import bg1 from "../../assets/images/wall-1-print.png";

import notJustForTeachers0 from "../../assets/Animations/Not-Just-for-Teachers/BlkBG_Teachers_Projection_09262023.mp4";
import notJustForTeachers1 from "../../assets/Animations/Not-Just-for-Teachers/BlkBG_Teachers_Animation Beat_09262023_NEW.mp4";

import wereOnAMission0 from "../../assets/Animations/We're-on-a-Mission/BlackBG_We're on a Mission_PROJECTION_09262023.mp4";
import wereOnAMission1 from "../../assets/Animations/We're-on-a-Mission/BlackBG_We're on a Mission_ANIMATION BEAT_09262023.mp4";

import foundedOnPrinciple from "../../assets/Animations/Founded-on-Principle/BLACKBG_Andrew Carnegie_Animation Beat_09132023.mp4";

import neverMissACheck0 from "../../assets/Animations/Never-Miss-a-Check/BLACK BG_CHECKS_PROJECTION_9212023.mp4";
import neverMissACheck1 from "../../assets/Animations/Never-Miss-a-Check/BLACKBG_NEVER MISS A CHECK_ANIMATION BEAT_09212023.mp4";

import ratedOneOfTheHighest0 from "../../assets/Animations/Rated-One-of-the-Highest/BlackBG_Rated One of the Highest_PROJECTION_09262023.mp4";
import ratedOneOfTheHighest1 from "../../assets/Animations/Rated-One-of-the-Highest/BlackBG_Rated One of the Highest_ANIMBEATS_09262023.mp4";

export default function Window1(props) {
	const { play1, play2, play3, play4, play5 } = props;

	// wall one state variables
	const [notJustForTeachers, setNotJustForTeachers] = useState(false);
	const [source2Play, setSource2Play] = useState(false);
	const [check, setCheck] = useState(false);
	const [mission, setMission] = useState(false);
	const [ratedHighest, setRatedHighest] = useState(false);
	const videoRefs = useRef([]);

	useEffect(() => {
		if (play1) {
			videoRefs.current[0].play();
		}

	}, [play1, play2, play3, play4]);

	function handleClick(num) {
		switch (num) {
			case 3: {
				setCheck(true);
			}
		}
	}

	return (
		<div>
			<img src={bg1} className="wall1" />
			<video
				src={notJustForTeachers0}
				key={notJustForTeachers0}
				id={"notJustForTeachers"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={notJustForTeachers ? true : false}
				onClick={() => handleClick(0)}
			/>
			<video
				src={notJustForTeachers1}
				key={notJustForTeachers1}
				id={"notJustForTeachers"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[0] = el)}
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
				onClick={() => handleClick(1)}
			/>
			<video
				src={ratedOneOfTheHighest1}
				key={ratedOneOfTheHighest1}
				id={"ratedHighest"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[1] = el)}
				hidden={ratedHighest ? false : true}
				onClick={() => setRatedHighest(true)}
				onEnded={() => setRatedHighest(false)}
			/>
			<video
				src={foundedOnPrinciple}
				key={foundedOnPrinciple}
				id={"principle0"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[2] = el)}
				onClick={() => setSource2Play(true)}
				onEnded={() => setSource2Play(false)}
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
				onClick={() => handleClick(3)}
			/>
			<video
				src={wereOnAMission1}
				key={wereOnAMission1}
				id={"mission"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[3] = el)}
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
				onClick={() => handleClick(4)}
			/>
			<video
				src={neverMissACheck1}
				key={neverMissACheck1}
				id={"check"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[4] = el)}
				hidden={check ? false : true}
				onEnded={() => setCheck(false)}
			/>
		</div>
	);
}
