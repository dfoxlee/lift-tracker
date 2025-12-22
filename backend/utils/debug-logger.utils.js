export const debugLogger = (message, data = null) => {
   const stack = new Error().stack;
   const date = new Date().toLocaleDateString();
   const time = new Date().toLocaleTimeString();
   const location = stack.split("\n")[2].trim().replace(/^at /, "").split(" ")[0];

   console.log("=".repeat(80) + "\n");

   console.log(
      `[DEBUG LOGGER] Location: ${location} | Timestamp: ${date} ${time}`
   );
   console.log(`Message: ${message}`);

   if (data !== null && data !== undefined) {
      console.log(`Data:`);
      if (typeof data === "object") {
         console.log(JSON.stringify(data, null, 2));
      } else {
         console.log(data);
      }
   }

   console.log("=".repeat(80) + "\n");
};
