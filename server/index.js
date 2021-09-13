const express = require('express');
const app = express(); 
const port = process.env.PORT || 5000; 
import fetch from 'node-fetch'
// const fetch = require('node-fetch');
require('dotenv').config();

function init() {
  getForgeUserProfile(); // 403 Error - domain verification required
  getCalendlyUser(); // 200 OK
  getCalendlyEvents(); // 404 Error
}

function getCalendlyUser() {
  let url = 'https://api.calendly.com/users/me';

  let options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`}
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
}

// 404 Error - Resource Not Found
// can't proceed
function getCalendlyEvents() {
  let url = `https://api.calendly.com/scheduled_events/user/${process.env.CALENDLY_USER}`;
  // let url = `https://api.calendly.com/scheduled_events/organization/${process.env.CALENDLY_ORGANIZATION}`;

  let options = {
    method: 'GET',
    qs: {status: 'active'},
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`}
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
}

/* 403 Forbidden Error - can't proceed
  Must verify domain ownership - https://admin.atlassian.com/o/402470k8-c8j1-1k1j-7395-9d4bk54j785j/domains
  */
function getForgeUserProfile() {
  fetch(`https://api.atlassian.com/users/${process.env.FORGE_ACCOUNT_ID}/manage/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.FORGE_API_KEY}`,
      'Accept': 'application/json'
    }
  })
    .then(response => {
      console.log(
        `Get Profile Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));
}

// run and listen to server
app.listen(port, () => console.log(`Listening on port ${port}`)); 

// create a GET route
app.get('/backend', (req, res) => { 
  res.send({ express: 'Connected' }); 
});