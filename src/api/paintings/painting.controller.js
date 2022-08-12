const Painting = require("./painting.model");
const { setError } = require("../../helpers/utils/error");
const { deleteFile } = require("../../middleware/delete-file");

const getAllPaintings = async (req, res, next) => {
  try {
    const paintings = await Painting.find()//.sort({ createAt: 'desc' });
    return res.status(200).json({
      message: 'All Paintings',
      paintings
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed recover all paintings'));
  }
}

const getPaintingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const painting = await (await Painting.findById(id));
    if (!painting) return next(setError(404, error.message | 'Painting not found'));
    return res.status(200).json({
      message: 'Painting by Id',
      painting
    })

  } catch (error) {
    return next(setError(500, error.message | 'Failed painting id'));
  }
}

const createPainting = async (req, res, next) => {
  try {
    const painting = new Painting(req.body);
    // Recogemos el path -> url de cloudinary - cover
    if (req.file) painting.image = req.file.path;
    const paintingInDb = await painting.save();

    return res.status(201).json({
      message: 'Created new Painting',
      paintingInDb
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed create painting'));
  }
}

const updatePainting= async (req, res, next) => {
  try {
    const { id } = req.params;
    const painting = new Painting(req.body);
    painting._id = id;
    // Si pasamos un nuevo cover -> se añade sobre su porpiedad
    const updatedPainting = await Painting.findByIdAndUpdate(id, painting);
    if (req.file) painting.image = req.file.path;
    if (!updatedPainting) return next(setError(404, 'Painting not found'));
    return res.status(201).json({
      message: 'Updated Painting',
      updatedPainting
    })

  } catch (error) {
    return next(setError(500, error.message | 'Failed updated painting'));
  }
}

const removePainting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPainting = await Painting.findByIdAndDelete(id);
    if (deletedPainting.image) deleteFile(deletedPainting.image);
    if (!deletedPainting) return next(setError(404, 'Painting not found'));
    return res.status(200).json({
      message: 'Delete Painting',
      deletedPainting
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed deleted painting'));
  }
}

module.exports = { 
    getAllPaintings, 
    getPaintingById, 
    createPainting, 
    updatePainting, 
    removePainting };