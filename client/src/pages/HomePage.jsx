import Button from "@/components/Button";
import CharacterCard from "@/components/CharacterCard";
import Loader from "@/components/Loader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const serverURL = import.meta.env.VITE_SEVER_URL;
  const [charList, setCharList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAllCharacter();
  }, []);
  const getAllCharacter = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${serverURL}/api/v1/characters/`);
      setCharList(res.data);
      setIsLoading(false);
      //   console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="overflow-hidden flex flex-wrap gap-10 justify-start mx-4 mt-4">
      <div className="flex justify-between w-full">
        <div>
          <h2 className="font-bold">Adventures</h2>
          <p className="text-xs">
            Browse forged characters. Click a card to view details
          </p>
        </div>

        <Link to={"/create"}>
          <Button text={"New Character"} />
        </Link>
      </div>

      <div className="w-full overflow-hidden flex flex-wrap gap-4 justify-center pt-2">
        {charList.map((ch) => (
          <CharacterCard key={ch._id} character={ch} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
