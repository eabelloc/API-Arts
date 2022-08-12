const PaintingsListRoutes = require('express').Router();
const { authorize } = require("../../middleware/auth");
const {
    getAllPaintingsList, 
    getPaintingsListById, 
    createPaintingsList, 
    updatePaintingsList, 
    removePaintingsList
} = require('./paintingsList.controller')

const upload  = require("../../middleware/file");
const rateLimit = require("express-rate-limit");

const paintingsListCreateRateLimit = rateLimit({
        windowMs: 1 * 60 * 1000, 
        max: 2,
        standardHeaders: true,
        legacyHeaders: false,
});

PaintingsListRoutes.get('/getAll',[authorize], getAllPaintingsList)
PaintingsListRoutes.get('/:id',[authorize], getPaintingsListById)
PaintingsListRoutes.post('/create', [authorize, paintingsListCreateRateLimit], upload.single("image"), createPaintingsList)
PaintingsListRoutes.patch('/update/:id', [authorize], updatePaintingsList)
PaintingsListRoutes.delete('/delete/:id', [authorize], upload.single("image"), removePaintingsList)



module.exports = PaintingsListRoutes;