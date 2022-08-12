const PaintingRoutes = require('express').Router();
const { authorize } = require("../../middleware/auth");
const {
    getAllPaintings, 
    getPaintingById, 
    createPainting, 
    updatePainting, 
    removePainting
} = require('./painting.controller')

const upload = require("../../middleware/file");
const rateLimit = require("express-rate-limit");

const paintingCreateRateLimit = rateLimit({
        windowMs: 1 * 60 * 1000, 
        max: 2,
        standardHeaders: true,
        legacyHeaders: false,
});

PaintingRoutes.get('/getAll',[authorize], getAllPaintings)
PaintingRoutes.get('/:id',[authorize], getPaintingById)
PaintingRoutes.post('/create', [authorize, paintingCreateRateLimit], upload.single("image"), createPainting)
PaintingRoutes.patch('/update/:id', [authorize], updatePainting)
PaintingRoutes.delete('/delete/:id', [authorize], upload.single("image"), removePainting)



module.exports = PaintingRoutes;
