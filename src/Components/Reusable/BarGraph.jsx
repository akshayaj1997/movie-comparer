
import React from 'react';
import {ResponsiveBar} from '@nivo/bar';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';

/**
 * Bar Graph comparing movies based on IMDb Rating
 * @param {Array} data array of the movies compared in graphical form
 * @return {ReactNode} Graph Component comparing movies based on IMDb Rating
 */
const MovieBarGraph = ({data: movies, isLargeScreen}) => {
  const [ratings, setRatings] = useState([]);
  const keys = ['imdbRating'];
  useEffect(()=>{
    const imdbValues = movies?.map((el)=>
      ({'imdbRating': isNaN(el.imdbRating*1) ? 0:el.imdbRating*1,
        'Metascore': isNaN(el.Metascore/10)? 0: el.Metascore/10,
        'Title': el.Title, 'Poster': el.Poster}
      ));
    setRatings(imdbValues);
  }, [movies]);
  return (movies?.length>0? <ResponsiveBar
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
    enableLabel={isLargeScreen}
    minValue={0}
    maxValue={10}
    borderRadius={4}
    label={(d) => `${d.id}: ${d.value}`}
    labelSkipHeight={0}
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
    legendLabel={(datum) => `${datum.id}`}
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
        return acronym ? acronym: value;
      },
    }}
    legends={[
      {
        anchor: 'right',
        direction: 'column',
        dataFrom: 'keys',
        itemHeight: 20,
        itemWidth: 80,
        translateY: 90,
        translateX: 100,
        symbolShape: CustomSymbolShape,
      },
    ]}
    tooltip={({id, value, data, color}) => (
      <div
        style={{
          padding: 6,
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
  isLargeScreen: PropTypes.bool.isRequired,
};

export default MovieBarGraph;

const CustomSymbolShape = ({
  x, y, size, fill, borderWidth, borderColor,
}) => (
  <rect
    x={x}
    y={y}
    fill={fill}
    strokeWidth={borderWidth}
    stroke={borderColor}
    width={size}
    height={size}
    style={{pointerEvents: 'none'}}
  />
);

CustomSymbolShape.propTypes = {
  x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fill: PropTypes.string,
  borderWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

