// // // code of 2Database repo
// // import mongoose from 'mongoose';
// // import dotenv from 'dotenv';
// // // mongoose.set('bufferCommands', false); // ADD THIS LINE

// // dotenv.config();

// // const connectDB = async () => {
// //   try {
// //     const conn1 = await mongoose.createConnection(process.env.MONGO_URI, { ///lab
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //       useFindAndModify: false // Add this line
// //     });

// //     const conn2 = await mongoose.createConnection(process.env.MONGO_URI2, { ///pwa
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //       useFindAndModify: false // Add this line

// //     });

// //     console.log(`MONGODB CONNECTED1: UsersDB - ${conn1.client.s.url}, \n \n MONGODB CONNECTED2: BookingsDB - ${conn2.client.s.url}`);

// //     return { conn1, conn2 };
// //   } catch (error) {
// //     console.error(`Error: ${error.message}`);
// //     process.exit(1);
// //   }
// // };

// // export default connectDB;



// ////add Pharcay Database
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// const connectDB = async () => {
//   try {
//     const conn1 = await mongoose.createConnection(process.env.MONGO_URI, { ///DRA
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//         bufferTimeoutMS: 20000 // try doubling it
//     });

//     const conn2 = await mongoose.createConnection(process.env.MONGO_URI2, {////PWA
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//         bufferTimeoutMS: 20000 // try doubling it
//     });

//     const conn3 = await mongoose.createConnection(process.env.MONGO_URI3, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//         bufferTimeoutMS: 20000 // try doubling it
//     });

//     console.log(
//       `MONGODB CONNECTED1: UsersDB - ${conn1.client.s.url},\n` +
//       `MONGODB CONNECTED2: BookingsDB - ${conn2.client.s.url},\n` +
//       `MONGODB CONNECTED3: PharmacyDB - ${conn3.client.s.url}`
//     );

//     return { conn1, conn2, conn3 };
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;



// 📁 backend/config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn1 = await mongoose.createConnection(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferTimeoutMS: 20000
    });

    const conn2 = await mongoose.createConnection(process.env.MONGO_URI2, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferTimeoutMS: 20000
    });

    const conn3 = await mongoose.createConnection(process.env.MONGO_URI3, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferTimeoutMS: 20000
    });

    console.log(
      `✅ MONGODB CONNECTED1: DRA - ${conn1.client.s.url}\n` +
      `✅ MONGODB CONNECTED2: PWA/Bookings - ${conn2.client.s.url}\n` +
      `✅ MONGODB CONNECTED3: Pharmacy - ${conn3.client.s.url}`
    );

    return { conn1, conn2, conn3 };
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
