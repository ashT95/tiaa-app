import React, { useState, useEffect, useRef } from "react";
import "../base.css";
import bg2 from "../../assets/images/wall-2-print.png";

import img01 from "../../assets/Images/wall-2-title-animaiton-01.png";
import img02 from "../../assets/Images/wall-2-title-animaiton-02.png";
import img03 from "../../assets/Images/wall-2-title-animaiton-03.png";
import img04 from "../../assets/Images/wall-2-title-animaiton-04.png";
import img05 from "../../assets/Images/wall-2-title-animaiton-05.png";
import img06 from "../../assets/Images/wall-2-title-animaiton-06.png";

import friendship0 from "../../assets/Animations/Investing-in-Best-Friendship/BlkBG_BEST FRIENDSHIP_LOOP TAIL WAG_09262023.mp4";
import friendship1 from "../../assets/Animations/Investing-in-Best-Friendship/BLACKBG_ANIMATION BEAT_07312023.mp4";

import conserving0 from "../../assets/Animations/Conserving-Natural-Resources/BlkBG_Conserving Natural Resources_Projection_07272023.mp4";
import conserving1 from "../../assets/Animations/Conserving-Natural-Resources/BlkBG_Conserving Natural Resources_AnimationBeats_07312023.mp4";

import responsibleRealEstate0 from "../../assets/Animations/Responsible-Real-Estate/BlkBG_Responsible Real Estate_Projection_09222023.mp4";
import responsibleRealEstate1 from "../../assets/Animations/Responsible-Real-Estate/BLACKBG_Responsible Real Estate_AnimationBeat_09222023.mp4";

import grapeInvestments0 from "../../assets/Animations/Cheers-to-Grape-Investments/BlkBG_Projection_grape_loop_08022023.mp4";
import grapeInvestments1 from "../../assets/Animations/Cheers-to-Grape-Investments/BlkBG_ANIMATION BEATS_grape_loop_07202023.mp4";


export default function Window2(props) {
	const {
		play1,
		play2,
		play3,
		play4,
		setPlay1,
		setPlay2,
		setPlay3,
		setPlay4,
	} = props;

	// Wall cycle animation constants
	const [titleImage, setTitleImage] = useState(img01);
	const [counter, setCounter] = useState(0);

	const videoRefs = useRef([]);

	useEffect(() => {
		let interval;

		if (counter < 5) {
			interval = setInterval(() => {
				setCounter((counter) => counter + 1);
			}, 5000);
		} else if (counter == 5) {
			setCounter(0);
		}

		switch (counter) {
			case 0: {
				setTitleImage(img01);
				break;
			}
			case 1: {
				setTitleImage(img02);
				break;
			}
			case 2: {
				setTitleImage(img03);
				break;
			}
			case 3: {
				setTitleImage(img04);
				break;
			}
			case 4: {
				setTitleImage(img05);
				break;
			}
			case 5: {
				setTitleImage(img06);
				break;
			}
		}
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

		
		return () => {
			clearInterval(interval);
		};
	}, [
		titleImage,
		counter,
		play1, play2, play3, play4
	]);


	return (
		<div>
			<img src={bg2} className="wall2" />
			<img src={titleImage} id="title-image" />
			<video
				src={conserving0}
				key={conserving0}
				id={"conserving"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={play1 ? true : false}
			/>
			<video
				src={conserving1}
				key={conserving1}
				id={"conserving"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[1] = el)}
				hidden={play1 ? false : true}
				onEnded={() => setPlay1(false)}
			/>
			<video
				src={friendship0}
				key={friendship0}
				id={"friendship"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={play2 ? true : false}
			/>
			<video
				src={friendship1}
				key={friendship1}
				id={"friendship"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[2] = el)}
				hidden={play2 ? false : true}
				onEnded={() => setPlay2(false)}
			/>
			<video
				src={responsibleRealEstate0}
				key={responsibleRealEstate0}
				id={"responsibleRealEstate"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={play3 ? true : false}
			/>
			<video
				src={responsibleRealEstate1}
				key={responsibleRealEstate1}
				id={"responsibleRealEstate"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[3] = el)}
				hidden={play3 ? false : true}
				onEnded={() => setPlay3(false)}
			/>
			<video
				src={grapeInvestments0}
				key={grapeInvestments0}
				id={"grapeInvestments"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={play4 ? true : false}
			/>
			<video
				src={grapeInvestments1}
				key={grapeInvestments1}
				id={"grapeInvestments"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[4] = el)}
				hidden={play4 ? false : true}
				onEnded={() => setPlay4(false)}
			/>
		</div>
	);
}
