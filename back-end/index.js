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

  user.username = received.username,
  user.avatar = received.avatar

  res.status(201).send('Ok');
});

app.post('/tweets', (req, res) => {
  const received = req.body;
  let tweet = {
    username: received.username,
    avatar: user.avatar,
    tweet:  received.tweet
  };
  tweets.push(tweet);
  console.log(tweets);
  res.status(201).send('Ok');
});

app.get('/tweets',(req, res) => {
  if (tweets.length>=10){
    tweets=tweets.slice(Math.max(tweets.length-10,0));
    res.status(200).send(tweets);
  }else{
    res.status(200).send(tweets);  
  }
});

app.listen(5000);