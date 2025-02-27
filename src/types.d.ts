// types.d.ts
declare global {
    namespace Express {
      interface Request {
        user?: any; // You can replace `any` with a more specific type for the user
      }
    }
  }
  
  // This is necessary to make the file a module.
  export {};
  