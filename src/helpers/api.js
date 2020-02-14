import axios from 'axios';
import { getDomain } from './getDomain';

export const api = axios.create({
  baseURL: getDomain(),
  headers: { 'Content-Type': 'application/json' }
});

export const handleError = error => {
  if (error.response) {
    let info = '';
    info += `\nrequest to: ${error.response.request.responseURL}`;
    info += `\nstatus code: ${error.response.status}`;
    info += `\nstatus text: ${error.statusText}`;
    info += `\nerror: ${error.response.data.error}`;
    info += `\nerror message: ${error.response.data.message}`;

    console.log('The request was made and answered but was unsuccessful.', error.response);
    return info;
  } else {
    if (error.message.match(/Network Error/)) {
      alert('The server cannot be reached. Did you start it?');
    }

    console.log('Something else happened.', error);
    return error.message;
  }
};
