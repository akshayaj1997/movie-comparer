import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
} from 'react-vis';

/**
 * Bar Graph
 * @param {any} props to component
 * @return {ReactNode} BarGraph
 */
export default function BarGraph({width, height, movies}) {
  const [imdbRatings, setRatings] = useState([]);
  useEffect(()=>{
    const values = movies?.map((el)=>({x: el.Title, y: el.imdbRating*1}));
    setRatings(values);
  }, [movies]);
  return (
    <XYPlot margin={{bottom: 70}} xType="ordinal" width={width} height={height}
      colorType="category"
      colorDomain={[0, 1, 2]} yDomain={[1, 10]}>
      <VerticalGridLines/>
      <HorizontalGridLines/>
      <XAxis tickLabelAngle={-45}/>
      <YAxis title='Rating'/>
      <VerticalBarSeries
        onSeriesClick={()=>{
          alert('hello');
        }}
        data={imdbRatings}
      />
    </XYPlot>
  );
}

BarGraph.propTypes = {
  width: PropTypes.any,
  height: PropTypes.any,
  movies: PropTypes.arrayOf(PropTypes.object),
};
