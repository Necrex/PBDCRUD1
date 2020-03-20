const express = require('express');
const router = express.Router();

const Task = require('../models/task')
const listingsAndReviews = require('../models/rentals')

router.get('/', async (req,res) => {
    const tasks = await Task.find();
    res.render('index', {
        tasks
    })
})

router.post('/add', async (req,res) => {   
    const task = new Task(req.body);
    console.log(task);
    await task.save();
    res.redirect('/');
})

router.get('/turn/:id' , async (req,res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    if(task.Status === "Active"){
        task.Status = "Inactive";
    }else{
        task.Status = "Active"
    }
    await task.save();
    res.redirect('/search');
})

router.get('/delete/:id' , async (req,res) => {
    const { id } = req.params;
    await Task.remove({_id: id});
    res.redirect('/');
})

router.get('/edit/:id' , async (req,res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit',{
        task
    });
})

router.post('/edit/:id' , async (req,res) => {
    const { id } = req.params;
    const task = await Task.update({_id:id}, req.body);
    res.redirect('/table');
})

router.get('/search' , async (req,res) => {
    const tasks = await Task.find();
    res.render('search', {
        tasks
    })
})

router.post('/search' , async (req,res) => {
    const tasks = await Task.find(req.body);
    console.log(JSON.stringify(req.body) !== JSON.stringify({_id:req.body._id}));
    if(JSON.stringify(req.body) !== JSON.stringify({_id:req.body._id})){
        res.render('search', {
            tasks
        })
    }else{
        res.render('table', {
            tasks
        })
    }
})
router.post('/searchD' , async (req,res) => {
    const tasks = await Task.remove(req.body);
    res.redirect('/search'); 
})

router.get('/table' , async (req,res) => {
    const tasks = await Task.find();
    res.render('search', {
        tasks
    })
})

router.get('/RentasClientes' , async (req,res) => {
    const cus = await Task.aggregate([
        {
            $lookup: {
              from: 'listingsAndReviews',
              localField: '_id',
              foreignField:'id_customer',
              as:'Rentals'
            }
        }
    ])
    res.json(cus);
})

router.get('/PropiedadTipo/:property_type' , async (req,res) => {
    const tasks = await listingsAndReviews.find(req.params);
    console.log(req.params)
    res.json(tasks);
})

router.get('/RangoPrecio/:min/:max', async (req, res) =>{
    const range = await listingsAndReviews.find({$and: [{"price":{$gte: req.params["min"]}},{"price":{$lte: req.params["max"]}}]})
    res.json(range);
})




module.exports = router;