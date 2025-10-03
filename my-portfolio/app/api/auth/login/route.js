import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Dykehqb9@',
  database: 'portfolio',
};

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [users] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    await connection.end();

    if (users.length === 0) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 400 });
    }

    const user = users[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) return new Response(JSON.stringify({ message: 'Invalid password' }), { status: 400 });

    return new Response(
      JSON.stringify({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}
