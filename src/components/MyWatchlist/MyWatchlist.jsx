import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Grid, MenuItem, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MyWatchlistItem from '../MyWatchlistItem/MyWatchlistItem';

function MyWatchlist () {

    //declare dispatch
    const dispatch = useDispatch();

    //bring in players from my watchlist reducer
    const players = useSelector(store => store.myWatchlistReducer);
    
    useEffect(() => {
        dispatch({
            type: 'FETCH_WATCHLIST',
        });
    }, []);

    //declare local states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [position, setPostion] = useState('');
    const [team, setTeam] = useState('');
    const [notes, setNotes] = useState('');
    const [image, setImage] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        
        //create object to send
        let playerObject = {
            first_name: firstName,
            last_name: lastName,
            position: position,
            team: team,
            notes: notes,
            image_url: image
        }

        dispatch({
            type: 'ADD_TO_WATCHLIST',
            payload: playerObject
        });

        //clear inputs
        setFirstName('');
        setLastName('');
        setPostion('');
        setTeam('');
        setNotes('');
        setImage('');
    }

    const useStyles = makeStyles({
        root: {
            minWidth: 250,
        },
        gridContainer: {
            paddingLeft: "80px",
            paddingRight: "80px",
            flexWrap: "wrap",
        },
        image: {
            height: 0,
            paddingTop: "100%"
        },
        text: {
            textAlign: "center",
        },
        title: {
            textAlign: "center",
        }

    });

    const classes = useStyles();
    
    return (
        
    <div>   
        <div>
            <h2>Welcome to the My Watchlist Page!</h2>
            <h3 className="centerText">Fill out the form below to add players to keep an eye on as the season progresses</h3>
            <h3 className="centerText2">Add an image if you like, and don't forget to add notes!</h3>
            
            <form onSubmit={handleSubmit}>

                <TextField 
                type="text" 
                label="First Name"
                variant="outlined"
                style={{marginLeft: 80, marginTop: 32}} 
                value={firstName}
                onChange={(evt) => setFirstName(evt.target.value)}/>
                
                <TextField 
                type="text" 
                label="Last Name"
                variant="outlined"
                style={{marginLeft: 32, marginTop: 32}}
                value={lastName} 
                onChange={(evt) => setLastName(evt.target.value)} />

                <Select 
                value={position}
                style={{marginLeft: 32, marginTop: 32, marginBottom: 32}}
                displayEmpty 
                variant="outlined"
                onChange={(evt) => setPostion(evt.target.value)}>
                    <MenuItem value="" disabled>Position</MenuItem>
                    <MenuItem value="QB">QB</MenuItem>
                    <MenuItem value="RB">RB</MenuItem>
                    <MenuItem value="WR">WR</MenuItem>
                    <MenuItem value="TE">TE</MenuItem>
                </Select>

                <TextField 
                type="text" 
                label="Team"
                variant="outlined"
                style={{marginLeft: 32, marginTop: 32}}
                value={team}
                onChange={(evt) => setTeam(evt.target.value)}/>

                <TextField 
                type="text" 
                label="Notes"
                variant="outlined"
                style={{marginLeft: 32, marginTop: 32}}
                multiline 
                value={notes}
                onChange={(evt) => setNotes(evt.target.value)}/>

                <TextField 
                type="text" 
                label="Image URL"
                variant="outlined" 
                style={{marginLeft: 32, marginTop: 32}}
                value={image}
                onChange={(evt) => setImage(evt.target.value)}/>

                <Button
                variant="contained"
                style={{backgroundColor: '#2196f3', fontFamily: `"Optima", sans-serif`, marginLeft: 650}} 
                startIcon={<AddCircleOutlineIcon />}
                type="submit">Add Player</Button>

            </form>
        </div>

        <Grid container spacing={4} className={classes.gridContainer}>
            {players.map ((player, i) => {
                return <MyWatchlistItem key={i} player={player}/>
            })}
        </Grid>

    </div>
    )
}

export default MyWatchlist;