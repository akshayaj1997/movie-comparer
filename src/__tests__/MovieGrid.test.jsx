import '@testing-library/jest-dom';
import React from 'react';
import {mount} from 'enzyme';
import MovieGrid from '../Components/MovieGrid';
import {DragDropContext} from 'react-beautiful-dnd';

const sampleMovies = [{
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
}];

const resizeWindow = (x) => {
  window.innerWidth = x;
  window.dispatchEvent(new Event('resize'));
};

describe('MovieGrid', () => {
  let mountedWrapper;
  beforeEach(() => {
    mountedWrapper = mount(<DragDropContext><MovieGrid movies={sampleMovies}
      deleteItemFromGrid={()=>jest.fn()}/></DragDropContext>);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('test the responsive to large screen',
      () => {
        resizeWindow(2880);
        mountedWrapper.update();
        expect(mountedWrapper.find('MovieCard').length)
            .toBeGreaterThan(0);
      });
  it('test the responsive to small screen',
      () => {
        resizeWindow(880);
        mountedWrapper.update();
        expect(mountedWrapper.find('MovieChip').length)
            .toBeGreaterThan(0);
      });
});
