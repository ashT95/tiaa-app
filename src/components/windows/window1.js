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

	const [prox1, setProx1] = useState(false);
	const [prox2, setProx2] = useState(false);
	const [prox3, setProx3] = useState(false);
	const [prox4, setProx4] = useState(false);
	const [prox5, setProx5] = useState(false);

	const [audio1, setAudio1] = useState(false);
	const [audio2, setAudio2] = useState(false);
	const [audio3, setAudio3] = useState(false);
	const [audio4, setAudio4] = useState(false);
	const [audio5, setAudio5] = useState(false);

	useEffect(() => {
		if (play1) {
			setProx1(false);
			audioRefs.current[6].play();
			setTimeout(() => videoRefs.current[1].play(), 1000);
		}
		if (play2) {
			setProx2(false);
			audioRefs.current[7].play();
			setTimeout(() => videoRefs.current[2].play(), 1000);
		}
		if (play3) {
			setProx3(false);
			audioRefs.current[8].play();
			setTimeout(() => {
				videoRefs.current[3].play();
				videoRefs.current[6].play();
			}, 1000);
		}
		if (play4) {
			setProx4(false);
			audioRefs.current[9].play();
			setTimeout(() => videoRefs.current[4].play(), 1800);
		}
		if (play5) {
			setProx5(false);
			videoRefs.current[5].play();
		}

		// proximity animations
		if (presence1) {
			handlePresence(1);
		}
		if (presence2) {
			handlePresence(2);
		}
		if (presence3) {
			handlePresence(3);
		}
		if (presence4) {
			handlePresence(4);
		}
		if (presence5) {
			handlePresence(5);
		}

		if (prox1) {
			videoRefs.current[8].play();
		}
		if (prox2) {
			videoRefs.current[9].play();
		}
		if (prox3) {
			videoRefs.current[10].play();
		}
		if (prox4) {
			videoRefs.current[11].play();
		}
		if (prox5) {
			videoRefs.current[12].play();
		}

		if (audio1) {
			audioRefs.current[1].play();
		}
		if (audio2) {
			audioRefs.current[2].play();
		}
		if (audio3) {
			audioRefs.current[3].play();
		}
		if (audio4) {
			audioRefs.current[4].play();
		}
		if (audio5) {
			audioRefs.current[5].play();
		}

		if (presence1) {
			handlePresence(1)
		}
		if (presence2) {
			handlePresence(2)
		}
		if (presence3) {
			handlePresence(3)
		}
		if (presence4) {
			handlePresence(4)
		}
		if (presence5) {
			handlePresence(5)
		}
	}, [
		play1,
		play2,
		play3,
		play4,
		play5,
		prox1,
		prox2,
		prox3,
		prox4,
		prox5,
		audio1,
		audio2,
		audio3,
		audio4,
		audio5,
		presence1,
		presence2,
		presence3,
		presence4,
		presence5,
	]);

	function handlePresence(num) {
		switch (num) {
			case 1: {
				setProx1(true);
				setAudio1(true);
				break;
			}
			case 2: {
				setProx2(true);
				setAudio2(true);
				break;
			}
			case 3: {
				setProx3(true);
				setAudio3(true);
				break;
			}
			case 4: {
				setProx4(true);
				setAudio4(true);
				break;
			}
			case 5: {
				setProx5(true);
				setAudio5(true);
				break;
			}
		}
	}

	function handleEnd(num) {
		videoRefs.current[num].currentTime = 0;

	}

	return (
		<div>
			{/* <img src={bg1} className="wall1" /> */}
			<div>
				<video
					src={proximityLoop}
					key={"proximityLoop01"}
					id={"proximityLoop01"}
					preload="auto"
					autoPlay={false}
					muted
					loop={false}
					onEnded={() => setProx1(false) && setPresence1(false)}
					hidden={prox1 ? false : true}
					ref={(el) => (videoRefs.current[8] = el)}
				/>
				<audio
					src={proximityAudio01}
					autoPlay={false}
					loop={false}
					ref={(el) => (audioRefs.current[1] = el)}
					onEnded={() => setAudio1(false)}
				/>
				<video
					src={proximityLoop}
					key={"proximityLoop02"}
					id={"proximityLoop02"}
					preload="auto"
					autoPlay={false}
					muted
					loop={false}
					onEnded={() => setProx2(false)}
					hidden={prox2 ? false : true}
					ref={(el) => (videoRefs.current[9] = el)}
				/>
				<audio
					src={proximityAudio02}
					autoPlay={false}
					loop={false}
					ref={(el) => (audioRefs.current[2] = el)}
					onEnded={() => setAudio2(false)}
				/>
				<video
					src={proximityLoop}
					key={"proximityLoop03"}
					id={"proximityLoop03"}
					preload="auto"
					autoPlay={false}
					muted
					loop={false}
					onEnded={() => setProx3(false)}
					hidden={prox3 ? false : true}
					ref={(el) => (videoRefs.current[10] = el)}
				/>
				<audio
					src={proximityAudio03}
					autoPlay={false}
					loop={false}
					ref={(el) => (audioRefs.current[3] = el)}
					onEnded={() => setAudio3(false)}
				/>
				<video
					src={proximityLoop}
					key={"proximityLoop04"}
					id={"proximityLoop04"}
					preload="auto"
					autoPlay={false}
					muted
					loop={false}
					onEnded={() => setProx4(false)}
					hidden={prox4 ? false : true}
					ref={(el) => (videoRefs.current[11] = el)}
				/>
				<audio
					src={proximityAudio04}
					autoPlay={false}
					loop={false}
					ref={(el) => (audioRefs.current[4] = el)}
					onEnded={() => setAudio4(false)}
				/>
				<video
					src={proximityLoop}
					key={"proximityLoop05"}
					id={"proximityLoop05"}
					preload="auto"
					autoPlay={false}
					muted
					loop={false}
					onEnded={() => setProx5(false)}
					hidden={prox5 ? false : true}
					ref={(el) => (videoRefs.current[12] = el)}
				/>
				<audio
					src={proximityAudio05}
					autoPlay={false}
					loop={false}
					ref={(el) => (audioRefs.current[5] = el)}
					onEnded={() => setAudio5(false)}
				/>
			</div>
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
				onClick={() => setPlay1(true)}
				onMouseEnter={() => handlePresence(1)}
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
				onClick={() => setPlay2(true)}
				onMouseEnter={() => handlePresence(2)}
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
				onClick={() => setPlay3(true)}
				onMouseEnter={() => handlePresence(3)}
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
				onClick={() => setPlay4(true)}
				onMouseEnter={() => handlePresence(4)}
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
				onEnded={() => setTimeout(() => {
					setPlay4(false)
				}, 1000)}
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
				onClick={() => setPlay5(true)}
				onMouseEnter={() => handlePresence(5)}
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
