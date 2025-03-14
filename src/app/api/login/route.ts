// app/api/login/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(request: Request) {
  try {
    // Получаем данные из тела запроса
    const { login, password } = await request.json();

    if (!login || !password) {
      return NextResponse.json(
        { error: 'Login and password are required' },
        { status: 400 }
      );
    }

    console.log(`Login: ${login}\nPassword: ${password}`);

    const filePath = path.join(process.cwd(), 'public', 'data.json');

    let data = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      data = JSON.parse(fileContent);
    } catch (error) {
      console.log('File does not exist yet, creating a new one.');
    }

    data.push({ login, password });

    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json(
      { message: 'Data saved successfully', data: { login, password } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}