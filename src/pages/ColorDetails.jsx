import axios from "axios";
import React, { useState, useEffect } from "react";

const ColorDetails = () => {
  const [color, setColor] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://www.thecolorapi.com/id?hex=0047AB&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33"
      )
      .then((res) => {
        console.log(res.data);
        setColor(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div className="bg-[#0047AB]">{color.hex && color.hex.value}</div>;
};

export default ColorDetails;
