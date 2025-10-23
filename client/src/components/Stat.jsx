import React from "react";

const Stat = ({ statPower, stat }) => {
  return (
    <div className="border flex flex-col justify-center items-center rounded bg-[var(--statBox)] ">
      <div>{stat}</div>
      <div>{statPower} </div>
    </div>
  );
};

export default Stat;
