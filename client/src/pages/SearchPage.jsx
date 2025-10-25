// SearchPage.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import axios from "axios";
import { serverURL } from "@/hooks/serverURL";
import CharacterCard from "@/components/CharacterCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${serverURL}/api/v1/search`, {
        params: { query, limit: 5 },
      });
      setSearchResult(res.data);
      setError(null);
    } catch (error) {
      setError(error);
      setSearchResult([]);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Character Search</h1>
        <p className="text-slate-300 mb-8">
          Search for your favorite character or let fate choose one for you!
        </p>

        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center gap-2"
        >
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-2.5 text-slate-400"
              size={25}
            />
            <input
              type="text"
              placeholder="Search character..."
              value={query}
              onChange={handleQuery}
              className="pl-9 py-2 bg-slate-700 text-white placeholder-slate-400 border-slate-600 focus:border-slate-400"
            />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-500">
            <Button text={"Search"} />
          </button>
        </form>
      </motion.div>

      {/* Example card display (placeholder for result or random pick) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-10 w-full "
      >
        <div className="bg-[var(--secondary)] border-[var(--secondaryForeground)] shadow-lg border w-full ">
          <div className="p-5 grid  grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
            {error ? (
              <p className="text-center text-red-500">
                {error?.response?.data?.message ||
                  error?.message ||
                  "Something went wrong."}
              </p>
            ) : searchResult?.length === 0 ? (
              <p className="text-center text-gray-400">
                Character result will appear here...
              </p>
            ) : (
              searchResult?.map((ch) => (
                <CharacterCard key={ch._id} character={ch} />
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
