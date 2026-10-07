const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

const apiRouter = express.Router();

apiRouter.get('/time', (req, res) => {
    res.json({
        datetime: new Date().toISOString(),
        timestamp: Date.now()
    });
});
apiRouter.get('/info', (req, res) => {
    res.json({
        name: 'Workshop03 Express Server',
        version: '1.0.0',
        nodeVersion: process.version
    });
});
app.use('/api', apiRouter);

app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).send('500 - Internal Server Error');
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log('\n📍 Available routes:');
    console.log('  GET /              -> Home page');
    console.log('  GET /about         -> About page');
    console.log('  GET /contact       -> Contact page');
    console.log('  GET /api/time      -> Current date/time API');
    console.log('\n⏹️  Press Ctrl+C to stop the server\n');
});