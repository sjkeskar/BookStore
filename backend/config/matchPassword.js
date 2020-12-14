import bcrypt from "bcryptjs";

const matchPassword = async (entered, dbpass) =>{
    return await bcrypt.compare(entered, dbpass)
}

export default matchPassword;