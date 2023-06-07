import { Box, Grid } from "@mui/material";
import Navbar from "./Navbar";
import MapComponent from "./MapComponent";
import CountryInfo from "./CountryInfo";

export default function Main() {
  return (
    <>
      <Box>
        <Navbar />
        <Grid container>
          <Grid item xs={6}>
            <MapComponent />
          </Grid>
          <Grid item xs={6}>
            <CountryInfo />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
