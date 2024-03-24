import db from "../config/db.mjs";
import bcrypt from "bcrypt"

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

    static async checkAuth(email, password){
        let sql = `SELECT * FROM users WHERE email = '${email}';`;
        const [users, _] = await db.execute(sql);
        
        if (users.length === 0) {
            return false; // User not found
        }

        const user = users[0];
        const isValid = await bcrypt.compare(password, user.user_pw);
        return isValid ? user : false;
    }
}

export default Users;
