const bcrypt = require("bcrypt-nodejs")

//Syncronas------>>>
// let pass = "ashok";

// var hash = bcrypt.hashSync(pass);

// const bc1 = bcrypt.compareSync(pass, hash); // true
// const bc2 = bcrypt.compareSync("ashok",hash); // true
// const bc3 = bcrypt.compareSync(pass,  "$2a$10$MQFYj0NhLR7XaK8BbU703.enXkCzY49Keg76ZJ2/bmhL4qJp1dZ.."); // true
// const bc4 = bcrypt.compareSync("veggies", hash); // false

// console.log("hash -> ",hash);
// console.log("bacon 1 ",bc1);
// console.log("bacon 2 ",bc2);
// console.log("bacon 3 ",bc3);
// console.log("veggies",bc4);


//Asyncrones======>>>>>
// async function acrypt(){

//     let hashdata;

// await bcrypt.hash("bacon", null, null, function(err, hash) {
//     hashdata = hash;
//     console.log("this hash is ->",hash);
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hashdata, function(err, res) {
//     console.log("bacon guess->",res);
// });
// // bcrypt.compare("veggies", hash, function(err, res) {
// //     // res = false
// // });

// }

// acrypt();