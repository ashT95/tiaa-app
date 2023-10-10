import React, { useState, useEffect, useRef } from "react";
import "../base.css";
import bg1 from "../../assets/images/wall-1-print.png";

import notJustForTeachers0 from "../../assets/Animations/Not-Just-for-Teachers/BlkBG_Teachers_Projection_09262023.mp4";
import notJustForTeachers1 from "../../assets/Animations/Not-Just-for-Teachers/BlkBG_Teachers_Animation Beat_09262023_NEW.mp4";

import wereOnAMission0 from "../../assets/Animations/We're-on-a-Mission/BlackBG_We're on a Mission_PROJECTION_09282023.mp4";
import wereOnAMission1 from "../../assets/Animations/We're-on-a-Mission/BLACKBG_We're on a Mission_ANIMATION BEAT_09292023.mp4";

import foundedOnPrinciple0 from "../../assets/Animations/Founded-on-Principle/BLACKBG_Andrew Carnegie_PROJECTION_09282023_NEW.mp4";
import foundedOnPrinciple1 from "../../assets/Animations/Founded-on-Principle/BLACKBG_Andrew Carnegie_Animation Beat_09282023_NEW.mp4";

import neverMissACheck0 from "../../assets/Animations/Never-Miss-a-Check/BLACK BG_CHECKS_PROJECTION_10022023.mp4";
import neverMissACheck1 from "../../assets/Animations/Never-Miss-a-Check/BLACKBG_NEVER MISS A CHECK_ANIMATION BEAT_09282023_NEW.mp4";

import ratedOneOfTheHighest0 from "../../assets/Animations/Rated-One-of-the-Highest/BlackBG_Rated One of the Highest_PROJECTION_09262023.mp4";
import ratedOneOfTheHighest1 from "../../assets/Animations/Rated-One-of-the-Highest/BlackBG_Rated One of the Highest_ANIMBEATS_10062023.mp4";

import butterfly from "../../assets/Animations/_Miscellaneous/BLACKBG_Wall 1_NEVER MISS A CHECK_BUTTERFLY_09282023.mp4";
import lawnMower from "../../assets/Animations/_Miscellaneous/BlackBG_Wall 1_LAWNMOWER GRASS_10052023.mp4";

import proximityLoop from "../../assets/Animations/_Miscellaneous/proximity-popup.mp4";
import proximityAudio01 from "../../assets/Audio/Proximity Note_B.m4a";
import proximityAudio02 from "../../assets/Audio/Proximity Note_C.m4a";
import proximityAudio03 from "../../assets/Audio/Proximity Note_D.m4a";
import proximityAudio04 from "../../assets/Audio/Proximity Note_E.m4a";
import proximityAudio05 from "../../assets/Audio/Proximity Note_G.m4a";

