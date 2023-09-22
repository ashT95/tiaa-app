import React, { useState, useEffect, useRef } from "react";
import ecology0 from "../../assets/videos/Ecology-Begins-at-Home/BlkBG_Bees Projection Loop_07212023.mp4";
import ecology1 from "../../assets/videos/Ecology-Begins-at-Home/BlkBG_Bees Animation Beat_07212023.mp4";

import friendship0 from "../../assets/videos/Investing-in-Best-Friendship/BlkBG_BEST FRIENDSHIP_LOOP TAIL WAG_07312023.mp4";
import friendship1 from "../../assets/videos/Investing-in-Best-Friendship/BLACKBG_ANIMATION BEAT_07312023.mp4";

import conserving0 from "../../assets/videos/Conserving-Natural-Resources/BlkBG_Conserving Natural Resources_Projection_07272023.mp4";
import conserving1 from "../../assets/videos/Conserving-Natural-Resources/BlkBG_Conserving Natural Resources_AnimationBeats_07312023.mp4";

import responsibleRealEstate0 from "../../assets/videos/Responsible-Real-Estate/BlkBG_Responsible Real Estate_Projection_07262023.mp4";
import responsibleRealEstate1 from "../../assets/videos/Responsible-Real-Estate/BlkBG_Responsible Real Estate_AnimationBeat_07262023.mp4";

import grapeInvestments0 from "../../assets/videos/Cheers to Grape Investments/BlkBG_Projection_grape_loop_08022023.mp4";
import grapeInvestments1 from "../../assets/videos/Cheers to Grape Investments/BlkBG_ANIMATION BEATS_grape_loop_07202023.mp4";

export default function Window2(props) {
	const { selection } = props;

	// Wall two state variables
	const [ecology, setEcology] = useState(false);
	const [friendship, setFriendship] = useState(false);
	const [conserving, setConserving] = useState(false);
	const [responsibleRealEstate, setResponsibleRealEstate] = useState(false);
	const [grapeInvestments, setGrapeInvestments] = useState(false);

	let blocks1 = [11, 12, 13, 20, 21, 22];
	let blocks2 = [31, 32, 40, 41];
	let blocks3 = [15, 16, 17, 25 ];
	let blocks4 = [23, 24, 33, 34];
	let blocks5 = [35, 36, 44, 45];

	const videoRefs = useRef([]);

	useEffect(() => {
		if (blocks1.includes(selection)) {
			handleVideo(0)
		}
		if (blocks2.includes(selection)) {
			handleVideo(1)
		}
		if (blocks3.includes(selection)) {
			handleVideo(2)
		}
		if (blocks4.includes(selection)) {
			handleVideo(3)
		}
		if (blocks5.includes(selection)) {
			handleVideo(4)
		}

		if (ecology) {
			videoRefs.current[0].play();
		}

		if (friendship) {
			videoRefs.current[1].play();
		}

		if (responsibleRealEstate) {
			videoRefs.current[2].play();
		}

		if (conserving) {
			videoRefs.current[3].play();
		}

		if (grapeInvestments) {
			videoRefs.current[4].play();
		}

	}, [selection, ecology, friendship, responsibleRealEstate, conserving, grapeInvestments]);

	function handleVideo(value) {
		switch (value) {
			case 0: {
				setEcology(true);
				break;
			}
			case 1: {
				setFriendship(true);
				break;
			}
			case 2: {
				setResponsibleRealEstate(true);
				break;
			}
			case 3: {
				setConserving(true);
				break;
			}
			case 4: {
				setGrapeInvestments(true);
				break;
			}
		}
	}

	function handleEnd(value) {
		switch (value) {
			case 0: {
				setEcology(false);
				videoRefs.current[0].currentTime = 0;
				videoRefs.current[0].pause()
				break;
			}
			case 1: {
				setFriendship(false);
				videoRefs.current[1].currentTime = 0;
				videoRefs.current[1].pause()
				break;
			}
			case 2: {
				setResponsibleRealEstate(false);
				videoRefs.current[2].currentTime = 0;
				videoRefs.current[2].pause()
				break;
			}
			case 3: {
				setConserving(false);
				videoRefs.current[3].currentTime = 0;
				videoRefs.current[3].pause()
				break;
			}
			case 4: {
				setGrapeInvestments(false);
				videoRefs.current[4].currentTime = 0;
				videoRefs.current[4].pause()
				break;
			}
		}
	}



	return (
		<div className="wall2">
			<video
				src={ecology0}
				key={ecology0}
				id={"ecology"}
				preload="auto"
				autoPlay={true}
				muted
				loop={true}
			/>
			<video
				src={ecology1}
				key={ecology1}
				id={"ecology"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[0] = el)}
				hidden={ecology ? false : true}
				onEnded={() => handleEnd(0)}
			/>
			<video
				src={friendship0}
				key={friendship0}
				id={"friendship"}
				preload="auto"
				autoPlay={true}
				muted
				loop={true}
				hidden={friendship ? true : false}
			/>
			<video
				src={friendship1}
				key={friendship1}
				id={"friendship"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[1] = el)}
				hidden={friendship ? false : true}
				onEnded={() => handleEnd(1)}
			/>
			<video
				src={responsibleRealEstate0}
				key={responsibleRealEstate0}
				id={"responsibleRealEstate"}
				preload="auto"
				autoPlay={true}
				muted
				loop={true}
				hidden={responsibleRealEstate ? true : false}
			/>
			<video
				src={responsibleRealEstate1}
				key={responsibleRealEstate1}
				id={"responsibleRealEstate"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[2] = el)}
				hidden={responsibleRealEstate ? false : true}
				onEnded={() => handleEnd(2)}
			/>
			<video
				src={conserving0}
				key={conserving0}
				id={"conserving"}
				preload="auto"
				autoPlay={true}
				muted
				loop={true}

				hidden={conserving ? true : false}
			/>
			<video
				src={conserving1}
				key={conserving1}
				id={"conserving"}
				preload="auto"
				autoPlay={false}
				muted
				loop={false}
				ref={(el) => (videoRefs.current[3] = el)}
				hidden={conserving ? false : true}
				onEnded={() => handleEnd(3)}
			/>
			<video
				src={grapeInvestments0}
				key={grapeInvestments0}
				id={"grapeInvestments"}
				preload="auto"
				autoPlay={true}
				muted
				loop={true}
				hidden={grapeInvestments ? true : false}
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
				hidden={grapeInvestments ? false : true}
				onEnded={() => handleEnd(4)}
			/>
		</div>
	);
}
