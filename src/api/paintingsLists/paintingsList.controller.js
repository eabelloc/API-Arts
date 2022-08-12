const PaintingsList = require("./paintingsList.model");
const { setError } = require("../../helpers/utils/error");
const { deleteFile } = require("../../middleware/delete-file");

const getAllPaintingsList = async (req, res, next) => {
  try {
    const paintingsLists = await PaintingsList.find().populate("users paintings");/*.sort({ createAt: 'desc' })*/
    return res.status(200).json({
      message: 'All PaintingsList',
      paintingsLists
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed recover all paintingsLists'));
  }
}

const getPaintingsListById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const paintingsList = await (await PaintingsList.findById(id)).populate("users paintings");
    if (!paintingsList) return next(setError(404, error.message | 'PaintingsList not found'));
    return res.status(200).json({
      message: 'PaintingsList by Id',
      paintingsList
    })

  } catch (error) {
    return next(setError(500, error.message | 'Failed paintingsList id'));
  }
}

const createPaintingsList = async (req, res, next) => {
  try {
    const paintingsList = new PaintingsList(req.body);
    // Recogemos el path -> url de cloudinary - cover
    if (req.file) paintingsList.image = req.file.path;
    constpaintingsListInDb = await paintingsList.save();

    return res.status(201).json({
      message: 'Created new PaintingsList',
      constpaintingsListInDb
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed create paintingsList'));
  }
}

const updatePaintingsList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const paintingsList = new PaintingsList(req.body);
    paintingsList._id = id;
    // Si pasamos un nuevo cover -> se añade sobre su porpiedad
    if (req.file) paintingsList.image = req.file.path;
    const updatedPaintingsList = await PaintingsList.findByIdAndUpdate(id, paintingsList);
    if (!updatedPaintingsList) return next(setError(404, 'PaintingsList not found'));
    return res.status(201).json({
      message: 'Updated PaintingsList',
      updatedPaintingsList
    })

  } catch (error) {
    return next(setError(500, error.message | 'Failed updated paintingsList'));
  }
}

const removePaintingsList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPaintingsList = await PaintingsList.findByIdAndDelete(id);
    if (deletedPaintingsList.image) deleteFile(deletedPaintingsList.image);
    if (!deletedPaintingsList) return next(setError(404, 'PaintingsList not found'));
    return res.status(200).json({
      message: 'Delete PaintingsList',
      deletedPaintingsList
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed deleted paintingsList'));
  }
}

module.exports = { 
    getAllPaintingsList, 
    getPaintingsListById, 
    createPaintingsList, 
    updatePaintingsList, 
    removePaintingsList };