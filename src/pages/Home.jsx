import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Select from "react-select";

const ColorPalette = () => {
  // Navigate
  const navigate = useNavigate();

  const callOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2cbcfb74a9msheee612bd423bfaap1d8cfajsncd97c6780a6d",
      "X-RapidAPI-Host": "random-palette-generator.p.rapidapi.com",
    },
  };

  const getColors = async () => {
    localStorage.setItem(
      "paletteMode",
      JSON.stringify({ value: "monochromatic", label: "Monochromatic" })
    );
    localStorage.setItem(
      "colorAmount",
      JSON.stringify({ value: "4", label: "4" })
    );
    axios
      .request(
        `https://random-palette-generator.p.rapidapi.com/palette/monochromatic/1/4`,
        callOptions
      )
      .then((response) => {
        navigate(
          "/" + response.data.data[0].palette.join("-").replaceAll("#", "")
        );
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col md:px-12 px-4 bg-black font-poppins items-center h-screen">
      {/* Header */}
      <h1 className="md:text-6xl text-4xl font-bold text-white mt-10">
        Random <span className="text-[#f8cc57]">Color Pallete</span> Generator
      </h1>
      <h2 className="text-white text-2xl font-light mt-6 font-ebas">
        Click change to get a random color pallete
      </h2>
      {/* Header */}

      {/* Button */}
      <div className="flex flex-col w-full items-center mt-10">
        <button
          className="font-bold mt-5 text-white text-xl hover:text-active"
          onClick={getColors}
        >
          <>Generate!</>
        </button>
      </div>
      {/* Button */}
    </div>
  );
};

export default ColorPalette;
