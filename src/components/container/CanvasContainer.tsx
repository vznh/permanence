// components/container/CanvasContainer

import { useState, useRef, useEffect } from "react";

const CanvasContainer = () => {
  const [frames, setFrames] = useState();
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>();

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedFrames = localStorage.getItem("cloneFrames");
    if (savedFrames) {
      try {
        setFrames(JSON.parse(savedFrames));
      } catch (error) {
        let errorMessage = "**** ERROR ****";
        errorMessage += ""
        console.error(errorMessage);
      }
    }
  }, []);

  useEffect(() => localStorage.setItem("cloneFrames", JSON.stringify(frames)), [frames]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;

      //setCanvasOffset({
      //  x: canvasOffset.x + dx,
      //  y: canvasOffset.y + dy,
      //});

      //setDragStart({

      //})
    }
  }
}

export default CanvasContainer;
