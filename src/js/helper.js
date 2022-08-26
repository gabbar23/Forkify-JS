import {async} from 'regenerator-runtime'
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const getJson = async function(url){
    try{
    const response = await Promise.race([fetch(url),timeout(TIMEOUT_SEC)]);
    const responseData = await response.json();
    if (!response.ok) throw new Error(`Api Error`);
      return responseData;
    }
    catch(err){
        throw err
    }}