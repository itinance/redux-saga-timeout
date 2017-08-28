

import { channel } from 'redux-saga';
import { take, put, call } from 'redux-saga/effects';

export const timeoutChannel = channel()

import {ACTION_SET_TIMEOUT, ACTION_PUT, ACTION_CALL} from '../actions';

const __setTimeout = window.setTimeout;

export function * watchTimeoutChannel() {
  while (true) {
    const action = yield take(timeoutChannel)
    const type = action.type
    
    try {
        if(type)
        switch(type) {
            case ACTION_SET_TIMEOUT: {
                const {method, milliseconds} = action.payload;

                __setTimeout(method, milliseconds)
                break;
            }
                
            case ACTION_PUT:
                yield put(action.payload)
                break;

            case ACTION_CALL: {
                console.log(6, action.payload)
                const {method} = action.payload;
                yield call(method);
                break;
            }
        }
    } catch(err) {
        console.log("Error", err)
    }
  }
}

export function * setTimeout(ms, callback ) {
    const action = {
        type: ACTION_SET_TIMEOUT, payload: {
            milliseconds: ms,
            method: _createAction(callback)
        }
    }

    timeoutChannel.put(action)

}

function _createAction(callback) {
    //console.log('X', callback, callback.put)
    if(typeof callback.put === 'object' && callback.put !== null) {
        return () => timeoutChannel.put({type: ACTION_PUT, payload: callback.put})
    }
    if(typeof callback.call === 'function' && callback.call !== null) {
        return () => timeoutChannel.put({type: ACTION_CALL, payload: {method: callback.call}});
    }
    if(typeof callback.call === 'object' && callback.call !== null) {
        return () => timeoutChannel.put({type: ACTION_CALL, payload: callback.call});
    }
}