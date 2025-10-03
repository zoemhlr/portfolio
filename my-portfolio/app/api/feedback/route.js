import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'feedbacks.json');

export async function GET() {
  let feedbacks = [];
  if (fs.existsSync(filePath)) {
    feedbacks = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  const ratings = feedbacks.map(f => f.rating || 0);
  const average = ratings.length ? ratings.reduce((a,b) => a+b, 0)/ratings.length : 0;
  return new Response(JSON.stringify({ averageRating: average }), { status: 200 });
}

export async function POST(req) {
  try {
    const data = await req.json();
    let feedbacks = [];
    if (fs.existsSync(filePath)) {
      feedbacks = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    feedbacks.push({ ...data, date: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(feedbacks, null, 2));

    const ratings = feedbacks.map(f => f.rating || 0);
    const average = ratings.length ? ratings.reduce((a,b) => a+b, 0)/ratings.length : 0;

    return new Response(JSON.stringify({ message: 'Feedback saved', averageRating: average }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Error saving feedback' }), { status: 500 });
  }
}
