import React from 'react';
import {mount, shallow} from 'enzyme';
import axios from 'axios';
import SearchComponent from '../Components/Search';
import {APIKey} from '../APIKey';

jest.mock('axios');

const sampleMovie = {
  'Title': 'Blade Runner',
  'Year': '1982',
  'Rated': 'R',
  'Released': '25 Jun 1982',
  'Runtime': '117 min',
  'Genre': 'Action, Sci-Fi, Thriller',
  'Director': 'Ridley Scott',
  'Writer': 'Hampton Fancher (screenplay)',
  'Actors': 'Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos',
  'Plot': 'In the futuristic year of 2019',
  'Country': 'USA',
  'Awards': 'Nominated for 2 Oscars. Another 12 wins & 17 nominations.',
  'Poster': 'imageURL',
  'Ratings': [
    {
      'Source': 'Internet Movie Database',
      'Value': '8.1/10',
    },
    {
      'Source': 'Rotten Tomatoes',
      'Value': '90%',
    },
    {
      'Source': 'Metacritic',
      'Value': '84/100',
    },
  ],
  'Metascore': '84',
  'imdbRating': '8.1',
  'imdbVotes': '698,571',
  'imdbID': 'tt0083658',
  'Type': 'movie',
  'DVD': '15 Nov 2016',
  'BoxOffice': '$32,868,943',
  'Production': 'Ladd Company, Blade Runner Partnership',
  'Website': 'N/A',
  'Response': 'True',
};
describe('MovieComparePage Tests', () => {
  let shallowWrapper;
  let mountedWrapper;
  beforeEach(() => {
    shallowWrapper = shallow(<SearchComponent sendMovieData={()=>jest.fn()}/>);
    mountedWrapper = mount(<SearchComponent sendMovieData={()=>jest.fn()}/>);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render all required children', () => {
    expect(shallowWrapper.find('SearchBar').length)
        .toEqual(1);
  });

  it('On trying to search for movie', () => {
    mountedWrapper.find('SearchBar').props().movieDisplay(sampleMovie);
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({status: 200, data: sampleMovie}),
    );
    expect(axios.get).toHaveBeenCalledWith(
        `https://www.omdbapi.com/?apikey=${APIKey}&i=${sampleMovie.imdbID}&r=json`,
    );
    mountedWrapper.update();
    expect(mountedWrapper.find('MovieMetaDataSkeleton').length)
        .toBeGreaterThan(0);
  });
});
