import React from "react";
import Button from "./Button";
import Stat from "./Stat";
import { useNavigate } from "react-router-dom";

const CharacterCard = ({ character }) => {
  const navigate = useNavigate();
  const handleView = (character) => {
    navigate(`/character/${character._id}`);
  };
  const handleEdit = () => {
    console.log(
      "Delete the character from data base and update the list imdiately"
    );
  };

  return (
    <div
      id={character._id}
      className="w-full max-w-[320px] h-[260px] bg-[var(--)] border border-gray-200 rounded-xl p-4 flex flex-col justify-between shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-[1.02]"
    >
      
      {/* Header Info (Name, Race, Class) */}
      <div className="flex justify-between items-start border-b pb-2 mb-2">
        <div className="flex flex-col overflow-hidden w-52">
          <div className="font-extrabold text-xl text-indigo-800 truncate">{character.name}</div>
          <div className="text-xs font-semibold text-gray-500 flex gap-1 items-center">
            <span className='truncate'>{character.race}</span>
            <span className="text-gray-400">•</span>
            <span className='truncate'>{character.class}</span>
          </div>
        </div>
        <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${character.status === 'Alive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          Lv. {character.level}
        </div>
      </div>
      
      {/* Stats Grid */}
      <div id="stats" className="grid grid-cols-4 gap-x-2 ">
        <Stat stat={"STR"} statPower={character.stats.strength} />
        <Stat stat={"INT"} statPower={character.stats.intelligence} />
        <Stat stat={"AGI"} statPower={character.stats.agility} />
        <Stat stat={"LUC"} statPower={character.stats.luck} />
      </div>
      
      {/* Buttons */}
      <div id="btns" className="flex justify-between gap-x-3 pt-3 border-t">
        <button
          onClick={()=>{handleView(character)}}
          className="flex-1"
        >
          <Button text={"View"} color="var(--secondary)" />
        </button>
        {/* <button 
          onClick={handleEdit}
          className="flex-1"
        >
          <Button text={"Edit"} color="var(--primary)" />
        </button> */}
      </div>
    </div>
  );
};

export default CharacterCard;
