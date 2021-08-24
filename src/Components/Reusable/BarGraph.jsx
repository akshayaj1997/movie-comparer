/* eslint-disable react/prop-types */
import React from 'react';
import {ResponsiveBar} from '@nivo/bar';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';


const MovieBarGraph = ({data}) => {
  const [ratings, setRatings] = useState([]);
  const keys = ['imdbRating', 'Metascore'];
  useEffect(()=>{
    const imdbValues = data?.map((el)=>
      ({'imdbRating': isNaN(el.imdbRating*1) ? 0:el.imdbRating*1,
        'Metascore': isNaN(el.Metascore/10)? 0: el.Metascore/10,
        'Title': el.Title, 'Poster': el.Poster}
      ));
    setRatings(imdbValues);
  }, [data]);
  return (data?.length>0? <ResponsiveBar
    data={ratings}
    keys={keys}
    indexBy={['Title']}
    groupMode='grouped'
    colorBy={'id'}
    colors={{scheme: 'pastel2'}}
    initialHiddenIds={keys.slice(1)}
    theme={{fontSize: 15, axis: {legend: {
      text: {
        fontSize: 20,
        fontWeight: 300,
      },
    },
    domain: {
      line: {
        strokeWidth: 20,
        stroke: 10,
      },
    },
    }}}
    layout={'horizontal'}
    enableGridX
    enableGridY={false}
    enableLabel
    minValue={0}
    maxValue={10}
    borderRadius={4}
    label={(d) => `${d.id}: ${d.value}`}
    labelSkipWidth={1}
    padding={0.5}
    margin= {{top: 60, right: 200, bottom: 60, left: 150}}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Rating',
      legendPosition: 'middle',
      legendOffset: 45,
    }}
    legendLabel={(datum) => `${datum.id} (${datum.value})`}
    axisLeft={{
      tickSize: 5,
      tickPadding: 10,
      tickRotation: 0,
      legendPosition: 'middle',
      legendOffset: -120,
      legend: 'Movie / TV Show',
      format: (value)=>{
        const acronym = value.split(/\s/)
            .reduce((response, word)=> response+=word.slice(0, 1), '');
        return value.length < 15? value: acronym;
      },
    }}
    legends={[
      {
        anchor: 'right',
        direction: 'column',
        dataFrom: 'keys',
        itemHeight: 20,
        itemWidth: 80,
        toggleSerie: true,
        translateY: 90,
        translateX: 100,
        symbolShape: CustomSymbolShape,
      },
    ]}
    tooltip={({id, value, data, color}) => (
      <div
        style={{
          padding: 12,
          color,
          background: '#222222',
        }}
      >
        <img src={data?.Poster} alt={data?.Title} width='30%' height='30%'/>
        <br />
        <strong>
          {data?.Title}<br/>
          {id}: {value}
        </strong>
      </div>
    )}
  />:<></>
  );
};


MovieBarGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default MovieBarGraph;

const CustomSymbolShape = ({
  x, y, size, fill, borderWidth, borderColor,
}) => (
  <rect
    x={x}
    y={y}
    transform={`rotate(45 ${size/2} ${size/2})`}
    fill={fill}
    strokeWidth={borderWidth}
    stroke={borderColor}
    width={size}
    height={size}
    style={{pointerEvents: 'none'}}
  />
);

