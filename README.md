# React Movie Comparer

## Overview 
SPA application built with React that compares movies by graphing the
IMDb rating of films.

## Functionality
The page is divided into 2 parts + Search functionality: 
1. Movie Grid which contains the graphing region for visual comparision of the movies
2. Movie List that contain the list of movies we can add to the comparison
* After searching for a movie, the user will be able to view the metadata in the movie details section in the wireframe.

## Built with
* React JS 
* * React Hooks + Classes (https://reactjs.org/docs/getting-started.html)
* * React Beautiful DND (https://github.com/atlassian/react-beautiful-dnd)
* * React MUI (Material-UI) (https://material-ui.com/)
* * Nivo (https://nivo.rocks/components)
* * OMDb API (https://www.omdbapi.com/)

## User Guide 
You can access the page to play around with it here (https://akshayaj1997.github.io/movie-comparer/)

Download or clone the repository onto your system 
#### Prerequisites
Install NodeJS and npm (https://nodejs.org/en/download/)
Check if the installation is successful via
``
 node -v
 npm -v
``
#### Install/ running

Run 
``
npm install
`` 
to install all of the dependencies onto your system.

Get an api key from - https://www.omdbapi.com/apikey.aspx, and place it in the APIKey.js file, else the backend will not service your requests.

After all the dependencies are installed,
Run 
``
npm start
``
to run the application.

### Table of Contents

*   [App](#app)
*   [errorBoundaryHandler](#errorboundaryhandler)
    *   [Parameters](#parameters)
*   [MovieGrid](#moviegrid)
    *   [Parameters](#parameters-1)
*   [MovieList](#movielist)
    *   [Parameters](#parameters-2)
*   [MovieBarGraph](#moviebargraph)
    *   [Parameters](#parameters-3)
*   [Button](#button)
    *   [Parameters](#parameters-4)
*   [MovieMetaDataSkeleton](#moviemetadataskeleton)
    *   [Parameters](#parameters-5)
*   [ModalForm](#modalform)
    *   [Parameters](#parameters-6)
*   [MovieChip](#moviechip)
    *   [Parameters](#parameters-7)
*   [MovieCard](#moviecard)
    *   [Parameters](#parameters-8)
*   [MovieMetaData](#moviemetadata)
    *   [Parameters](#parameters-9)
*   [HeaderSubtitle](#headersubtitle)
    *   [Parameters](#parameters-10)
*   [CollapsibleArea](#collapsiblearea)
    *   [Parameters](#parameters-11)
*   [MovieImageItem](#movieimageitem)
    *   [Parameters](#parameters-12)
*   [ItemTitle](#itemtitle)
    *   [Parameters](#parameters-13)
*   [SearchBar](#searchbar)
    *   [Parameters](#parameters-14)
*   [SearchComponent](#searchcomponent)
    *   [Parameters](#parameters-15)
*   [setMovie](#setmovie)
    *   [Parameters](#parameters-16)
*   [loading](#loading)
*   [MoviePage](#moviepage)
    *   [Parameters](#parameters-17)
    *   [deleteFromGrid](#deletefromgrid)
        *   [Parameters](#parameters-18)
    *   [deleteFromList](#deletefromlist)
        *   [Parameters](#parameters-19)
    *   [onAddClick](#onaddclick)
    *   [toggle](#toggle)
    *   [onSaveClick](#onsaveclick)
    *   [onDragEnd](#ondragend)
        *   [Parameters](#parameters-20)
    *   [receiveMovieData](#receivemoviedata)
        *   [Parameters](#parameters-21)
    *   [render](#render)
*   [startMovies](#startmovies)

## App

SPA application root for an application that compares movies by graphing the
IMDb rating of films. The page is divided into 2 parts + Search functionality

1.  Movie Grid which contains the graphing region for visual comparision of

the movies
2. Movie List that contain the list of movies we can add to the comparison
After searching for a movie, the user will be able to view
the metadata in the movie details section in the wireframe

Returns **ReactNode** App component rendered from the root

## errorBoundaryHandler

Returns errors

### Parameters

*   `props` **props** {error} error passed to the handler

    *   `props.error`  

Returns **ReactNode** Error Handler

## MovieGrid

Renders movies which are being compared and the comparision graph

### Parameters

*   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** {deleteItemFromGrid, movies}

    *   `props.deleteItemFromGrid` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** :callback to delete movie from grid
    *   `props.movie` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** array of the movie objects to be rendered in grid
    *   `props.movies`  

Returns **ReactNode** returns movie grid component

## MovieList

Renders movies which have been added to be picked to compare

### Parameters

*   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** {deleteItemFromGrid, columnId, movies}

    *   `props.deleteItemFromGrid` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** :callback to delete movie from grid
    *   `props.columnId` **string/number** to uniquely identify the droppable area
    *   `props.movies` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** of the movie objects to be rendered in list

Returns **ReactNode** returns movie list component

## MovieBarGraph

Bar Graph comparing movies based on IMDb Rating

### Parameters

*   `data` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** array of the movies compared in graphical form

    *   `data.data`  
    *   `data.isLargeScreen`  
    *   `data.customClick`  

Returns **ReactNode** Graph Component comparing movies based on IMDb Rating

## Button

### Parameters

*   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** {text, size, color, variant, onClick, ...other}

    *   `props.text` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** text value to be passed to component display
    *   `props.size` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** size of the button to be rendered
    *   `props.color` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** color of the button
    *   `props.variant` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** type of the button to render
    *   `props.onClick` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** functionality to be triggered on onClick
    *   `props.other` **any** any other additional parameters you want to pass

Returns **ReactNode** reusable button

## MovieMetaDataSkeleton

Movie Meta data display element to display the movie data in modal

### Parameters

*   `movie` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** object passed to render metadata

Returns **ReactNode** MovieMetaData movie details display element

## ModalForm

Renders the modal form component

### Parameters

*   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** {children,enableSaveButton,isopen,maxWidth,header,
    toggle,savefunc,SaveButton=,...other}

    *   `props.children` **JSXElement** Children to render inside modal body
    *   `props.enableSaveButton` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** enable save button in Modal (optional, default `true`)
    *   `props.isopen` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** show the modal
    *   `props.maxWidth` **string/bool** maximum width of the modal to render
    *   `props.header` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** header/title of the modal
    *   `props.toggle` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** function on toggling the modal (open/close)
    *   `props.SaveButton` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** text in save button (optional, default `'Save'`)
    *   `props.other` **any** any other additional parameters you want to pass
    *   `props.SaveFunction` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** function to call on save
    *   `props.savefunc`  

Returns **ReactNode** Modal form component

## MovieChip

Returns list item of movie object in a MUI chip shape for scrollable list

### Parameters

*   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** {title, id, deleteItem, index}

    *   `props.title` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Movie title
    *   `props.id` **string/number** imdb id of the movie to uniquely identify it
    *   `props.index` **any** unique index of the item in the dragdropcontext
    *   `props.deleteItemFromGrid` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** callback to delete the item from
        the list grid
    *   `props.deleteItem`  
    *   `props.customClick`  

Returns **ReactNode** Card component with the data provided in props

## MovieCard

Returns list item of movie object for scrollable list

### Parameters

*   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** {title, postersrc, children, rating, id, index,
    deleteItemFromGrid}

    *   `props.title` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Movie title
    *   `props.postersrc` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** url of the src of the poster of the movie
    *   `props.children` **JSXElement** children to the movie component
    *   `props.rating` **string/number** rating of the movie
    *   `props.id` **string/number** imdb id of the movie to uniquely identify it
    *   `props.index` **any** unique index of the item in the dragdropcontext
    *   `props.deleteItemFromGrid` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** callback to delete the item from
        the list grid
    *   `props.customClick`  

Returns **ReactNode** ScrollList Component that allows
list of children to be scrollable.

## MovieMetaData

Movie Meta data display element to display the movie data in modal

### Parameters

*   `movie` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** object passed to render metadata

    *   `movie.movie`  

Returns **ReactNode** MovieMetaData movie details display element

## HeaderSubtitle

Returns header element

### Parameters

*   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** {Year, Rated, Runtime, Type}

    *   `props.Year` **string/number** Year of release
    *   `props.Runtime` **string/number** length of the movie
    *   `props.Rating` **string/number** Rating of the movie
    *   `props.type` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** determines if movie, TV show or short film
    *   `props.Rated`  
    *   `props.Type`  

Returns **ReactNode** subtitle

## CollapsibleArea

Accordian Component

### Parameters

*   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** {title, children}

    *   `props.title` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** of the collapsible area
    *   `props.Children` **JSXElements** to the accordian
    *   `props.children`  

Returns **ReactNode** Accordian component

## MovieImageItem

Returns list item of movie object for horizontally scrollable list

### Parameters

*   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** {title, postersrc, rating,
    id, index, deleteItemFromGrid, customClick}

    *   `props.title` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Movie title
    *   `props.postersrc` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** url of the src of the poster of the movie
    *   `props.rating` **string/number** rating of the movie
    *   `props.id` **string/number** imdb id of the movie to uniquely identify it
    *   `props.index` **any** unique index of the item in the dragdropcontext
    *   `props.deleteItemFromGrid` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** callback to delete the item from
        the list grid
    *   `props.customClick` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** callback to onclick function to display
        movie meta on clicking movie

Returns **ReactNode** HorizontalScrollList Component that allows
list of children to be horizontally scrollable.

## ItemTitle

Movie card title

### Parameters

*   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** {title, rating}

    *   `props.title` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** title of the card to be returned
    *   `props.rating` **string/number** rating of the movie

Returns **ReactNode** title for the image

## SearchBar

Reusable Search Bar component created from MUI

### Parameters

*   `callback` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** function that returns to movie selected

    *   `callback.movieDisplay`  

Returns **React.Node** Search Bar component with Movies

## SearchComponent

Renders the movie search component to be rendered in the modal form

### Parameters

*   `sendMovieData` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 


Returns **ReactNode** search component

## setMovie

props callback to display movie

### Parameters

*   `movie` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

## loading

render Render a React element into the DOM in the supplied
container and return a reference to the component
(in this case the search component)

Returns **ReactNode** search component to be rendered on the modal form

## MoviePage

**Extends Component**

Movie Page component

### Parameters

*   `props` **any** passed to the component

### deleteFromGrid

deletes item from grid/graph component

#### Parameters

*   `itemId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** the item that needs to be deleted

### deleteFromList

deletes item from list component

#### Parameters

*   `itemId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** the item that needs to be deleted

### onAddClick

Opens the modal box to add the movie

### toggle

Function to toggle(open/close) the modal form

### onSaveClick

Function to be triggered on trying adding the movie to the grid

### onDragEnd

Operation to be performed on dropping the object

#### Parameters

*   `result` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** is the result object that is given on dragging
    and dropping

### receiveMovieData

Callback function which is passed down to the child to
receive the data of the movie added

#### Parameters

*   `data` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** movie object passed while trying to add the movie

### render

render Render a React element into the DOM in the supplied
container and return a reference to the component
(in this case the movie page)

Returns **ReactNode** Movie Page Component containing the
comparison region and list of movies

## startMovies

Moving movie object from one grid to list or vice-versa
