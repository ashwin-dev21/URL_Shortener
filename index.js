const express = require('express');
const { connectToMongoDB } = require('./connect');
const urlRoutes = require('./routes/url');
const Url = require('./models/url');

const app = express();
const port = 8001;  

connectToMongoDB('mongodb://localhost:27017/url_shortener')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });     

app.use(express.json());
app.use("/url", urlRoutes);

app.get('/:shortId', async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: { timestamp: new Date() }
            }
        }   ,
    await Url.findOneAndUpdate({ shortId },{
        $push:{visitHistory: {timestamp: new Date()}}
    }));
    if(!entry){
        return res.status(404).json({error: 'Short URL not found'});
    }
    res.redirect(entry.redirectURL);
} );

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});