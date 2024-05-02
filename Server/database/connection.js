const mongoose=require('mongoose');
// const DB='mongodb+srv://Adeel:pJXBb0HgPZX6mzmP@cluster0.nmzd3rg.mongodb.net/?retryWrites=true&w=majority&ssl=true';
const DB = "mongodb://Adeel:pJXBb0HgPZX6mzmP@ac-n44mdvt-shard-00-00.nmzd3rg.mongodb.net:27017,ac-n44mdvt-shard-00-01.nmzd3rg.mongodb.net:27017,ac-n44mdvt-shard-00-02.nmzd3rg.mongodb.net:27017/?ssl=true&replicaSet=atlas-xbsg9g-shard-0&authSource=admin&retryWrites=true&w=majority"
async function connectToDatabase() {
    try {
      await mongoose.connect(DB, {
        useNewUrlParser: true,
      
        useUnifiedTopology: true
       
      });
      console.log("Successfully connected to MongoDB!");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
    }
  }
  
connectToDatabase();
module.exports=connectToDatabase



