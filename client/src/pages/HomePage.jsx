import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// components
import Button from "@/components/ui/Button";
import CharacterCard from "@/components/CharacterCard";
import Loader from "@/components/Loader";
import ErrorPage from "@/pages/ErrorPage";

// hooks
import { serverURL } from "@/hooks/serverURL";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetch from "@/hooks/useFetch";

const HomePage = () => {
  useDocumentTitle("FCC | Home");
  const {
    data: charList,
    isLoading,
    error,
  } = useFetch(`${serverURL}/api/v1/characters?limit=9`);

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage error={error} />;

  return (
    <div className="overflow-hidden flex flex-wrap gap-10 justify-start mx-4 mt-4">
      <div className="flex justify-between w-full">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-bold">Adventures</h2>
          <p className="text-xs">
            Browse forged characters. Click a card to view details
          </p>
        </motion.div>

        <Link to={"/create"}>
          <Button text={"New Character"} />
        </Link>
      </div>

      <div className="w-full overflow-hidden flex flex-wrap gap-4 justify-center py-2">
        {charList.map((ch) => (
          <CharacterCard key={ch._id} character={ch} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
