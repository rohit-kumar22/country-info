import { useState, useEffect, useContext } from "react";
import { locationContext } from "../context/locationContext";
import { Box, Typography, Grid } from "@mui/material";
const url = "https://restcountries.com/v3.1/name/";

const styles = {
  countryName: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "700",
  },
  img: {
    width: "500px",
    height: "300px",
    objectFit: "fill",
  },
  key: {
    fontSize: "16px",
    fontWeight: 700,
    marginBottom: "10px",
  },
  value: {
    fontSize: "16px",
    fontWeight: 400,
    marginBottom: "10px",
    textAlign: "left",
  },
};

const keys = [
  "Capital",
  "Currency",
  "Population",
  "Latlang",
  "Language",
  "TimeZone",
  "Region",
];
export default function CountryInfo() {
  const { location, setLocation } = useContext(locationContext);
  const [countryData, setCountryData] = useState(null);
  const getData = () => {
    fetch(`${url}${location.country}`)
      .then((response) => response.json())
      .then((data) => setCountryData(data[0]));
  };

  useEffect(() => {
    getData();
  }, [location]);
  const languages =
    countryData?.languages && Object.values(countryData?.languages);
  // const currency =
  //   countryData?.currencies && Object.values(countryData?.currencies);
  // console.log("data", currency);
  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={styles.countryName}>
          {countryData?.name.common.toUpperCase()}
        </Typography>
        <Box>
          <img src={countryData?.flags.svg} alt="" style={styles.img} />
        </Box>

        <Grid container mt={1}>
          <Grid item xs={6}>
            {keys.map((item, index) => (
              <Typography key={index} sx={styles.key}>
                {item}
              </Typography>
            ))}
          </Grid>
          <Grid item xs={6}>
            <Typography sx={styles.value}>{countryData?.capital}</Typography>
            {/* <Typography sx={styles.value}>
              {countryData?.currencies &&
                Object.values(countryData?.currencies)}
            </Typography> */}
            <Typography sx={styles.value}>{countryData?.population}</Typography>
            <Typography sx={styles.value}>
              {countryData?.latlng.join()}
            </Typography>

            <Box sx={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              {languages?.map((language, id) => (
                <Box
                  key={id}
                  sx={{
                    border: "0.5px solid black",
                    backgroundColor: "yellow",
                    padding: "2px",
                    borderRadius: "5px",
                  }}>
                  {language}
                </Box>
              ))}
            </Box>
            <Typography sx={styles.value}>{countryData?.timezones}</Typography>
            <Typography sx={styles.value}>{countryData?.region}</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
