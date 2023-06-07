import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useState } from "react";
import { locationContext } from "../context/locationContext";
import { list } from "../assets/continentAndCountriesJson";
import { WindowSharp } from "@mui/icons-material";
import Geocode from "react-geocode";
const styles = {
  container: {
    height: "70px",
    display: "flex",
    padding: "0 50px 0 50px",
    justifyContent: "space-between",
    backgroundColor: "#000000",
  },
  compName: {
    fontSize: "24px",
    fontWeight: 600,
    color: "#ffffff",
    marginTop: "17px",
  },
};

const continents = [
  { value: "asia", title: "Asia" },
  { value: "africa", title: "Africa" },
  { value: "antartica", title: "Antartica" },
  { value: "europe", title: "Europe" },
  { value: "northAmerica", title: "North America" },
  { value: "oceania", title: "Oceania" },
  { value: "southAmerica", title: "South America" },
];

export default function Navbar() {
  const { location, setLocation } = useContext(locationContext);
  const [country, setCountry] = useState(location.country);

  console.log("countries", country);

  const handleSearchButton = () => {
    if (country === "") {
      window.alert("Please enter country name");
      return;
    }
    list.forEach((item) => {
      if (item.country.toLowerCase() === country) {
        setLocation({
          lat: item.latitude,
          lng: item.longitude,
          country: country,
        });
        setCountry("");
        return;
      }
    });
  };

  const loc = Geocode.fromLatLng("41", "20").then((response) => {
    const address = response.results[0].formatted_address;
    console.log("add", address);
  });

  return (
    <>
      <Box sx={styles.container}>
        <Typography sx={styles.compName}>SPEARMINT</Typography>
        <TextField
          id="search-bar"
          className="text"
          label=""
          value={country}
          variant="outlined"
          placeholder="Search..."
          size="small"
          onChange={(e) => {
            if (e.key === "Enter") {
              handleSearchButton();
            } else setCountry((prev) => e.target.value.toLowerCase());
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button onClick={handleSearchButton}>
                  <SearchIcon />
                </Button>
              </InputAdornment>
            ),
            style: {
              padding: 0,
              marginTop: "15px",
              backgroundColor: "#ffffff",
              width: "300px",
            },
          }}
        />
      </Box>
    </>
  );
}
