import React, { useState, useEffect, useRef } from "react";
import notJustForTeachers from "../../assets/videos/Not-Just-for-Teachers/BlkBG_Teachers_Animation Beat_07132023.mp4";
import wereOnAMission from "../../assets/videos/We're-on-a-Mission/BLACKBG_We_re on a Mission_ANIMATION BEAT_09082023.mp4";
import foundedOnPrinciple from "../../assets/videos/Andrew-Carnegie/BlkBG_Andrew Carnegie_Animation Beat_08042023.mp4";
import wall1 from "../../assets/images/wall-1-print.png";

export default function Window1(props) {
	const { selection } = props;

	let blocks1 = [13, 14, 15, 22, 23, 24];
	let blocks2 = [36, 37, 38, 46, 47, 48];
	let blocks3 = [21, 22, 23, 31, 32, 33];

	const videoRefs = useRef([]);

	useEffect(() => {
		if (blocks1.includes(selection)) {
			videoRefs.current[0].play();
		}
		if (blocks2.includes(selection)) {
			videoRefs.current[1].play();
		}
		if (blocks3.includes(selection)) {
			videoRefs.current[2].play();
		}
	});

	return (
		<div className="wall1">
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
			/>
		</div>
	);
}
