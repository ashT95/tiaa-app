import React, { useState, useEffect, useRef } from "react";
import "../base.css";
import bg1 from "../../assets/images/wall-1-print.png";

import notJustForTeachers from "../../assets/Animations/Not-Just-for-Teachers/BlkBG_Teachers_Animation Beat_07132023.mp4";
import foundedOnPrinciple from "../../assets/Animations/Founded-on-Principle/BLACKBG_Andrew Carnegie_Animation Beat_09132023.mp4";
import wereOnAMission from "../../assets/Animations/We're-on-a-Mission/BLACKBG_We're on a Mission_ANIMATION BEAT_09082023.mp4";

import neverMissACheck0 from "../../assets/Animations/Never-Miss-a-Check/BLACK BG_CHECKS_PROJECTION_9212023.mp4";
import neverMissACheck1 from "../../assets/Animations/Never-Miss-a-Check/BLACKBG_NEVER MISS A CHECK_ANIMATION BEAT_09212023.mp4";

export default function Window1(props) {
	const { play1, play2, play3, play4, play5 } = props;

	// wall one state variables
	const [source0Play, setSource0Play] = useState(false);
	const [source1Play, setSource1Play] = useState(false);
	const [source2Play, setSource2Play] = useState(false);
	const [check, setCheck] = useState(false);

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
				src={notJustForTeachers}
				key={notJustForTeachers}
				id={"teachers0"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[0] = el)}
			/>
			<video
				src={wereOnAMission}
				key={wereOnAMission}
				id={"mission0"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[1] = el)}
				onClick={() => setSource1Play(true)}
				onEnded={() => setSource1Play(false)}
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
				src={neverMissACheck0}
				key={neverMissACheck0}
				id={"check"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={check ? true : false}
				onClick={() => handleClick(3)}
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
				hidden={check ? false : true}
				onEnded={() => setCheck(false)}
			/>
		</div>
	);
}
