import { classNames } from "@identity-service/core";
import React, { memo } from "react";

import { ReactComponent as Audio } from "../../spinners/audio.svg";
import { ReactComponent as BallTriangle } from "../../spinners/ball-triangle.svg";
import { ReactComponent as Bars } from "../../spinners/bars.svg";
import { ReactComponent as Circles } from "../../spinners/circles.svg";
import { ReactComponent as DoubleRing } from "../../spinners/double-ring-1s-200px.svg";
import { ReactComponent as Eclipse } from "../../spinners/eclipse-1s-200px.svg";
import { ReactComponent as Grid } from "../../spinners/grid.svg";
import { ReactComponent as Hearts } from "../../spinners/hearts.svg";
import { ReactComponent as Infinity } from "../../spinners/infinity-1s-200px.svg";
import { ReactComponent as Oval } from "../../spinners/oval.svg";
import { ReactComponent as Puff } from "../../spinners/puff.svg";
import { ReactComponent as Rings } from "../../spinners/rings.svg";
import { ReactComponent as Ripple } from "../../spinners/ripple-1s-200px.svg";
import { ReactComponent as Rolling } from "../../spinners/rolling-1s-200px.svg";
import { ReactComponent as SpinningCircles } from "../../spinners/spinning-circles.svg";
import { ReactComponent as TailSpin } from "../../spinners/tail-spin.svg";
import { ReactComponent as ThreeDots } from "../../spinners/three-dots.svg";

import css from "./Spinner.module.scss";
import { SpinnerProps } from "./Spinner.type";

const Spinner = ({ className, type = "rolling" }: SpinnerProps) => {
  const props = { className: classNames(css.Spinner, className) };

  switch (type) {
    case "audio":
      return <Audio {...props} />;
    case "ball-triangle":
      return <BallTriangle {...props} />;
    case "bars":
      return <Bars {...props} />;
    case "circles":
      return <Circles {...props} />;
    case "double-ring":
      return <DoubleRing {...props} />;
    case "eclipse":
      return <Eclipse {...props} />;
    case "grid":
      return <Grid {...props} />;
    case "hearts":
      return <Hearts {...props} />;
    case "infinity":
      return <Infinity {...props} />;
    case "oval":
      return <Oval {...props} />;
    case "puff":
      return <Puff {...props} />;
    case "rings":
      return <Rings {...props} />;
    case "ripple":
      return <Ripple {...props} />;
    case "rolling":
      return <Rolling {...props} />;
    case "spinning-circles":
      return <SpinningCircles {...props} />;
    case "tail-spin":
      return <TailSpin {...props} />;
    case "three-dots":
      return <ThreeDots {...props} />;
    default:
      return <Rolling {...props} />;
  }
};

export { Spinner };

export default memo(Spinner);
