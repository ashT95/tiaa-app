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
	const { selection } = props;

	// Wall three state variables
	const [financialLiteracy, setFinancialLiteracy] = useState(false);
	const [empoweringAbilities, setEmpoweringAbilities] = useState(false);
	const [groundbreakingCEOs, setGroundbreakingCEOs] = useState(false);
	const [girlsInTech, setGirlsInTech] = useState(false);
	const [retiringInequality, setRetiringInequality] = useState(false);

	const videoRefs = useRef([]);

	useEffect(() => {
		if (girlsInTech) {
			videoRefs.current[1].play();
		}

		if (financialLiteracy) {
			videoRefs.current[2].play();
		}

		if (empoweringAbilities) {
			videoRefs.current[3].play();
		}

		if (groundbreakingCEOs) {
			videoRefs.current[4].play();
		}

		if (retiringInequality) {
			videoRefs.current[5].play();
		}
	}, [
		financialLiteracy,
		empoweringAbilities,
		groundbreakingCEOs,
		girlsInTech,
		retiringInequality,
	]);

	function handleClick(num) {
		switch (num) {
			case 1: {
				setGirlsInTech(true);
				break;
			}
			case 2: {
				setFinancialLiteracy(true);
				break;
			}
			case 3: {
				setEmpoweringAbilities(true);
				break;
			}
			case 4: {
				setGroundbreakingCEOs(true);
				break;
			}
			case 5: {
				setRetiringInequality(true);
				break;
			}
		}
	}

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
				onClick={() => handleClick(1)}
				hidden={girlsInTech ? true : false}
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
				hidden={girlsInTech ? false : true}
				onEnded={() => setGirlsInTech(false)}
			/>
			<video
				src={financialLiteracy0}
				key={financialLiteracy0}
				id={"financialLiteracy"}
				preload="auto"
				autoPlay
				muted
				loop
				onClick={() => handleClick(2)}
				hidden={financialLiteracy ? true : false}
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
				hidden={financialLiteracy ? false : true}
				onEnded={() => setFinancialLiteracy(false)}
			/>
			<video
				src={empoweringAbilities0}
				key={empoweringAbilities0}
				id={"empoweringAbilities"}
				preload="auto"
				autoPlay
				muted
				loop
				onClick={() => handleClick(3)}
				hidden={empoweringAbilities ? true : false}
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
				hidden={empoweringAbilities ? false : true}
				onEnded={() => setEmpoweringAbilities(false)}
			/>
			<video
				src={groundbreakingCEOs0}
				key={groundbreakingCEOs0}
				id={"groundbreakingCEOs"}
				preload="auto"
				autoPlay
				muted
				loop
				onClick={() => handleClick(4)}
				hidden={groundbreakingCEOs ? true : false}
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
				hidden={groundbreakingCEOs ? false : true}
				onEnded={() => setGroundbreakingCEOs(false)}
			/>
			<video
				src={retiringInequality0}
				key={retiringInequality0}
				id={"retiringInequality"}
				preload="auto"
				autoPlay
				muted
				loop
				onClick={() => handleClick(5)}
				hidden={retiringInequality ? true : false}
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
				hidden={retiringInequality ? false : true}
				onEnded={() => setRetiringInequality(false)}
			/>
		</div>
	);
}