import animationAudio01 from "../../assets/Audio/Founded on Principle_SFX.wav";
import animationAudio02 from "../../assets/Audio/One of the Highest_SFX.wav";
import animationAudio03 from "../../assets/Audio/Never Miss a Check_SFX.wav";
import animationAudio04 from "../../assets/Audio/Not Just Teachers_SFX.wav";

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
	const audioRefs = useRef([]);

	useEffect(() => {


		if (presence1 == true) {
			videoRefs.current[8].play()
			audioRefs.current[1].play()
			
		}
		if (presence2 == true) {
			videoRefs.current[9].play()
			audioRefs.current[2].play()
		}
		if (presence3 == true) {
			videoRefs.current[10].play()
			audioRefs.current[3].play()
		}
		if (presence4 == true) {
			videoRefs.current[11].play()
			audioRefs.current[4].play()
		}
		if (presence5 == true) {
			videoRefs.current[12].play()
			audioRefs.current[5].play()
		}

		if (!play1) {
		
				videoRefs.current[1].currentTime = 0;
				audioRefs.current[6].currentTime = 0
			

			
		}
		if (!play2 ) {
			videoRefs.current[2].currentTime = 0;
			audioRefs.current[7].currentTime = 0

		}

		if (!play3 ) {
			videoRefs.current[3].currentTime = 0;
			audioRefs.current[8].currentTime = 0
			
		}

		if (!play4 ) {
			videoRefs.current[4].currentTime = 0;
			audioRefs.current[9].currentTime = 0
		
		}

		if (!play5 ) {
			videoRefs.current[5].currentTime = 0;
	
			
		}


		if (play1 == true) {
			setPresence1(false);
			audioRefs.current[6].play();
			setTimeout(() => {
				videoRefs.current[1].play()
			}, 1000);
		}
		if (play2 == true) {
			setPresence2(false);
			audioRefs.current[7].play();
			setTimeout(() => {
				videoRefs.current[2].play()
			}, 1000);
		}
		if (play3 == true) {
			setPresence3(false);
			audioRefs.current[8].play();
			setTimeout(() => {
				videoRefs.current[3].play()
			}, 1000);
		}
		if (play4 == true) {
			setPresence4(false);
			audioRefs.current[9].play();
			setTimeout(() => {
				videoRefs.current[4].play()
			}, 1000);
		}
		if (play5 == true) {
			setPresence5(false);
			// audioRefs.current[10].play();
			setTimeout(() => {
				videoRefs.current[5].play()
			}, 1000);
		}


	}, [presence1, presence2, presence3, presence4, presence5, play1, play2, play3, play4, play5]);





	return (
		<div>
			{/* <img src={bg1} className="wall1" /> */}

			<video
				src={proximityLoop}
				key={"proximityLoop01"}
				id={"proximityLoop01"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				onEnded={() => setPresence1(false)}
				hidden={presence1 ? false : true}
				ref={(el) => (videoRefs.current[8] = el)}
			/>
			<audio
				src={proximityAudio01}
				preload="auto"
				autoPlay={false}
				loop={false}
				ref={(el) => (audioRefs.current[1] = el)}
			/>
			<video
				src={proximityLoop}
				key={"proximityLoop02"}
				id={"proximityLoop02"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				onEnded={() => setPresence2(false)}
				hidden={presence2 ? false : true}
				ref={(el) => (videoRefs.current[9] = el)}
			/>

			<audio
				src={proximityAudio02}
				preload="auto"
				autoPlay={false}
				loop={false}
				ref={(el) => (audioRefs.current[2] = el)}
			/>

			<video
				src={proximityLoop}
				key={"proximityLoop03"}
				id={"proximityLoop03"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				onEnded={() => setPresence3(false)}
				hidden={presence3 ? false : true}
				ref={(el) => (videoRefs.current[10] = el)}
			/>
			<audio
				src={proximityAudio03}
				preload="auto"
				autoPlay={false}
				loop={false}
				ref={(el) => (audioRefs.current[3] = el)}
			/>

			<video
				src={proximityLoop}
				key={"proximityLoop04"}
				id={"proximityLoop04"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				onEnded={() => setPresence4(false)}
				hidden={presence4 ? false : true}
				ref={(el) => (videoRefs.current[11] = el)}
			/>
			<audio
				src={proximityAudio04}
				preload="auto"
				autoPlay={false}
				loop={false}
				ref={(el) => (audioRefs.current[4] = el)}
			/>
			<video
				src={proximityLoop}
				key={"proximityLoop05"}
				id={"proximityLoop05"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				onEnded={() => setPresence5(false)}
				hidden={presence5 ? false : true}
				ref={(el) => (videoRefs.current[12] = el)}
			/>
			<audio
				src={proximityAudio05}
				preload="auto"
				autoPlay={false}
				loop={false}
				ref={(el) => (audioRefs.current[5] = el)}
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
				muted
				loop={false}
				ref={(el) => (videoRefs.current[1] = el)}
				hidden={play1 ? false : true}
				onEnded={() => setPlay1(false)}
			/>
			<audio
				src={animationAudio01}
				preload="auto"
				autoPlay={false}
				loop={false}
				ref={(el) => (audioRefs.current[6] = el)}
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
			<audio
				src={animationAudio02}
				preload="auto"
				autoPlay={false}
				loop={false}
				ref={(el) => (audioRefs.current[7] = el)}
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
			<audio
				src={animationAudio03}
				preload="auto"
				autoPlay={false}
				loop={false}
				ref={(el) => (audioRefs.current[8] = el)}
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
			<audio
				src={animationAudio04}
				preload="auto"
				autoPlay={false}
				loop={false}
				ref={(el) => (audioRefs.current[9] = el)}

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
