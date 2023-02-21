import { string } from "zod";

export default string()
  .startsWith("Bearer ")
  .regex(/Bearer [a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_=]+\.?[a-zA-Z0-9-_.+/=]*/);
