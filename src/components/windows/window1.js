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
	} = props;

	const videoRefs = useRef([]);

	useEffect(() => {
		if (play1) {
			videoRefs.current[1].play();
		}
		if (play2) {
			videoRefs.current[2].play();
		}
		if (play3) {
			videoRefs.current[3].play();
		}
		if (play4) {
			videoRefs.current[4].play();
		}
		if (play5) {
			videoRefs.current[5].play();
		}
	}, [play1, play2, play3, play4, play5]);

	return (
		<div>
			<img src={bg1} className="wall1" />
			<video
				src={foundedOnPrinciple}
				key={foundedOnPrinciple}
				id={"principle0"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[1] = el)}
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
				muted
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
				muted
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
				muted
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
				muted
				loop={false}
				ref={(el) => (videoRefs.current[5] = el)}
				hidden={play5 ? false : true}
				onEnded={() => setPlay5(false)}
			/>
		</div>
	);
}
