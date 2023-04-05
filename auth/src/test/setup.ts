import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';


let mongo: any

beforeAll(async () => {
    process.env.JWT_KEY = 'asdfg'
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    mongoose.set('strictQuery',true)
    await mongoose.connect(uri);
});


beforeEach(async ()=>{
    const collections = await mongoose.connection.db.collections();

    collections.forEach(async c => {
        await c.deleteMany({});
    });
});


afterAll(async () =>{
    await mongo.stop()
    await mongoose.connection.close()
} )