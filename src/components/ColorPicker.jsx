import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { useParams, useNavigate } from "react-router-dom";

function hexToGrayscale(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? 0.2126 * parseInt(result[1], 16) +
        0.7152 * parseInt(result[2], 16) +
        0.0722 * parseInt(result[3], 16) >=
      128
      ? "text-black"
      : "text-white"
    : null;
}

const ColorPicker = ({ idx, initialColor }) => {
  const { palette } = useParams();
  const navigate = useNavigate();

  const colorList = palette.split("-");

  const [color, setColor] = useState(initialColor);
  const [isShown, setIsShown] = useState(false);

  function handleSubmit() {
    if (isShown) {
      navigate(
        `/${[...colorList.slice(0, idx), color, ...colorList.slice(idx + 1)]
          .join("-")
          .replaceAll("#", "")}`
      );
      window.location.reload();
    } else {
      setIsShown(true);
    }
  }
  return (
    <div
      className="flex flex-col justify-end items-center text-white text-lg font-bold sm:text-2xl md:text-3xl sm:px-12 px-2 py-36"
      style={{
        backgroundColor: "#" + color.slice(1),
      }}
    >
      <div className="flex flex-col items-center" tabIndex="0">
        {isShown && (
          <SketchPicker
            color={color}
            onChange={(updatedColor) => setColor(updatedColor.hex)}
          />
        )}

        <button
          onClick={handleSubmit}
          className={hexToGrayscale(color)}
          tabIndex="0"
        >
          {color.toUpperCase()}
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;
