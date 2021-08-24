/* eslint-disable no-unused-vars */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Rating} from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import {Avatar, Box, Chip, Divider, Grid, Table} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TableCell from '@material-ui/core/TableCell';
import {Star} from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    width: '100%',
    height: '100%',
    paddingTop: '100%',
    justifyContent: 'center',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'Green',
    fontSize: 15,
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));
/**
 * Movie Meta data display element to display movie data
 * @param {any} props props passed to the component
 * @return {ReactNode} Movie Meta data display element
 */
function MovieMetaData({movie}) {
  const classes = useStyles();
  const {Title, Year, Rated, Released, Runtime, Genre, Director,
    Writer, Actors, Plot, Country, Awards, Poster, Ratings, Metascore,
    imdbRating, imdbVotes, Type, DVD, BoxOffice, Production,
    Website, Response} = movie;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    Response?
    <Card className={classes.root}>
      <CardHeader
        title={Title}
        subheader={<HeaderSubtitle Year={Year} Rated={Rated}
          Runtime={Runtime} Type={Type}/>}
        action={ <Box display='flex' flexDirection='row'>
          {imdbRating!=='N/A'? <RatingCard votes={imdbVotes} rating={imdbRating}
            source={'IMDb score'} width='100%'/>:<></>}
          {Metascore!=='N/A'?<RatingCard rating={Metascore}
            source={'MetaScore'} width='100%'/>:<></>}</Box>}
      />
      <CardMedia
        className={classes.media}
        image={Poster}
        title={Title}
      />
      <CardContent>
        <Box display='flex' flexDirection='row'>
          {Genre.split(',')?.map((el) => (<Chip variant='outlined' disabled
            label={el}
            key={el} />))}
        </Box>
        <Typography paragraph>
          {Plot}
        </Typography>
        <Divider variant = 'fullWidth' />
        <Typography paragraph>
          <br/>
          <b>Director </b>  {Director}
        </Typography>
        <Divider variant = 'fullWidth' />
        <Typography paragraph>
          <br/>
          <b>Writer </b> {Writer.split(',')?.map((el) => (el))}
        </Typography>
        <Divider variant = 'fullWidth' />
        <Typography paragraph>
          <br/>
          <b>Stars </b> {Actors.split(',')?.map((el) => (el))}
        </Typography>
        <Divider variant = 'fullWidth' />
      </CardContent>
      <CollapsibleArea title='Details'>
        <Typography paragraph gutterBottom>
          <b>Release Date </b> {Released}
          <Divider variant='fullWidth'/>
          <b>Countries of Origin </b> {Country?.split(',')?.map((el) => (el))}
          <Divider variant='fullWidth'/>
          <b>Official Websites </b> {Website?.split(',')?.map((el)=>(el))}
          <Divider variant='fullWidth'/>
          <b>Production Companies</b> {Production?.split(',')?.map((el)=>(el))}
          <Divider variant='fullWidth'/>
          <b>Box Office </b> {BoxOffice}
          <Divider variant='fullWidth'/>
          <b>Awards </b> {Awards}
          <Divider variant='fullWidth'/>
          <b>DVD Release</b> {DVD}
        </Typography>
      </CollapsibleArea>
      <CollapsibleArea title = 'Ratings'>
        <Grid container direction='row' alignItems='center'>
          <Box display='flex' flexDirection='row'>
            {Ratings?.map((rating)=>
              <RatingCard key={rating.Source} rating={rating.Value} width='25%'
                source={rating.Source}/>)}
            <RatingCard rating={imdbRating} width='25%'
              source={'IMDb'}/>
          </Box>
        </Grid>
      </CollapsibleArea>
    </Card>: <></>
  );
}
MovieMetaData.propTypes = {
  movie: PropTypes.object,
};
export default MovieMetaData;

/**
 * Returns header element
 * @param {Year} Year of release
 * @param {Rating} Rating of the movie
 * @param {Runtime} length of the movie
 * @return {ReactNode} subtitle
 */
function HeaderSubtitle({Year, Rated, Runtime, Type}) {
  return (<>
    <Chip variant='outlined' disabled label={Year}/>
    <Chip variant='outlined' disabled label={Rated}/>
    <Chip variant='outlined' disabled label={Runtime}/>
    <Chip variant='outlined' disabled label={Type}/>
  </>);
}

HeaderSubtitle.propTypes = {
  Year: PropTypes.string,
  Rated: PropTypes.string,
  Runtime: PropTypes.string,
  Type: PropTypes.string,
};

const useAccordianStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
/**
 * Accordian Component
 * @return {ReactNode} Accordian component
 */
function CollapsibleArea({title, children}) {
  const classes = useAccordianStyles();
  return (<div className={classes.root}>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}><b>{title}</b></Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {children}
        </Typography>
      </AccordionDetails>
    </Accordion>
  </div>);
}

CollapsibleArea.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

const RatingCard = ({rating, source, votes, width}) => {
  return (<Card style={{width: width}}>
    <CardContent>
      <Typography variant='h5' gutterBottom>
        <Star/> {rating}</Typography>
      {votes?<Typography> {votes}</Typography>:<></>}
      <Typography variant='h6' gutterBottom>{source}</Typography>
    </CardContent>
  </Card>);
};

RatingCard.propTypes = {
  rating: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  votes: PropTypes.string,
  width: PropTypes.string,
};
