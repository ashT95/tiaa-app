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

	let blocks1 = [13, 14, 15, 22, 23, 24];
	let blocks2 = [36, 37, 38, 46, 47, 48];
	let blocks3 = [21, 22, 23, 31, 32, 33];
	let blocks4 = [21, 22, 23, 31, 32, 33];
	let blocks5 = [21, 22, 23, 31, 32, 33];

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

	});

    function handleVideo(value) {
        switch(value) {
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

	return (
		<div className="wall2">
			<video
				src={ecology0}
				key={ecology0}
				id={"ecology"}
				preload="auto"
				autoPlay
				muted
				loop
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
				onEnded={() => setEcology(false)}
			/>
			<video
				src={friendship0}
				key={friendship0}
				id={"friendship"}
				preload="auto"
				autoPlay
				muted
				loop
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
				onEnded={() => setFriendship(false)}
			/>
			<video
				src={responsibleRealEstate0}
				key={responsibleRealEstate0}
				id={"responsibleRealEstate"}
				preload="auto"
				autoPlay
				muted
				loop
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
				onEnded={() => setResponsibleRealEstate(false)}
			/>
			<video
				src={conserving0}
				key={conserving0}
				id={"conserving"}
				preload="auto"
				autoPlay
				muted
				loop

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
				onEnded={() => setConserving(false)}
			/>
			<video
				src={grapeInvestments0}
				key={grapeInvestments0}
				id={"grapeInvestments"}
				preload="auto"
				autoPlay
				muted
				loop
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
				onEnded={() => setGrapeInvestments(false)}
			/>
		</div>
	);
}
