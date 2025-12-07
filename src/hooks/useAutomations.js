import { useState, useEffect } from "react";
import { getAutomations } from "../api/api";

export const useAutomations = () => {
  const [automations, setAutomations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAutomations = async () => {
      try {
        const data = await getAutomations();
        setAutomations(data);
      } catch (err) {
        console.error("Failed to fetch automations:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAutomations();
  }, []);

  return { automations, isLoading, error };
};
