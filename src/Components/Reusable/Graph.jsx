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
import {Switch} from '@material-ui/core';

/**
 * Bar Graph
 * @param {any} props to component
 * @return {ReactNode} BarGraph
 */
export default function BarGraph({movies}) {
  const [imdbRatings, setImdbRatings] = useState([]);
  const [metaValues, setMetaValues] = useState([]);
  const [showMeta, setShowMeta] = useState(false);
  useEffect(()=>{
    const imdbValues = movies?.map((el)=>({x: el.Title, y: el.imdbRating*1}));
    const metaValues = movies?.map((el)=>({x: el.Title, y: el.Metascore/10}));
    setImdbRatings(imdbValues);
    setMetaValues(metaValues);
  }, [movies]);
  return (
    <>
     Show Metacritic Ratings
      <Switch checked={showMeta} color='primary'
        onChange={()=>setShowMeta(!showMeta)}/>
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
        ><Hint value={{x: 2, y: 4}}>hint</Hint></VerticalBarSeries>
        {showMeta?<VerticalBarSeries
          barWidth={0.3}
          onSeriesClick={()=>{
            alert('hello');
          }}
          data={metaValues}
        />:<></>}
      </FlexibleXYPlot>
    </>
  );
}

BarGraph.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};
