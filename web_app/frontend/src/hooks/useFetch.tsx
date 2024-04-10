import { useState, useEffect } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          const text = await response.text();
          throw Error(text);
        }
      } catch (error) {
        setError(error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, fetching, error] as const;
};
