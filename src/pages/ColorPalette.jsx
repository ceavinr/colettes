import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ColorPicker from "../components/ColorPicker";

const ColorPalette = () => {
  // API's response
  const [colors, setColors] = useState([]);
  // Showing loading state
  const [loading, setLoading] = useState(false);
  // Get palette hex from params
  const { palette } = useParams();
  // Navigate
  const navigate = useNavigate();
  // States
  const [paletteMode, setPaletteMode] = useState("Monochromatic");
  const [colorAmount, setColorAmount] = useState("5");

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2cbcfb74a9msheee612bd423bfaap1d8cfajsncd97c6780a6d",
      "X-RapidAPI-Host": "random-palette-generator.p.rapidapi.com",
    },
  };

  const getColors = async () => {
    setLoading(true);
    axios
      .request(
        `https://random-palette-generator.p.rapidapi.com/palette/${paletteMode}/1/${colorAmount}`,
        options
      )
      .then((response) => {
        setColors(response.data.data[0].palette);
        navigate(
          "/" + response.data.data[0].palette.join("-").replaceAll("#", "")
        );
        window.location.reload();
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setColors(("#" + palette).replaceAll("-", "-#").split("-"));
  }, []);

  return (
    <>
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
        <button
          className="mt-10 font-bold text-white text-xl hover:text-active"
          onClick={getColors}
        >
          {loading ? (
            <span className="animate-pulse">Loading..</span>
          ) : (
            <>Change &rarr;</>
          )}
        </button>
        {/* Button */}

        {/* Display the color palette */}
        {colors && (
          <div
            className="mt-10 grid justify-center h-full w-full rounded-lg"
            style={{ gridTemplateColumns: `repeat(${colors.length}, 1fr)` }}
          >
            {colors.map((color, index) => {
              return <ColorPicker idx={index} initialColor={color} />;
            })}
          </div>
        )}
        {/* Display the color palette */}
      </div>
    </>
  );
};

export default ColorPalette;
