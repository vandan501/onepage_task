import React from "react";
import GradeedTrue from "../images/Ellipse 176.svg";
import GradeedTrueCompleted from "../images/Vector 16.svg";

function Isgradedtrue()
{

return(
    <>
    <div className="flex justify-center items-center">
    <img
    src={GradeedTrue}
    alt="Icon"
    className="w-[20px] h-[20px]"
  />
  <img
    src={GradeedTrueCompleted}
    alt="Icon"
    className="w-[10px] h-[9px] absolute z-10"
  />
  </div>

    </>
);
}

export default Isgradedtrue;