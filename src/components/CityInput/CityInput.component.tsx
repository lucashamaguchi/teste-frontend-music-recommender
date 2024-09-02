import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import getCoordsFromCity from "../../services/getCoordsFromCity";
import styled from "styled-components";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

export interface ICityProperties {
  name?: string;
  coords?: {
    lat: number | null;
    lng: number | null;
  };
}

export interface ICityInputProps {
  onSelect: (cityProperties: ICityProperties) => void;
}

const TextFieldStyle = styled.div`
  width: 60%;
`;

const ButtonStyle = styled.div``;

function CityInputComponent(props: Readonly<ICityInputProps>) {
  const [city, setCity] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const getCity = async () => {
    try {
      const resp = await getCoordsFromCity(city);
      props.onSelect({ name: city, coords: {
        lat: resp[0].lat,
        lng: resp[0].lon
      } });
    } catch {
      setOpenAlert(true);
    }
  };

  useEffect(() => {
    props.onSelect({});
  }, [city]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <TextFieldStyle>
          <TextField
            id="outlined"
            label="City"
            variant="outlined"
            size="small"
            onChange={(event) => setCity(event.target.value)}
          />
        </TextFieldStyle>
        <ButtonStyle>
          <Button variant="outlined" onClick={getCity}>
            Get city
          </Button>
        </ButtonStyle>
      </Box>
      <Collapse in={openAlert}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Error Fetching City
        </Alert>
      </Collapse>
    </Box>
  );
}

export default CityInputComponent;
