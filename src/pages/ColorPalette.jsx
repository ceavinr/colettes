import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Select from "react-select";
import ColorPicker from "../components/ColorPicker";

const ColorPalette = () => {
  const paletteType = [
    { value: "monochromatic", label: "Monochromatic" },
    { value: "complementary", label: "Complementary" },
    { value: "square", label: "Square" },
    { value: "triad", label: "Triad" },
    { value: "shades", label: "Shades" },
  ];

  const number = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
  ];

  // API's response
  const [colors, setColors] = useState([]);
  // Showing loading state
  const [loading, setLoading] = useState(false);
  // Get palette hex from params
  const { palette } = useParams();
  // Navigate
  const navigate = useNavigate();
  // States
  const [paletteMode, setPaletteMode] = useState(
    JSON.parse(localStorage.getItem("paletteMode"))
  );
  const [colorAmount, setColorAmount] = useState(
    JSON.parse(localStorage.getItem("colorAmount"))
  );

  const callOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2cbcfb74a9msheee612bd423bfaap1d8cfajsncd97c6780a6d",
      "X-RapidAPI-Host": "random-palette-generator.p.rapidapi.com",
    },
  };

  const getColors = async () => {
    localStorage.setItem("paletteMode", JSON.stringify(paletteMode));
    localStorage.setItem("colorAmount", JSON.stringify(colorAmount));
    setLoading(true);
    axios
      .request(
        `https://random-palette-generator.p.rapidapi.com/palette/${paletteMode.label}/1/${colorAmount.label}`,
        callOptions
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
        {/* Header */}

        {/* Button */}
        <div className="flex flex-col w-full items-center mt-10">
          <div className="flex w-full justify-center space-x-2">
            <div className="w-[15%]">
              <Select
                options={paletteType}
                onChange={setPaletteMode}
                placeholder="Select palette type"
                defaultValue={paletteMode}
              />
            </div>
            <div className="w-[5rem]">
              <Select
                options={number}
                onChange={setColorAmount}
                placeholder={colorAmount}
                defaultValue={colorAmount}
              />
            </div>
          </div>
          <button
            className="font-bold mt-5 text-white text-xl hover:text-active"
            onClick={getColors}
          >
            {loading ? (
              <span className="animate-pulse">Loading..</span>
            ) : (
              <>Generate!</>
            )}
          </button>
        </div>
        {/* Button */}

        {/* Display the color palette */}
        {colors && (
          <div
            className="mt-10 grid justify-center h-full w-full rounded-lg"
            style={{
              gridTemplateColumns: ` repeat(${colors.length}, 1fr)`,
            }}
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
