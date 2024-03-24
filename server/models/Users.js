const db = require ("../config/db");

class Users {
    constructor(user_pw, name, email, address, phone, role_id) {
        this.user_pw = user_pw;
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.role_id = role_id;
    }

    save() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();

        let createdAtDate = `${yyyy}-${mm}-${dd}`

        let sql = `
        INSERT INTO users(
            user_pw,
            name,
            email,
            address,
            phone,
            role_id,
            created_at
        )
        VALUES(
            "${this.user_pw}",
            "${this.name}",
            "${this.email}",
            "${this.address}",
            "${this.phone}",
            "${this.role_id}",
            "${createdAtDate}"
        )
        `;

        return db.execute(sql);
    }

    static findAll() {
        let sql = "SELECT * FROM users;";
        return db.execute(sql);
    }

    static findById(id){
        let sql = `SELECT * FROM users WHERE user_id = ${id};`;
        return db.execute(sql);
    }
}

module.exports = Users