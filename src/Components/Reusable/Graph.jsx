import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  DiscreteColorLegend,
} from 'react-vis';

/**
 * Bar Graph
 * @param {any} props to component
 * @return {ReactNode} BarGraph
 */
export default function BarGraph({width, height, movies}) {
  const [imdbRatings, setImdbRatings] = useState([]);
  const [metaValues, setMetaValues] = useState([]);
  useEffect(()=>{
    const imdbValues = movies?.map((el)=>({x: el.Title, y: el.imdbRating*1}));
    const metaValues = movies?.map((el)=>({x: el.Title, y: el.Metascore/10}));
    setImdbRatings(imdbValues);
    setMetaValues(metaValues);
  }, [movies]);
  return (
    <XYPlot margin={{bottom: 70}} xType="ordinal" width={width} height={height}
      yDomain={[1, 10]}>
      <DiscreteColorLegend
        style={{position: 'absolute', left: '50px', top: '10px'}}
        orientation="horizontal"
        items={[
          {
            title: 'Apples',
            color: '#12939A',
          },
          {
            title: 'Oranges',
            color: '#79C7E3',
          },
        ]}
      />
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
      <VerticalBarSeries
        onSeriesClick={()=>{
          alert('hello');
        }}
        data={metaValues}
      />
    </XYPlot>
  );
}

BarGraph.propTypes = {
  width: PropTypes.any,
  height: PropTypes.any,
  movies: PropTypes.arrayOf(PropTypes.object),
};
