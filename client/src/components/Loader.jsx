import React from "react";
// Don't forget to create a HamsterSpinner.css file and put the CSS there

const HamsterSpinner = () => {
  return (
    // Use an inline style to set the CSS variable,
    // which controls the animation duration.
    <div className="mt-40 flex items-center justify-center">
      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        className="wheel-and-hamster"
        style={{ "--dur": "1s" }} // Setting the CSS variable --dur
      >
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>
    </div>
  );
};

export default HamsterSpinner;
