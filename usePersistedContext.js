import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const usePersistedContext = () => {
  const defaultState = { theme: "light", language: "en" };

  const [state, setState] = useState(defaultState);

  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const storedValue = await AsyncStorage.getItem("context");
        if (storedValue && JSON.parse(storedValue).theme) {
          setState(JSON.parse(storedValue));
        }
      } catch (e) {
        console.error("Failed to fetch from AsyncStorage:", e);
      }
    };

    fetchInitialState();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("context", JSON.stringify(state));
  }, [state]);

  return [state, setState];
};
