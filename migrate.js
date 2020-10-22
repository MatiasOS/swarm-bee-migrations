const { SwarmClient } = require('@erebos/swarm-node');
const fetch = require('node-fetch');
var FormData = require('form-data');
const axios = require('axios');
const { Readable } = require("stream")

const client = new SwarmClient({
  bzz: { url: 'http://localhost:8500' },
});


const downloadFromSwarm = async (swarmHash) => {
  try {
    console.log(`Downloading from swarm ${swarmHash}`);
    const response = await client.bzz.download(swarmHash);
    console.log(`Status: ${response.status}`);
    return response.text(); // or .something
  } catch (e) {
    console.log(`downloadFromSwarm fail: ${swarmHash}`);
    console.error(e);
  }
}

const uploadToBee = async (swarmHash, file) => {
  console.log(`Uploading to bee ${swarmHash}`);
  try {

    const FormData = require('form-data');
 
    const form = new FormData();
    form.append('file', Readable.from([file])
    );
    const response = await axios.post('http://localhost:8080/files', form, { headers: form.getHeaders() })

    console.log(`Bee hash: ${response.data.reference}`);
    return response.data.reference; 


  } catch (e) {
    console.log(`uploadToBee fail: ${swarmHash}`);
    console.error(e);
    return `Fail: ${swarmHash}`;
  }
}

const verifyBee = async (swarmHash, beeHash) => {
  try {
    console.log(`Verifing swarm hash: ${swarmHash} with bee hash ${await beeHash}`)
    const response = await fetch(`http://localhost:8080/files/${await beeHash}`);
    console.log(`Status: ${response.status}`);
    return true;
  } catch (e) {
    console.log(`Can not verify swarm hash: ${swarmHash} with bee hash ${beeHash}`);
    console.error(e);
    return false;
  }
};


// download from swarm
// upload to bee

// Validate uplodate

// Update db


const swarmHash = '89b241f68cb95e4706a4be92bff28224ab90886a54c6b743acc29422e94055e1';

const beeTestFileHash = 'e6db11d5ea647e4e1e338071072363989aa97fa0a43291042ba4d669845bffb1'; // Not related with swarmHash

const fileAsText = downloadFromSwarm(swarmHash);

const beeHash = uploadToBee(swarmHash, fileAsText)
verifyBee(swarmHash, beeHash);