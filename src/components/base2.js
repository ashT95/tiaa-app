import React, { useState, useEffect, useRef } from "react";
import "./base.css";

import friendship0 from "../assets/Animations/_ProjectionLoopsSmaller/BLACKBG_INVESTING WITH IMPACT_PROJECTION_SMALLER_10182023.mp4";
import friendship1 from "../assets/Animations/_AnimationsWithSound/INVESTING WITH IMPACT_SOUND.mp4";

import conserving0 from "../assets/Animations/_ProjectionLoopsSmaller/BLACKBG_CONSERVING NATURAL RESOURCES_PROJECTION_SMALLER_10182023.mp4";
import conserving1 from "../assets/Animations/_AnimationsWithSound/CONSERVING NATURAL RESOURCES_SOUND.mp4";

import responsibleRealEstate0 from "../assets/Animations/Responsible-Real-Estate/BlkBG_Responsible Real Estate_Projection_09222023.mp4";
import responsibleRealEstate1 from "../assets/Animations/Responsible-Real-Estate/BlackBG_Responsible Real Estate_AnimationBeat_10062023.mp4";

import grapeInvestments0 from "../assets/Animations/_ProjectionLoopsSmaller/BLACKBG_VINEYARDS_PROJECTION_SMALLER_10182023.mp4";
import grapeInvestments1 from "../assets/Animations/_AnimationsWithSound/SUSTAINABLE VINEYARDS_SOUND.mp4";

import shootingStar from "../assets/Animations/_Miscellaneous/BlackBG_Wall 2_ShootingStar_10162023.mp4";
import titleAnimation from "../assets/Animations/_Miscellaneous/wall2-title-animation.mp4";
import bgAnim2 from "../assets/Animations/_Miscellaneous/BlackBG_Wall 2_STARS AND PLANTS_10162023.mp4";

import proxVid1 from "../assets/Animations/Proximity/proximity-popup_B.mp4";
import proxVid2 from "../assets/Animations/Proximity/proximity-popup_C.mp4";
import proxVid3 from "../assets/Animations/Proximity/proximity-popup_D.mp4";
import proxVid4 from "../assets/Animations/Proximity/proximity-popup_E.mp4";


