import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "@/components/Loader";
import Stat from "@/components/Stat"; 

const CharacterPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleCharacter = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/characters/${id}`
      );
      setCharacter(res.data);
    } catch (error) {
      console.error("Error fetching character:", error);
      setCharacter(null); // Ensure null on error
      setHasError(true); // Set error state
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    handleCharacter();
  }, [handleCharacter]);

  // --- Render Logic ---

  if (isLoading) {
    return <Loader />;
  }

  if (hasError || !character) {
    return (
      <div className="text-center p-10">
        <h1 className="text-xl font-bold text-red-600">
          Error: Character Not Found 🏴‍☠️
        </h1>
        <p>Could not load character with ID: {id}. Please check the ID or API status.</p>
      </div>
    );
  }

  // Safely access stats, defaulting to an empty object if stats is missing or null
  const stats = character.stats || {};
  const specialAbility = character["special ability"] || "none";

  return (
    <div className="mx-4 my-2">
      <div className="">
        <div className="flex flex-col">
          <div className="font-bold text-lg">Character Sheet</div>
          <div className="text-[10px] flex gap-1">
            <div>{`Viewing ${character.name}`}</div>
            <div>{"•"}</div>
            <div>{character.race}</div>
            <div>{"•"}</div>
            <div>{character.class}</div>
          </div>
        </div>
      </div>
      
      {/* Main Content Box */}
      <div id="charBox" className="flex flex-col md:flex-row gap-5 my-2 w-full">
        
        {/* Left Column: Core Info & Stats */}
        <div className="border shadow-lg flex-1 p-3 rounded flex flex-col gap-3">
          
          {/* Image and Name */}
          <div className="flex items-center gap-4 border-b pb-3">
            {character.imageURL && (
              <img
                src={character.imageURL}
                alt={`${character.name} Avatar`}
                className="w-20 h-20 object-cover rounded-full border-2 border-green-500"
              />
            )}
            <div className="text-xl font-bold">{character.name}</div>
          </div>
          
          {/* Attributes */}
          <div className="space-y-1">
            <div className="flex gap-3">
              <div className="font-bold w-20 ">Race</div>
              <div>{":"}</div>
              <div className="text-md">{character.race}</div>
            </div>
            <div className="flex gap-3">
              <div className="font-bold w-20">Class</div>
              <div>{":"}</div>
              <div className="text-md">{character.class}</div>
            </div>
            <div className="flex gap-3">
              <div className="font-bold w-20">Gender</div>
              <div>{":"}</div>
              <div className="text-md">{character.gender || "N/A"}</div>
            </div>
            <div className="flex gap-3">
              <div className="font-bold w-20">Level</div>
              <div>{":"}</div>
              <div className="text-md">{character.level}</div>
            </div>
            <div className="flex gap-3">
              <div className="font-bold w-20">Status</div>
              <div>{":"}</div>
              <div className={`text-md font-semibold ${character.status === 'dead' ? 'text-red-500' : 'text-green-500'}`}>
                {character.status}
              </div>
            </div>
          </div>

          {/* Core Stats */}
          <div className="space-y-3 pt-4 border-t mt-auto">
            <div className="text-md font-bold">Core Stats</div>
            <div className="grid grid-cols-4 gap-x-2">
              <Stat stat={"STR"} statPower={stats.strength} />
              <Stat stat={"INT"} statPower={stats.intelligence} />
              <Stat stat={"AGI"} statPower={stats.agility} />
              <Stat stat={"LUC"} statPower={stats.luck} />
            </div>
          </div>
        </div>
        
        {/* Right Column: Description & Ability */}
        <div className="border shadow-lg flex-2 p-3 rounded flex flex-col gap-4">
          <div>
            <div className="text-md font-bold border-b pb-1 mb-2">Description</div>
            <div className="text-sm italic">{character.description || "No Description"}</div>
          </div>
          
          <div>
            <div className="text-md font-bold border-b pb-1 mb-2">Special Ability</div>
            <div className="text-sm font-mono">{specialAbility}</div>
          </div>

          {/* Timestamps (Optional but useful for schema completeness) */}
          <div className="text-[10px] text-gray-500 mt-auto pt-3 border-t">
            <div>Created: {new Date(character.createdAt).toLocaleDateString()}</div>
            <div>Updated: {new Date(character.updatedAt).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;