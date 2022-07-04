import {doDelete, doGet, doPost, doPut} from './HTTPRequestAPI.js';

export function fetchsecrets(url, headers){
	console.log(headers);
	return doGet(url, headers['authorization'])
}

export function addsecret(url, data, headers){
	return doPost(url, data, headers['authorization']);
}

export function deletesecret(url, headers){
	return doDelete(url, headers['authorization']);
}

export function updatesecret(url, data, headers){
	return doPut(url, data, headers['authorization']);
}