import * as types from '../constants/ActionTypes';
import * as url from '../utils/getURL';
import * as apiLayer from '../utils/apiLayer';

export function authentication(response) {
  return { type: types.AUTHENTICATION, authDetails: response };
}

export function validateLogin(userName, password) {
  return function(dispatch, getState) {
    const data = { userName, password };
    apiLayer.thunkCallback({
      url: url.verifyLogin(userName, password),
      method: 'POST',
      data,
      successCallback: (response) => dispatch(authentication(response))
    });
  };
}
