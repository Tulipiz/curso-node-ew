/* 
docker ps
docker exec -it 810828fbc236 `
    mongo -u luiz -p dias --authenticationDatabase herois 

    */

// > show dbs (databases)
// > use herois(mudando contexto para uma database especifica)

// > show collections(mostra as tabelas ou coleções de documentos)




db.herois.find().pretty()

for(let i = 0; i <= 10000; i++){
    db.herois.insert({
        nome: `Clone-${i}`,
        poder:'Nenhum',
        dataNascimento: '1998-01-01'
    })
}

db.herois.count()
db.herois.findOne()
db.herois.find().limit(2).sort({nome: -1})
db.herois.find({},{ poder: 1, _id: 0})

// create
db.herois.insert({
    nome: 'Vegeta',
    poder:'Galick Gun',
    dataNascimento: '1998-01-01'
})
//read
db.herois.find()
//update
db.herois.update({_id: ObjectId("654ecfb1cb7291177697a2d2")},
            {nome: 'Trunks'})
db.herois.update({_id: ObjectId("654ed4c9cc7ccd0611aca7e6")},
            { $set : {nome: 'Kuririn'} })
db.herois.update({poder: 'Nenhum'},
            { $set : {poder: 'Solar Flare'} })
//delete
db.herois.remove({poder:'Nenhum'})