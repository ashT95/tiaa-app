import React, { useState, useEffect, useRef } from "react";
import empoweringAbilities0 from "../../assets/videos/Empowering-Abilities/BlackBG_EmpoweringAbilitirs_Projection_09112023.mp4";
import empoweringAbilities1 from "../../assets/videos/Empowering-Abilities/BLACKBG_EmpoweringAbilitirs_Animation Beats_09112023.mp4";

import financialLiteracy0 from "../../assets/videos/Financial-Literacy/BlkBG_Financial Literacy_Projection_07242023.mp4";
import financialLiteracy1 from "../../assets/videos/Financial-Literacy/BlkBG_Financial Literacy_Animation Beat_07242023.mp4";

export default function Window3(props) {
	const { selection } = props;

	// Wall three state variables
	const [financialLiteracy, setFinancialLiteracy] = useState(false);
	const [empoweringAbilities, setEmpoweringAbilities] = useState(false);

	let blocks1 = [13, 14, 15, 22, 23, 24];
	let blocks2 = [36, 37, 38, 46, 47, 48];
	let blocks3 = [21, 22, 23, 31, 32, 33];
	let blocks4 = [21, 22, 23, 31, 32, 33];
	let blocks5 = [21, 22, 23, 31, 32, 33];

	const videoRefs = useRef([]);

	useEffect(() => {
		if (blocks1.includes(selection)) {
			handleVideo(0);
		}
		if (blocks2.includes(selection)) {
			handleVideo(1);
		}

		if (financialLiteracy) {
			videoRefs.current[0].play();
		}

		if (empoweringAbilities) {
			videoRefs.current[1].play();
		}
	});

	function handleVideo(value) {
		switch (value) {
			case 0: {
				setFinancialLiteracy(true);
				break;
			}
			case 1: {
				setEmpoweringAbilities(true);
				break;
			}
		}
	}

	return (
		<div className="wall3">
			<video
				src={financialLiteracy0}
				key={financialLiteracy0}
				id={"financialLiteracy"}
				preload="auto"
				autoPlay
				muted
				loop
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
				ref={(el) => (videoRefs.current[0] = el)}
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
				ref={(el) => (videoRefs.current[1] = el)}
				hidden={empoweringAbilities ? false : true}
				onEnded={() => setEmpoweringAbilities(false)}
			/>
		</div>
	);
}
