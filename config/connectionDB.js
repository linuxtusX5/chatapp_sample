import mongoose from "mongoose";

const connectionDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connection to MongoDB ${process.env.SC}`);
    } catch (error) {
        console.log(`mongoDb connection Error ${error}`)
    }
} 
export default connectionDb;