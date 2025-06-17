import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";

async function main() {
  const [, , email, password, name, age] = process.argv;
  if (!email || !password || !name) {
    console.error(
      "Usage: ts-node --esm scripts/createUser.ts <email> <password> <name> [age]"
    );
    process.exit(1);
  }

  await dbConnect();

  const existing = await User.findOne({ email });
  if (existing) {
    console.error("User already exists");
    process.exit(1);
  }

  const user = await User.create({
    email,
    password,
    name,
    age: age ? Number(age) : undefined,
  });

  console.log(`Created user with id ${user._id}`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed to create user", err);
  process.exit(1);
});
