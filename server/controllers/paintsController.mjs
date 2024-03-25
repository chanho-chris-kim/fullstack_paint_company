import Paints from "../models/Paints.mjs";

//@desc Get all paints
//@route GET /api/paints
//@access public
const getPaints = async (req, res, next) => {
  try {
    const [paints, _] = await Paints.findAllPaints();
    // Categorize paints based on quantity
    // a being Available (greater than 50)
    // b being Running low (1 to 50)
    // c being out of stock (0)
    const categorizedPaints = { a: [], b: [], c: [] };

    paints.forEach(paint => {
      if (paint.paint_quantity > 50) {
        categorizedPaints.a.push(paint);
      } else if (paint.paint_quantity > 0) {
        categorizedPaints.b.push(paint);
      } else {
        categorizedPaints.c.push(paint);
      }
    });
    res.status(200).json({ count: paints.length, categorizedPaints });
  } catch (err) {
    next(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};

export { getPaints };
