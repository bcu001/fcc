import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url, query = null) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        let res;
        setIsLoading(true);
        if (query) res = await axios.get(url, { params: { query } });
        else res = await axios.get(url);
        setData(res.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
