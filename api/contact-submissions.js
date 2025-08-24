// Vercel API function for contact submissions endpoint
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // For now, return empty array since we don't have persistent storage in Vercel functions
    // In a real implementation, you'd connect to a database here
    const submissions = [];
    
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Contact Submissions API Error:', error);
    res.status(500).json({ message: "Failed to fetch contact submissions" });
  }
}