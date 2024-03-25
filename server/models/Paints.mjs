import db from "../config/db.mjs";

class Paints {
    constructor(paint_id, colour_id, paint_quantity) {
        this.paint_id = paint_id;
        this.colour_id = colour_id;
        this.paint_quantity = paint_quantity;
    }
    
    save() {
        // let d = new Date();
        // let yyyy = d.getFullYear();
        // let mm = d.getMonth() + 1;
        // let dd = d.getDate();

        // let createdAtDate = `${yyyy}-${mm}-${dd}`

        let sql = `
        INSERT INTO paints(
            paint_id,
            colour_id,
            paint_quantity,
        )
        VALUES(
            "${this.paint_id}",
            "${this.colour_id}",
            "${this.paint_quantity}",
        )
        `;

        return db.execute(sql);
    }

    static findAllPaints() {
        let sql = `
        SELECT p.*, pc.paint_colour
        FROM paints p
        INNER JOIN paint_colours pc ON p.colour_id = pc.paint_colour_id;
    `;
    return db.execute(sql);
    }

    // static findPaintById(id){
    //     let sql = `SELECT * FROM users WHERE paint_id = ${id};`;
    //     return db.execute(sql);
    // }

}

export default Paints;
