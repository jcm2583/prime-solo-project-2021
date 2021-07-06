import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//create a function to GET players for my players table
function* fetchAllMyPlayers (action) {
    console.log(action.payload);
    try {
        const response = yield axios.get(`/api/my-rankings/${action.payload}`)
        //send server data to reducer
        console.log(response.data);
        yield put({type: 'SET_MY_PLAYERS', payload: response.data})
    } catch (err) {
        console.log("Error in GET all player saga", err);
    }
}

//create function to get QB
function* fetchMyQb (action) {
    console.log(action.payload);
    try {
        const response = yield axios.get(`/api/my-rankings/${action.payload}`);
        console.log(response.data);
        yield put({type: 'SET_MY_QB', payload: response.data})
    } catch (err) {
        console.log("Error in GET my qb saga", err);
    }
}

//create a function to get RB
function* fetchMyRb (action) {
    console.log(action.payload);
    try {
        const response = yield axios.get(`/api/my-rankings/${action.payload}`);
        console.log(response.data);
        yield put({type: 'SET_MY_RB', payload: response.data})
    } catch (err) {
        console.log('Error in GET my rb saga', err);
    }
}

//create a function to get WR
function* fetchMyWr (action) {
    console.log(action.payload);
    try {
        const response = yield axios.get(`api/my-rankings/${action.payload}`);
        console.log(response.data);
        yield put({type: 'SET_MY_WR', payload: response.data})
    } catch (err) {
        console.log('Error in GET my wr saga', err);
    }
}

//create a function to get TE
function* fetchMyTe (action) {
    console.log(action.payoad);
    try {
        const response = yield axios.get(`api/my-rankings/${action.payload}`);
        console.log(response.data);
        yield put({type: 'SET_MY_TE', payload: response.data})
    } catch (err) {
        console.log('Error in GET my te saga', err);
    }
}
//define addPlayer function to post data to database
function* addPlayer (action) {
    console.log(action.payload);
    try {
        yield axios.post('/api/my-rankings', action.payload);
        //re-render with the added player
        yield put({type: 'FETCH_ALL_MY_PLAYERS', payload: 'all'});
    } catch (err) {
        console.log('Error in add player saga', err);
    }
}

//create a function that will delete a player from database
function* removePlayer (action) {
    console.log(action.payload);
    try {
        yield axios.delete(`/api/my-rankings/${action.payload.id}`, action.payload)
        //re-render with deleted player
        yield put({type: 'FETCH_ALL_MY_PLAYERS', payload: 'all'});
    } catch (err) {
        console.log('Error in delete player sage', err);
    }
}

//create a function that will increase the player rank
function* changeAllRank (action) {
    console.log(action.payload);
    try {
        yield axios.put(`/api/my-rankings/${action.payload.player.id}`, action.payload)
        //re-render my player list
        console.log(action.payload);
        yield put({type: 'FETCH_ALL_MY_PLAYERS', payload: 'all'})
    } catch (err) {
        console.log('Error in change all rank saga', err);
    };
}

//create a function to change the qb rank
function* changeQbRank (action) {
    console.log(action.payload);
    try {
        yield axios.put(`api/my-rankings/qb/${action.payload.player.id}`, action.payload);
        yield put({type: 'FETCH_MY_QB', payload: 'qb'})
    } catch (err) {
        console.log('Error in change qb rank saga', err);
    }
}

//create a function to change the rb rank
function* changeRbRank (action) {
    console.log(action.payload);
    try {
        yield axios.put(`api/my-rankings/rb/${action.payload.player.id}`, action.payload);
        yield put({type: 'FETCH_MY_RB', payload: 'rb'})
    } catch (err) {
        console.log('Error in change rb rank saga', err);
    }
}

//create a function to change the wr rank
function* changeWrRank (action) {
    console.log(action.payload);
    try{
        yield axios.put(`api/my-rankings/wr/${action.payload.player.id}`, action.payload);
        yield put({type: 'FETCH_MY_WR', payload: 'wr'})
    } catch (err) {
        console.log('Error in change wr rank saga', err);
    }
}

//create a function to change the te rank
function* changeTeRank (action) {
    console.log(action.payload);
    try {
        yield axios.put(`api/my-rankings/te/${action.payload.player.id}`, action.payload);
        yield put({type: 'FETCH_MY_TE', payload: 'te'});
    } catch (err) {
        console.log('Error in change te rank saga', err);
    }
}

// create a saga that will
function* myRankingsSaga () {
    yield takeLatest('FETCH_ALL_MY_PLAYERS', fetchAllMyPlayers);
    yield takeLatest('FETCH_MY_QB', fetchMyQb);
    yield takeLatest('FETCH_MY_RB', fetchMyRb);
    yield takeLatest('FETCH_MY_WR', fetchMyWr);
    yield takeLatest('FETCH_MY_TE', fetchMyTe);
    yield takeLatest('ADD_PLAYER', addPlayer);
    yield takeLatest('REMOVE_PLAYER', removePlayer);
    yield takeLatest('INCREASE_ALL_RANK', changeAllRank);
    yield takeLatest('DECREASE_ALL_RANK', changeAllRank);
    yield takeLatest('INCREASE_QB_RANK', changeQbRank);
    yield takeLatest('DECREASE_QB_RANK', changeQbRank);
    yield takeLatest('INCREASE_RB_RANK', changeRbRank);
    yield takeLatest('DECREASE_RB_RANK', changeRbRank);
    yield takeLatest('INCREASE_WR_RANK', changeWrRank);
    yield takeLatest('DECREASE_WR_RANK', changeWrRank);
    yield takeLatest('INCREASE_TE_RANK', changeTeRank);
    yield takeLatest('DECREASE_TE_RANK', changeTeRank);
}

export default myRankingsSaga;