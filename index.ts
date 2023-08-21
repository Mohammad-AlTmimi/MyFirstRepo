import express from 'express'
const app = express();
const PORT = 3000;
import data from './dist/Data.js'
app.use(express.json());

app.listen(PORT , ()=>{
    console.log(`App is Running and listening on post ${PORT}`);
})
app.get('/' , (req , res) =>{
    res.status(200).json(data);
})
app.get('/:id' , (req , res) =>{
    const userId = parseInt(req.params.id, 0);
    const Find = data.filter(item => item.id === userId);
    if(Find.length !== 0){
        res.status(200).send(Find);
        return ;
    }
    res.status(400).send({message : "There is no book like this id number"});

})
app.get('/:title' , (req , res) =>{
    const Title =  (req.body.title);
    const Find = data.filter(item => item.title === Title);
    if(Find.length !== 0){
        res.status(200).send(Find);
        return ;
    }
    res.status(400).send({message : "There is no book like this Title number"});
})
app.delete('/:id' , (req , res) =>{
    const userId = parseInt(req.params.id, 0);
    const Find = data.findIndex(item => item.id === userId);
    if(Find !== -1){
        data.splice(Find , 1);
        res.status(200).send({message: "done"});
        return ;
    }
    res.status(404).send({message: "The id you send wrong"});
})  
app.get("/health", function (req, res) {
	res.sendStatus(200);
})
app.post('/' , (req , res) =>{
    // "id": 1,
    // "title": "To Kill a Mockingbird",
    // "author": "Harper Lee",
    // "publicationYear": 1960
    const id = data[data.length + 1];
    const Title = req.body.title;
    const Author = req.body.author;
    const PublicationYear = parseInt(req.body.publicationYear);
    const obj: any = {
        id: 123, // Replace with your desired ID
        title: "1984",
        author: "George Orwell",
        publicationYear: 1949
    };
    data.push(obj);
    res.status(200).send({message : "Done"});
})
app.put('/:id' , (req , res) => {
    const ID : Number = parseInt(req.params.id);
    let found = data.findIndex((item) => ID === item.id)
    if(found != -1){
        const obj = {
            id : data[found].id,
            title : req.body.title || data[found].title,
            author: req.body.author || data[found].author,
            publicationYear: req.body.publicationYear || data[found].publicationYear
        }
        data[found] = obj;
        res.status(200).send({message : "Done"})
        return ;
    }
    res.status(400).send({message : "NotDone"})
})
