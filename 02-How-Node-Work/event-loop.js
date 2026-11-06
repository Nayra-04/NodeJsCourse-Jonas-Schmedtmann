import fs from "fs";
import crypto from "crypto";

const start = Date.now();
// Controlling no., of threads in the thread pool (default is 4)
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished"); // 1st
  console.log("--------------");

  setTimeout(() => console.log("Timer 2 finished"), 0); // 4th
  setTimeout(() => console.log("Timer 3 finished"), 3000); // 5th
  setImmediate(() => console.log("Immediate 2 finished")); // 3rd
  process.nextTick(() => console.log("Process.nextTick")); // 2nd

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  ////// Event loop works only for asynchronous code
  // crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  // console.log(Date.now() - start, "Password encrypted");

  // crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  // console.log(Date.now() - start, "Password encrypted");

  // crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  // console.log(Date.now() - start, "Password encrypted");

  // crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  // console.log(Date.now() - start, "Password encrypted");
});

console.log("Hello from the top-level code!");
