const axios =  require('axios').default;
const fs = require('fs')

const url = 'https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=e241462c5ac6569cf07336f3a0dd60c54a955709'

axios.get(url)
    .then(data => {
        fs.writeFile(__dirname + '/desafio.json', JSON.stringify(data.data), err => {
            console.log(err || 'Arquivo salvo'); 
        })
    }).catch(err => {
        console.log(err)
    });