export default function Base2() {
	const [friendship, setFriendship] = useState(false);
	const [conserving, setConserving] = useState(false);
	const [responsibleRealEstate, setResponsibleRealEstate] = useState(false);
	const [grapeInvestments, setGrapeInvestments] = useState(false);

	const [presence1, setPresence1] = useState(false);
	const [presence2, setPresence2] = useState(false);
	const [presence3, setPresence3] = useState(false);
	const [presence4, setPresence4] = useState(false);

	const videoRefs = useRef([]);

	window.ipcRender.receive("main-to-render", (result) => {
		//getting coordinates of users' hands

		handleInteraction(result);
	});

	useEffect(() => {
		if (presence1) {
			!conserving ? videoRefs.current[5].play() : null
		}
		if (presence2) {
			!friendship ? videoRefs.current[6].play() : null
		}
		if (presence3) {
			!responsibleRealEstate ? videoRefs.current[7].play() : null
		}
		if (presence4) {
			!grapeInvestments ? videoRefs.current[8].play() : null
		}

		if (conserving) {
			setPresence1(false)
			videoRefs.current[1].play();
		}

		if (friendship) {
			setPresence2(false)
			videoRefs.current[2].play();
		}

		if (responsibleRealEstate) {
			setPresence3(false)
			videoRefs.current[3].play();
		}

		if (grapeInvestments) {
			setPresence4(false)
			videoRefs.current[4].play();
		}
	}, [
		presence1,
		presence2,
		presence3,
		presence4,
		friendship,
		conserving,
		responsibleRealEstate,
		grapeInvestments,
	]);

	function handleInteraction(name) {
		switch (name) {
			case "prox1": {
				!presence1 ? setPresence1(true) : null
				break;
			}
			case "prox2": {
				!presence2 ? setPresence2(true) : null
				break;
			}
			case "prox3": {
				!presence3 ? setPresence3(true) : null
				break;
			}
			case "prox4": {
				!presence4 ? setPresence4(true) : null
				break;
			}

			case "play1": {
				setPresence1(false);
				setConserving(true);
				break;
			}
			case "play2": {
				setPresence2(false);
				setFriendship(true);
				break;
			}
			case "play3": {
				setPresence3(false);
				setResponsibleRealEstate(true);
				break;
			}
			case "play4": {
				setPresence4(false);
				setGrapeInvestments(true);
				break;
			}
		}
	}

	return (
		<div className="background2">
			<video
				src={titleAnimation}
				key={titleAnimation}
				id={"titleAnimation"}
				preload="auto"
				autoPlay
				muted
				loop
			/>

			<video
				src={shootingStar}
				key={shootingStar}
				id={"shootingStar"}
				preload="auto"
				autoPlay
				muted
				loop
			/>
			<video
				src={bgAnim2}
				key={bgAnim2}
				id={"bgAnim2"}
				preload="auto"
				autoPlay
				muted
				loop
			/>
			<video
				src={proxVid1}
				key="proximityLoop21"
				id="proximityLoop21"
				preload="auto"
				muted="false"
				ref={(el) => (videoRefs.current[5] = el)}
				onEnded={() => setPresence1(false)}
				hidden={presence1 ? false : true}
			/>
			<video
				src={proxVid2}
				key="proximityLoop22"
				id="proximityLoop22"
				preload="auto"
				muted="false"
				ref={(el) => (videoRefs.current[6] = el)}
				onEnded={() => setPresence2(false)}
				hidden={presence2 ? false : true}
			/>
			<video
				src={proxVid3}
				key="proximityLoop23"
				id="proximityLoop23"
				preload="auto"
				muted="false"
				ref={(el) => (videoRefs.current[7] = el)}
				onEnded={() => setPresence3(false)}
				hidden={presence3 ? false : true}
			/>
			<video
				src={proxVid4}
				key="proximityLoop24"
				id="proximityLoop24"
				preload="auto"
				muted="false"
				ref={(el) => (videoRefs.current[8] = el)}
				onEnded={() => setPresence4(false)}
				hidden={presence4 ? false : true}
			/>

			{/* interaction videos */}

			<video
				src={friendship0}
				key={friendship0}
				id={"friendship"}
				preload="auto"
				autoPlay
				muted
				loop
				hidden={friendship ? true : false}
				onMouseEnter={() => setPresence2(true)}
			/>
			<video
				src={friendship1}
				key={friendship1}
				id={"friendship"}
				preload="auto"
				autoPlay={false}
				loop={false}
				ref={(el) => (videoRefs.current[2] = el)}
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
				onMouseEnter={() => setPresence3(true)}
			/>
			<video
				src={responsibleRealEstate1}
				key={responsibleRealEstate1}
				id={"responsibleRealEstate"}
				preload="auto"
				autoPlay={false}
				loop={false}
				ref={(el) => (videoRefs.current[3] = el)}
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
				onMouseEnter={() => setPresence1(true)}
			/>
			<video
				src={conserving1}
				key={conserving1}
				id={"conserving"}
				preload="auto"
				autoPlay={false}
				loop={false}
				ref={(el) => (videoRefs.current[1] = el)}
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
				onMouseEnter={() => setPresence4(true)}
			/>
			<video
				src={grapeInvestments1}
				key={grapeInvestments1}
				id={"grapeInvestments"}
				preload="auto"
				autoPlay={false}
				loop={false}
				ref={(el) => (videoRefs.current[4] = el)}
				hidden={grapeInvestments ? false : true}
				onEnded={() => setGrapeInvestments(false)}
			/>
		</div>
	);
}
