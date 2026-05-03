const { nanoid }= require('nanoid');
const Url = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body || !body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const shortId = nanoid(8);
    const newUrl = new Url({
        shortId,
        redirectUrl: body.url,
        visitHistrory: [],
    });

    return res.json({id:shortId});
}

module.exports = {
    handleGenerateNewShortUrl,
};