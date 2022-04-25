import express,{json} from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(json());

let user = {
  username: "",
  avatar: "",
};
let tweets = [];


app.post('/sign-up', (req, res) => {
  const received = req.body;

  user.username = received.username;
  user.avatar = received.avatar;

  if (user.username==='' || user.avatar===''){
    res.sendStatus(400).send('Todos os campos são obrigatórios!')
  }else{
    res.status(201).send('Ok');  
  }
});

app.post('/tweets', (req, res) => {
  let newTweet = {
    username: req.headers.user,
    avatar: user.avatar,
    tweet: req.body.tweet
  };

  if(newTweet.username != '' && newTweet.tweet != ''){
    tweets.unshift(newTweet);
    res.status(201).send('Ok');  
  }else{
    res.sendStatus(400).send('Todos os campos são obrigatórios!');
  }
});

app.get('/tweets',(req, res) => {
  let page = req.query.page;
  let initial = (page-1)*10;
  let final = (page*10);
  let pageTweets = tweets.slice(initial,final);

  if(isNaN(page) || page<1){
    res.sendStatus(400).send('Informe uma página válida!')
  }else{
    res.status(200).send(pageTweets);  
  };
});

app.get('/tweets/:username', (req, res) => {
  const user = req.params.username;

  let userTweets = tweets.filter(tweet => {
    return tweet.username === user;
  });
  
  res.status(200).send(userTweets);
});

app.listen(5000);