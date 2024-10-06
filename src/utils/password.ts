import bcrypt from 'bcryptjs';
export async function saltAndHashPassword(password: string, salt: string) {
  const hashedPassword: string = bcrypt.hashSync(password, salt);
  return String(hashedPassword);
}
