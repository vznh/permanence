// components/grid/Grid
import { useState, useEffect } from "react";

const Grid = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [col, setCol] = useState<number>(0);
  const [row, setRow] = useState<number>(0);

  // onmount
  useEffect(() => {
    const height = window.innerHeight;
    const width = window.innerWidth;

    setWindowHeight(height);
    setWindowWidth(width);
    setCol(Math.floor(width / 18));
    setRow(Math.floor(height / 18));
  }, []);

  return (
    <div
      className="flex w-full h-full justify-center items-center absolute opacity-15"
      id="grid"
    >
      <svg width={windowWidth - 18 * 2} height={windowHeight - 18 * 2}>
        <defs>
          <pattern
            id="transformedPattern"
            x="0"
            y="0"
            width={18 / 2}
            height={18 / 2}
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width={18 / 2}
              height={18 / 2}
              stroke={"#fff"}
              fill="transparent"
            />
          </pattern>
        </defs>

        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          stroke={"#000"}
          fill="url(#transformedPattern)"
        />
      </svg>
    </div>
  );
};

export default Grid;
