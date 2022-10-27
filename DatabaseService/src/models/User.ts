import {Schema, model} from "mongoose";

// Model of the User "Table"
const UserSchema = new Schema({
    username: String,
    password: String,
});

const User = model('User', UserSchema);
export default User;