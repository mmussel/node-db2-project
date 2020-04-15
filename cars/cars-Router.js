const express = require('express');
const router = express.Router();
const knex = require('knex');
const KnexFile = require('../knexfile.js');
const db = knex(KnexFile.development);

router.get('/', (req,res)=> {
    db('cars')
    .then(cars => res.status(200).json(cars))
    .catch(err => res.status(500).json({message: err}))
})

router.get('/:id', (req,res)=> {
    const { id } = req.params;
    db('cars')
    .where({id : id })
    .first()
    .then(car => car ? res.status(200).json(car) : res.status(404).json({message: 'that id does not exist'}))
    .catch(err => res.status(500).json({message: err}))
})

router.post('/', postValidation, (req,res)=>{
    const body = req.body;
    db('cars')
    .insert(body)
    .then(newCar => 
        db('cars')
        .where({id: newCar[0]})
        .then(car => res.status(201).json(car))
        .catch(err => res.status(500).json({message: err}))
    )
    .catch(err => res.status(500).json({message: err}))
})

router.put('/:id', idValidation, (req, res)=> {
    const changes = req.body;
    const { id } = req.params;
    db('cars')
    .where({id : id})
    .update(changes)
    .then(car => car > 0 ? db('cars').where({id : id}).then(car => res.status(200).json(car)).catch(err => res.status(500).json({message: err}))
    : res.status(400).json({message: "could not update that id"}))
})

router.delete('/:id', idValidation , (req, res)=> {
    const { id } = req.params;
    db('cars')
    .where({id : id})
    .del()
    .then(number => 
        number !== 0 
        ?
        res.status(200).json({message: 'car was deleted'})
        : 
        res.status(400).json({message: 'car was not deleted'}))
    .catch(err => res.status(500).json({message: err}))
})

function idValidation (req,res,next){
    const { id } = req.params;
    db('cars')
    .where({id : id })
    .first()
    .then(car => car ? next() : res.status(404).json({message: 'that id does not exist'}))
    .catch(err => res.status(500).json({message: err}))
}

function postValidation(req,res,next){
    const body = req.body; 
    (body.VIN && body.make && body.model && body.miles) ? next() : res.status(400).json({message:'include all required fields'})
}

module.exports = router;