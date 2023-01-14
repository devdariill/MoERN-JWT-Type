import mongoose from 'mongoose'

export async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/reactdb")
        console.log("DB is connected")
    } catch (error) {
        console.error(error)
    }
}