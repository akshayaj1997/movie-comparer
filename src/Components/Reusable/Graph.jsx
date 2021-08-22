import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  DiscreteColorLegend,
  Hint,
  FlexibleXYPlot,
} from 'react-vis';

/**
 * Bar Graph
 * @param {any} props to component
 * @return {ReactNode} BarGraph
 */
export default function BarGraph({movies}) {
  const [imdbRatings, setImdbRatings] = useState([]);
  const [metaValues, setMetaValues] = useState([]);
  useEffect(()=>{
    const imdbValues = movies?.map((el)=>({x: el.Title, y: el.imdbRating*1}));
    const metaValues = movies?.map((el)=>({x: el.Title, y: el.Metascore/10}));
    setImdbRatings(imdbValues);
    setMetaValues(metaValues);
  }, [movies]);
  return (
    <FlexibleXYPlot xType="ordinal"
      yDomain={[1, 10]}>
      <DiscreteColorLegend
        style={{position: 'relative'}}
        orientation='horizontal'
        items={[
          {
            title: 'IMDB Rating',
            color: '#12939A',
          },
          {
            title: 'Metacritic Rating',
            color: '#79C7E3',
          },
        ]}
      />
      <VerticalGridLines/>
      <HorizontalGridLines/>
      <XAxis tickLabelAngle={-45}/>
      <YAxis title='Rating'/>
      <VerticalBarSeries
        barWidth={0.3}
        onSeriesClick={()=>{
          alert('hello');
        }}
        data={imdbRatings}
      ><Hint value={imdbRatings[0]}>hint</Hint></VerticalBarSeries>
      <VerticalBarSeries
        barWidth={0.3}
        onSeriesClick={()=>{
          alert('hello');
        }}
        data={metaValues}
      />
    </FlexibleXYPlot>
  );
}

BarGraph.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};
