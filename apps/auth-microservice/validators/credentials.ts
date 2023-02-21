import zod from "zod";

export default zod.object({
  email: zod.string().email().min(5).max(255),
  password: zod.string().min(8).max(32),
});
