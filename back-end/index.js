import express,{json} from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(json());

let user = {
  username: "",
  avatar: "",
};

app.post('/sign-up', (req, res) => {
  const received = req.body;

  user.username = received.username,
  user.avatar = received.avatar

  console.log(user);
  res.status(200).send('Ok');
})

app.listen(5000)