import mongoose  from "mongoose";

const connectDB=async()=>{
try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`,
        { useNewUrlParser: true }
    )
    console.log( connectionInstance.Connection.host)

} catch (error) {
    console.log("Error in connecting Database")
    process.exit(1)
}
}

export default connectDB