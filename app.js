import express from 'express'
// importing DB functions
import {getURL, getAppURL, createURL, UpdateURL, DeleteURL} from './database.js'


const app = express()
app.use(express.json())


// get all URLS
app.get("/urls", async (req, res)=>{
    const urls = await getURL()
    res.send(urls)
})
// get url by using ID
app.get("/urls/:id", async (req, res)=>{
    const id = req.params.id
    const url = await getAppURL(id)
    res.send(url)
})

// add new URL
app.post("/urls", async(req, res)=>{
    const { Application, URL, Status, ID } = req.body
    const newurls = await createURL(Application, URL, Status, ID)
    res.status(201).send(newurls)
})
// delete URL
app.delete("/durl/:id", async (req, res)=>{
    const id = req.params.id
    const delURL = await DeleteURL(id)
    res.send(delURL)
})


app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send('Something broke')  
})

app.listen(8080, ()=>{
    console.log('Server is running on port 8080');
    
})