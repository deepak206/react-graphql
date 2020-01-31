import React from 'react'
import { string, number, object, bool } from 'prop-types';

export default function CircleChart(props) {
  const {
    percentageValue,
    radius,
    xaxis,
    yaxis,
    pathStroke,
    strokeWidth,
    index,
    showText,
    textAttributes,
    height,
    width,
  } = props;

  const angleInDegrees = percentageValue/100*360

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  const describeArc = (x, y, radius, startAngle, endAngle) => {

    const start = polarToCartesian(x, y, radius, endAngle);

    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const diameter = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return diameter;
  }

  return(
    <svg width={ `${width}%` } height={ `${height}%` } >
      <circle cx={ xaxis } cy={ yaxis } r={ radius } fill="none" stroke="#cccccc" strokeWidth={ strokeWidth } />
      {showText && <text x={ xaxis } y={ yaxis } textAnchor="middle" strokeWidth=".5px" dy=".45em" { ...textAttributes }
      >
        { percentageValue }%
      </text>}
      <path className="path" id={ `arc-${index}` }  fill="none" stroke={ pathStroke } strokeWidth={ strokeWidth }
        d={ describeArc(xaxis, yaxis, radius, 0, angleInDegrees) }/>
    </svg>
  )
}

CircleChart.propTypes = {
  percentageValue: string,
  radius: number,
  xaxis: number,
  yaxis: number,
  pathStroke: string,
  strokeWidth: number,
  index: number,
  showText: bool,
  textAttributes: object,
  height: number,
  width: number
};
