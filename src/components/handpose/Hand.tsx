// components/hand/Handpose
import { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as hpd from "@tensorflow-models/hand-pose-detection";
import { drawHand } from "@/lib/utils";

const Hand = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [passHand, setPassHand] = useState<any>(null);
  const [vWidth, setVWidth] = useState<number>(0);
  const [vHeight, setVHeight] = useState<number>(0);

  const model = hpd.SupportedModels.MediaPipeHands;
  const config = {
    runtime: "mediapipe" as const,
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
    modelType: "full" as const,
    flipHorizontal: true,
  };

  const detect = async (net: any) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      setVHeight(videoHeight);
      setVWidth(videoWidth);

      const hand = await net.estimateHands(video);
      setPassHand(hand);
    }
  };

  const runHandpose = async () => {
    try {
      await tf.ready();
      const detector = await hpd.createDetector(model, config);
      console.log("Handpose model loaded.");
      const detectInterval = setInterval(() => {
        detect(detector);
      }, 1);

      return () => clearInterval(detectInterval);
    } catch (error: any) {
      let errorMessage = "";
      errorMessage += `-- Error: at runHandpose()\n------ LOGS ------`
      if (error.message) errorMessage += error.message;
      console.error(errorMessage);
    } finally {
      console.log("** runHandpose() has run.");
    }
  }

  useEffect(() => { runHandpose() } , []);
  useEffect(() => {
    if (passHand !== null) {
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) {
        const scale = window.devicePixelRatio;
        if (canvasRef.current) {
          canvasRef.current.width = Math.floor(vWidth * scale);
          canvasRef.current.height = Math.floor(vHeight * scale);
          ctx.scale(scale, scale);
          for (let i = 0; i < passHand.length; i++) {
            drawHand(passHand[i].keypoints, "white", ctx);
          }
        }
      }
    }
  }, [passHand]);

  return <div
    className="app"
  >
    <Webcam
      ref={webcamRef}
      mirrored={true}
      className="absolute ml-auto mr-auto l-0 r-0 opacity-0 text-center w-[100vw] h-[100vw] object-cover flex justify-center items-center"
    />
    <canvas
      id="hand"
      ref={canvasRef}
      className="absolute ml-auto mr-auto l-0 r-0 text-center w-[100vw] h-[100vh] object-cover -scale-x-100"
    />
  </div>
}

export default Hand;
