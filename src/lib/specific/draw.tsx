// lib/specific/draw

interface Keypoint {
  x: number;
  y: number;
}

interface Style {
  color: string;
  size: number;
}

const fingerJoints: Record<string, number[]> = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

const dotSize = 2;

const style: Record<number, Style> = {
  0: { color: "white", size: dotSize },
  1: { color: "white", size: dotSize },
  2: { color: "white", size: dotSize },
  3: { color: "white", size: dotSize },
  4: { color: "key", size: dotSize },
  5: { color: "white", size: dotSize },
  6: { color: "white", size: dotSize },
  7: { color: "white", size: dotSize },
  8: { color: "key", size: dotSize },
  9: { color: "white", size: dotSize },
  10: { color: "white", size: dotSize },
  11: { color: "white", size: dotSize },
  12: { color: "key", size: dotSize },
  13: { color: "white", size: dotSize },
  14: { color: "white", size: dotSize },
  15: { color: "white", size: dotSize },
  16: { color: "key", size: dotSize },
  17: { color: "white", size: dotSize },
  18: { color: "white", size: dotSize },
  19: { color: "white", size: dotSize },
  20: { color: "key", size: dotSize },
};

export const drawHand = (predictions: Keypoint[], color: string, ctx: CanvasRenderingContext2D): void => {
  if (predictions.length > 0) {
    for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
      let finger = Object.keys(fingerJoints)[j];
      for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
        const firstJointIndex = fingerJoints[finger][k];
        const secondJointIndex = fingerJoints[finger][k + 1];

        ctx.beginPath();
        ctx.moveTo(predictions[firstJointIndex].x, predictions[firstJointIndex].y);
        ctx.lineTo(predictions[secondJointIndex].x, predictions[secondJointIndex].y);
        ctx.strokeStyle = "lightgrey";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    for (let i = 0; i < predictions.length; i++) {
      const x = predictions[i].x;
      const y = predictions[i].y;
      ctx.beginPath();
      ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
};
