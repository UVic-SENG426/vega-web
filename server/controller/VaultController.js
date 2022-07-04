import express from 'express';
import { addsecret, fetchsecrets, deletesecret, updatesecret } from '../services/VaultAPI.js';
import fileUpload from 'express-fileupload';

let router = express();

router.use(fileUpload({
	limits: { fileSize: 50 * 1024 * 1024 },
  }));

router.get("/secrets", (req, res) => {
	const {username} = req.query;
	fetchsecrets(`http://localhost:8080/venus/vault/secrets?username=${username}`, req.headers)
	.then(response => {
    	console.log("Response", response);
    	res.send(response);
    })
    .catch(error => {
    	console.log("ERROR:", error);
    	res.send(error);
    })
})

router.post("/secret-upload", (req,res) => {
	console.log(req.body)
    addsecret("http://localhost:8080/venus/vault/secret-upload", req.body, req.headers)
    		.then(response => {
    			console.log("Response", response);
    			res.send(response);
    		})
    		.catch(error => {
    			console.log("ERROR:", error);
    			res.send(error);
    		})
})


router.delete("/secret-delete", (req,res) => {
	const {secretID} = req.query;
    deletesecret(`http://localhost:8080/venus/vault/secret-delete?secretID=${secretID}`, req.headers)
    		.then(response => {
    			console.log("Response", response);
    			res.send(response);
    		})
    		.catch(error => {
    			console.log("ERROR:", error);
    			res.send(error);
    		})
})

router.put("/secret-update", (req,res) => {
	const {secretID} = req.query;
    updatesecret(`http://localhost:8080/venus/vault/secret-update?secretID=${secretID}`, req.body, req.headers)
    		.then(response => {
    			console.log("Response", response);
    			res.send(response);
    		})
    		.catch(error => {
    			console.log("ERROR:", error);
    			res.send(error);
    		})
})

export default router;