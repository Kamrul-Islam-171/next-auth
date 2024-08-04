import { connectDB } from "@/lib/connectDB";
import bcrypt from 'bcrypt'

export const POST = async (request) => {

    const newUser = await request.json();
    try {
        const db = await connectDB();
        const password = newUser.password;
        const hashPassword = await bcrypt.hash(password, 14);
        // newUser.password = hashPassword;
        const userCollection = db.collection('users');
        const exist = await userCollection.findOne({ email: newUser.email });
    
        if (exist) {
            // console.log("user exists..")
            return Response.json({ message: "user exists...." }, { status: 302 });
            
        }
        const res = await userCollection.insertOne({...newUser, password : hashPassword});
        return Response.json({ message: "User Added" }, { status: 200 })
    } catch (error) {
        // console.log("my error = ", error.message)
        return Response.json({ message: "Something went wrong..." }, { status: 500 })
    }
}