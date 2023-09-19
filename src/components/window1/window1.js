import React, { useState, useEffect, useRef } from "react";
import wall1 from "../../assets/images/wall-1-print.png";
import wholewall from "../../assets/images/Entire Wall layout.png"

export default function Window1(props) {
    const {} = props;

    return(
        <div className="background">
            <img src={wholewall} alt="wall1" />
            <div className="video1"></div>
        </div>
    )
}