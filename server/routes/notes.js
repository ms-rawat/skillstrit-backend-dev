const express = require('express');
const router = express.Router();
const Note = require('../modals/Note'); 
const mongoose = require('mongoose');
const basicAuth = require('basic-auth');

// Middleware for basic Authentication
const authentication = (req, res, next) => {
    const credentials = basicAuth(req);
     console.log(credentials)
    if (!credentials || !authenticationCredentials(credentials)) {
        res.setHeader('WWW-Authenticate', 'Basic realm="example realm"');
        return res.status(401).send('Unauthorized');
    }
    next();
};

// Function to validate credentials
const authenticationCredentials = (credentials) => {
    const username = 'mohar';
    const password = 'password';

    return credentials.name === username && credentials.pass === password;
};

// Middleware for handling validation errors
function handleValidationError(err, res) {
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(error => error.message);
        return res.status(400).json({ errors });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
}

// Applying basic authentication to all routes
router.use(authentication);

// Creating a note
router.post('/create', async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });
        await note.save();
        res.json(note);
    } catch (error) {
        handleValidationError(error, res);
    }
});

// Retrieve notes
router.get('/', async (req, res, next) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Internal server Error' });
    }
});

// Update note
router.put('/update/:id', async (req, res, next) => {
    try {
        const { title, content } = req.body;

        // Title and content validation
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json(updatedNote);
    } catch (error) {
        handleValidationError(error, res);
    }
});

// Deleting note
router.delete('/:id', async (req, res, next) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.send('Note deleted successfully');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
