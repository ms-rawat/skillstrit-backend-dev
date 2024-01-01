const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017')

const notesRoutes = require('./routes/notes');
app.use('/api/notes',notesRoutes);

app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).send('Something went wrong');

})

app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))