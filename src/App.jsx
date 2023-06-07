import Main from "./components/Main";
import { useState } from "react";
import { locationContext } from "./context/locationContext";

function App() {
  const [location, setLocation] = useState({
    lat: 28.679079,
    lng: 77.06971,
    country: "india",
    continent: "asia",
  });
  return (
    <>
      <locationContext.Provider value={{ location, setLocation }}>
        <Main />
      </locationContext.Provider>
    </>
  );
}

export default App;
