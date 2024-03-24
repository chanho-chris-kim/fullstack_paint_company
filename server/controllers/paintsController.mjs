import Paints from "../models/Paints.mjs";

//@desc Get all paints
//@route GET /api/paints
//@access public
const getPaints = async (req, res, next) => {
  try {
    const [paints, _] = await Paints.findAllPaints();
    res.status(200).json({ count: paints.length, paints });
  } catch (err) {
    next(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};

export { getPaints };
