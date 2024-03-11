const express = require('express');
const articles = require ('./articles.json');
const app = express();

app.use(express.json())
//Route principale avec la methode Get
app.get('/', ((req, res) =>{
    res.send({
        name:"mengi"
    })
}))

//Route de la Ressource Articles avec la methode Get
app.get('/articles', (req,res)=>{
    // console.log('Bango')
    res.send({articles})
})

//Route de la Ressource Articles par Identifiant avec la methode Get
app.get ("/articles/:id",(req,res)=>{
    const {id} = req.params
    const foundArticles = articles.find((article)=>article.id==id)
    if (foundArticles){
        res.status(200).json(foundArticles)
    }else{
        res.status(404).send("Articles Not found")
    }
    })

// Route de la Ressource Articles avec la methode Post 
app.post('/articles', (req,res)=>{
    // const body = req
    // const newArticles = {
    //     id : articles.length +1,
    //     ...body
    // }
    // articles.push(newArticles)
    // res.status(200).json(newArticles)
const myid = articles.length +1
const allArticles = { ...{id :myid},...req.body}
articles.push(allArticles)
const message= ` Art ${allArticles.titleArticles} bien`
res.status(200).json((message,allArticles))
})

app.put('/articles/:id', (req,res)=>{
const myiden = req.params.id
const allArt = articles.find(el=>el.id === parseInt(myiden))
if(!allArt){
  res.json(`Echoué`)
}else{
    allArt.titleArticles = req.body.titleArticles
}
res.status(200).json(allArt)
})

app.delete('/articles/:id', (req,res)=>{
const identifiant = req.params.id
const foundArt = articles.find(el=>el.id ==+identifiant )
if(!foundArt) 
return res.json({message:"not found "})   
articles.splice(articles.indexOf(identifiant),1) 
res.status(200).json({message:"Supp"})
})



app.listen(3000, console.log("serveur"));