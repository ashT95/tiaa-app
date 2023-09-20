import React, { useState, useEffect, useRef } from "react";
import wall1 from "../../assets/images/wall-1-print.png";
import wholewall from "../../assets/images/Entire Wall layout.png"

export default function Window1(props) {
    const { selection } = props;
    let blocks1 = [22, 31, 32, 33, 42]

    return(
        <div className="background">
            <img src={wall1} onInvalid="wall1" />
            <div className="video1"></div>
        </div>
    )
}