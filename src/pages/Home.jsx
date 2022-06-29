import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ColorPalette = () => {
  const navigate = useNavigate();
  const [paletteMode, setPaletteMode] = useState("Monochromatic");
  const [colorAmount, setColorAmount] = useState("6");

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2cbcfb74a9msheee612bd423bfaap1d8cfajsncd97c6780a6d",
      "X-RapidAPI-Host": "random-palette-generator.p.rapidapi.com",
    },
  };

  const getColors = async () => {
    axios
      .request(
        `https://random-palette-generator.p.rapidapi.com/palette/${paletteMode}/1/${colorAmount}`,
        options
      )
      .then((response) => {
        navigate(
          "/" + response.data.data[0].palette.join("-").replaceAll("#", "")
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getColors();
  }, []);

  return <></>;
};

export default ColorPalette;
