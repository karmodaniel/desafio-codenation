const axios =  require('axios').default;
const express = require('express')
const app = express()
const fs = require('fs');
const sha1 = require('js-sha1')

const url = 'https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=e241462c5ac6569cf07336f3a0dd60c54a955709'
const alfabeto = ['a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm','n','o','p','q','r','s','t','u','v','w','x', 'y', 'z']
 


function getChallenge(){
      axios.get(url)
        .then(data => {
         writeFile(data.data)   
        }).catch(err => {
            return err;
        });
    }

function writeFile(challenge) {
   const dir = __dirname + '/answer.json'
    fs.writeFile(dir, JSON.stringify(challenge), err => {
        console.log( err || 'Arquivo salvo.'); 
     })
  
}  

function decifrar() {
    fs.readFile(__dirname + '/answer.json','utf-8',(err, data) => {
        challenge = JSON.parse(data)
        const {cifrado} = challenge
        
        let notCifrado = []
        for (let i = 0; i < cifrado.length; i++) {
            let aux = alfabeto.indexOf(cifrado[i])
            if( aux != -1) {
                notCifrado.push(alfabeto[aux - 1])
            }else {
                notCifrado.push(cifrado[i])
            }
    
        } 
        //decifrar 
        decifrado = notCifrado.join('');
        challenge.decifrado = decifrado;
        writeFile(challenge);
        //cifrar sha1
        const resumo = sha1(decifrado);
        challenge.resumo_criptografico = resumo
        writeFile(challenge);
        console.log(challenge);
    })
    
}

function sendAnswer() {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

   return
   
}

app.get('/resposta', (req, res) => {

})

app.listen(3000);

//getChallenge()
decifrar()
