import React, { useState, useEffect, useRef } from "react";
import "../base.css";
import bg3 from "../../assets/images/wall-3-print.png";

import empoweringAbilities0 from "../../assets/Animations/Empowering-Abilities/BLACKBG_Empowering_PROJECTION_09222023_NEW.mp4";
import empoweringAbilities1 from "../../assets/Animations/Empowering-Abilities/BlackBG_EmpoweringAbilitirs_Animation Beats_09112023_NEW.mp4";

import financialLiteracy0 from "../../assets/Animations/Financial-Literacy/BlkBG_Financial Literacy_Projection_07242023.mp4";
import financialLiteracy1 from "../../assets/Animations/Financial-Literacy/BlkBG_Financial Literacy_Animation Beat_07242023.mp4";

import girlsInTech0 from "../../assets/Animations/Girls-in-Tech/BlackBG_GIRLS IN TECH_PROJECTION 09132023.mp4";
import girlsInTech1 from "../../assets/Animations/Girls-in-Tech/BLACK_TEST 2_GIRLS IN TECH_wall-3-print.mp4";

import groundbreakingCEOs0 from "../../assets/Animations/Groundbreaking-CEOs/BlackBG_CEOs_PROJECTION_09122023.mp4";
import groundbreakingCEOs1 from "../../assets/Animations/Groundbreaking-CEOs/BlackBG_CEOs_ANIMATION BEATS-09142023.mp4";

import retiringInequality0 from "../../assets/Animations/Retiring-Inequality/BLACKBG_Retiring Inequality_PROJECTION_09192023.mp4";
import retiringInequality1 from "../../assets/Animations/Retiring-Inequality/BlackBG_Retiring Inequality_ANIMATION BEATS_09212023.mp4";

export default function Window3(props) {
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
			<img src={bg3} className="wall3" />
			<video
				src={girlsInTech0}
				key={girlsInTech0}
				id={"girlsInTech0"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={play1 ? true : false}
			/>
			<video
				src={girlsInTech1}
				key={girlsInTech1}
				id={"girlsInTech1"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[1] = el)}
				hidden={play1 ? false : true}
				onEnded={() => setPlay1(false)}
			/>
			<video
				src={financialLiteracy0}
				key={financialLiteracy0}
				id={"financialLiteracy"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={play2 ? true : false}
			/>
			<video
				src={financialLiteracy1}
				key={financialLiteracy1}
				id={"financialLiteracy"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[2] = el)}
				hidden={play2 ? false : true}
				onEnded={() => setPlay2(false)}
			/>
			<video
				src={empoweringAbilities0}
				key={empoweringAbilities0}
				id={"empoweringAbilities"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={play3 ? true : false}
			/>
			<video
				src={empoweringAbilities1}
				key={empoweringAbilities1}
				id={"empoweringAbilities"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[3] = el)}
				hidden={play3 ? false : true}
				onEnded={() => setPlay3(false)}
			/>
			<video
				src={groundbreakingCEOs0}
				key={groundbreakingCEOs0}
				id={"groundbreakingCEOs"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={play4 ? true : false}
			/>
			<video
				src={groundbreakingCEOs1}
				key={groundbreakingCEOs1}
				id={"groundbreakingCEOs"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[4] = el)}
				hidden={play4 ? false : true}
				onEnded={() => setPlay4(false)}
			/>
			<video
				src={retiringInequality0}
				key={retiringInequality0}
				id={"retiringInequality"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={play5 ? true : false}
			/>
			<video
				src={retiringInequality1}
				key={retiringInequality1}
				id={"retiringInequality"}
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
