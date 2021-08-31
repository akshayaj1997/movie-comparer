import React from 'react';
import {shallow, mount} from 'enzyme';
import MoviePage from '../Pages/MovieComparePage.jsx';

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
    shallowWrapper = shallow(<MoviePage/>);
    mountedWrapper = mount(<MoviePage/>);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render all required children', () => {
    expect(shallowWrapper.find('ModalForm').length)
        .toEqual(1);
    expect(shallowWrapper.find('Button').length)
        .toEqual(1);
    expect(shallowWrapper.find('MovieGrid').length)
        .toEqual(1);
    expect(shallowWrapper.find('MovieList').length)
        .toEqual(1);
  });
  it('The button should have the right attributes', () => {
    expect(shallowWrapper.find('Button').props()['text']).toBe('Add Movie');
    expect(shallowWrapper.find('Button').props()['size']).toBe('large');
    expect(shallowWrapper.find('Button').props()['color']).toBe('default');
    expect(shallowWrapper.find('Button').props()['variant']).toBe('outlined');
  });

  it('on add click will be called and open should open on click', () => {
    const spy = jest.spyOn(shallowWrapper.instance(), 'onAddClick');
    expect(shallowWrapper.state('openModal')).toBe(false);
    shallowWrapper.find('Button').simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(shallowWrapper.state('openModal')).toBe(true);
    expect(shallowWrapper.find('SearchComponent').length).toBeGreaterThan(0);
  });

  it('On trying to save empty movie error should pop up', () => {
    mountedWrapper.setState({movieData: {}});
    mountedWrapper.instance().onSaveClick();
    expect(mountedWrapper.state('errorMsg')).
        toBe('Please select a movie');
    expect(mountedWrapper.state('showError')).toBe(true);
  });

  it('On trying to save movie with no rating error should pop up', () => {
    mountedWrapper.setState({movieData: {imdbRating: 'N/A'}});
    mountedWrapper.instance().onSaveClick();
    expect(mountedWrapper.state('errorMsg')).
        toBe('There is no comparable rating on this movie.');
    expect(mountedWrapper.state('showError')).toBe(true);
  });

  it('On trying to save duplicate movie error should pop up', () => {
    mountedWrapper.setState({movieData: {'imdbID': 'tt0083658'},
      movies: [sampleMovie]});
    mountedWrapper.instance().onSaveClick();
    expect(mountedWrapper.state('errorMsg')).
        toBe('This movie already exists in the comparitive list.');
    expect(mountedWrapper.state('showError')).toBe(true);
  });

  it('On trying to save movie it should be added to movie list', () => {
    mountedWrapper.setState({movieData: sampleMovie});
    mountedWrapper.instance().onSaveClick();
    expect(mountedWrapper.state('errorMsg')).
        toBe('');
    expect(mountedWrapper.state('showError')).toBe(false);
    expect(mountedWrapper.state('movies')).toContain(sampleMovie);
    expect(mountedWrapper.state('columns')['movies-list'].movies)
        .toContain(sampleMovie.imdbID);
  });

  it('on the state of the modal must change on calling toggle', () => {
    const spy = jest.spyOn(mountedWrapper.instance(), 'onAddClick');
    expect(mountedWrapper.state('openModal')).toBe(false);
    mountedWrapper.find('Button').simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(mountedWrapper.state('openModal')).toBe(true);
    mountedWrapper.instance().toggle();
    expect(mountedWrapper.state('openModal')).toBe(false);
    expect(mountedWrapper.state('movieData')).toStrictEqual({});
    expect(mountedWrapper.state('errorMsg')).
        toBe('');
    expect(mountedWrapper.state('showError')).toBe(false);
  });
  it('On receiving movie data the data should be set to the received object',
      () => {
        mountedWrapper.instance().receiveMovieData(sampleMovie);
        expect(mountedWrapper.state('errorMsg')).
            toBe('');
        expect(mountedWrapper.state('showError')).toBe(false);
        expect(mountedWrapper.state('movieData')).toStrictEqual(sampleMovie);
      });
  it('On trying to delete added movie it should be removed from movie list',
      () => {
        mountedWrapper.setState({
          movies: [sampleMovie],
          columns: {
            'movies-list': {
              id: 'movies-list',
              title: 'Movies',
              movies: [sampleMovie.imdbID],
            },
            'movies-grid': {
              id: 'movies-grid',
              title: 'Movies',
              movies: [],
            },
          },
        });
        mountedWrapper.instance().deleteFromList(sampleMovie.imdbID);
        expect(mountedWrapper.state('movies')).not.toContain(sampleMovie);
        expect(mountedWrapper.state('columns')['movies-list'].movies).
            not.toContain(sampleMovie.imdbID);
      });

  it('Moving with destination is null',
      () => {
        mountedWrapper.setState({
          movies: [sampleMovie],
          columns: {
            'movies-list': {
              id: 'movies-list',
              title: 'Movies',
              movies: [sampleMovie.imdbID],
            },
            'movies-grid': {
              id: 'movies-grid',
              title: 'Movies',
              movies: [],
            },
          },
        });
        const result = {
          'combine': null,
          'destination': null,
          'draggableId': 'tt8962124',
          'mode': 'FLUID',
          'reason': 'CANCEL',
          'source': {'droppableId': 'movies-list', 'index': 0},
          'type': 'DEFAULT',
        };
        mountedWrapper.instance().onDragEnd(result);
        expect(mountedWrapper.state('movies')).toContain(sampleMovie);
        expect(mountedWrapper.state('columns')['movies-list'].movies)
            .toContain(sampleMovie.imdbID);
      });

  it('Moving with destination is the same',
      () => {
        mountedWrapper.setState({
          movies: [sampleMovie],
          columns: {
            'movies-list': {
              id: 'movies-list',
              title: 'Movies',
              movies: [sampleMovie.imdbID],
            },
            'movies-grid': {
              id: 'movies-grid',
              title: 'Movies',
              movies: [],
            },
          },
        });
        const result = {
          'combine': null,
          'destination': {'droppableId': 'movies-list', 'index': 0},
          'draggableId': sampleMovie.imdbID,
          'mode': 'FLUID',
          'reason': 'CANCEL',
          'source': {'droppableId': 'movies-list', 'index': 0},
          'type': 'DEFAULT',
        };
        mountedWrapper.instance().onDragEnd(result);
        expect(mountedWrapper.state('movies')).toContain(sampleMovie);
        expect(mountedWrapper.state('columns')['movies-list'].movies)
            .toContain(sampleMovie.imdbID);
      });

  it('Moving with destination is the same column',
      () => {
        mountedWrapper.setState({
          movies: [sampleMovie],
          columns: {
            'movies-list': {
              id: 'movies-list',
              title: 'Movies',
              movies: [sampleMovie.imdbID],
            },
            'movies-grid': {
              id: 'movies-grid',
              title: 'Movies',
              movies: [],
            },
          },
        });
        const result = {
          'combine': null,
          'destination': {'droppableId': 'movies-list', 'index': 1},
          'draggableId': sampleMovie.imdbID,
          'mode': 'FLUID',
          'reason': 'CANCEL',
          'source': {'droppableId': 'movies-list', 'index': 0},
          'type': 'DEFAULT',
        };
        mountedWrapper.instance().onDragEnd(result);
        expect(mountedWrapper.state('movies')).toContain(sampleMovie);
        expect(mountedWrapper.state('columns')['movies-list'].movies)
            .toContain(sampleMovie.imdbID);
      });

  it('Moving with destination is the different column',
      () => {
        mountedWrapper.setState({
          movies: [sampleMovie],
          columns: {
            'movies-list': {
              id: 'movies-list',
              title: 'Movies',
              movies: [sampleMovie.imdbID],
            },
            'movies-grid': {
              id: 'movies-grid',
              title: 'Movies',
              movies: [],
            },
          },
        });
        const result = {
          'combine': null,
          'destination': {'droppableId': 'movies-grid', 'index': 0},
          'draggableId': sampleMovie.imdbID,
          'mode': 'FLUID',
          'reason': 'CANCEL',
          'source': {'droppableId': 'movies-list', 'index': 0},
          'type': 'DEFAULT',
        };
        mountedWrapper.instance().onDragEnd(result);
        expect(mountedWrapper.state('movies')).toContain(sampleMovie);
        expect(mountedWrapper.state('columns')['movies-grid'].movies)
            .toContain(sampleMovie.imdbID);
      });
  it('On trying to delete added movie it should be removed from movie grid',
      () => {
        mountedWrapper.setState({
          movies: [sampleMovie],
          columns: {
            'movies-list': {
              id: 'movies-list',
              title: 'Movies',
              movies: [],
            },
            'movies-grid': {
              id: 'movies-grid',
              title: 'Movies',
              movies: [sampleMovie.imdbID],
            },
          },
        });
        mountedWrapper.instance().deleteFromGrid(sampleMovie.imdbID);
        expect(mountedWrapper.state('movies')).not.toContain(sampleMovie);
        expect(mountedWrapper.state('columns')['movies-grid'].movies).
            not.toContain(sampleMovie.imdbID);
      });
});
