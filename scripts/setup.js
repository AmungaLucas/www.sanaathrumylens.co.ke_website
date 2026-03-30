// setup.js
const fs = require('fs');
const path = require('path');

const createFile = (filePath, content = '') => {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
    }
};

// ---------- BOILERPLATES ----------

// Layout
const layout = `
export const metadata = {
  title: "JobReady Kenya",
  description: "Jobs, opportunities and insights",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;

// Simple Page
const page = (name) => `
export default function Page() {
  return <div>${name}</div>;
}
`;

// Loading
const loading = `
export default function Loading() {
  return <p>Loading...</p>;
}
`;

// Error
const error = `
'use client';

export default function Error({ error }) {
  return <p>Something went wrong</p>;
}
`;

// Not Found
const notFound = `
export default function NotFound() {
  return <h1>Not Found</h1>;
}
`;

// API Route
const apiRoute = `
export async function GET() {
  return Response.json({ success: true });
}
`;

// Search API
const searchApi = `
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  return Response.json({ query: q });
}
`;

// Auth API
const authApi = (type) => `
export async function POST(req) {
  const body = await req.json();

  return Response.json({
    message: "${type} successful",
    data: body,
  });
}
`;

// robots.txt
const robots = `
User-agent: *
Allow: /

Sitemap: https://jobready.co.ke/sitemap.xml
`;

// sitemap
const sitemap = `
export async function GET() {
  const xml = \`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://jobready.co.ke</loc></url>
  </urlset>\`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
`;

// feed
const feed = `
export async function GET() {
  return new Response("<rss></rss>", {
    headers: { 'Content-Type': 'application/xml' },
  });
}
`;

// ---------- CREATE FILES ----------

// Core
createFile("src/app/layout.js", layout);
createFile("src/app/not-found.js", notFound);

// Homepage
createFile("src/app/(homepage)/page.js", page("Homepage"));

// SEO
createFile("src/app/sitemap.xml/route.js", sitemap);
createFile("src/app/feed.xml/route.js", feed);
createFile("src/app/robots.txt/route.js", `export async function GET(){return new Response(\`${robots}\`)}`);

// Auth UI
createFile("src/app/(authentication)/layout.js", layout);
createFile("src/app/(authentication)/login/page.js", page("Login Page"));
createFile("src/app/(authentication)/signup/page.js", page("Signup Page"));
createFile("src/app/(authentication)/reset-password/page.js", page("Reset Password"));

// Static pages
createFile("src/app/about/page.js", page("About"));
createFile("src/app/contacts/page.js", page("Contacts"));
createFile("src/app/search/page.js", page("Search"));

// Blogs
createFile("src/app/blogs/page.js", page("Blogs"));
createFile("src/app/blogs/loading.js", loading);
createFile("src/app/blogs/error.js", error);
createFile("src/app/blogs/[slug]/page.js", page("Blog Details"));
createFile("src/app/blogs/[slug]/loading.js", loading);
createFile("src/app/blogs/[slug]/error.js", error);
createFile("src/app/blogs/[slug]/not-found.js", notFound);

// Events
createFile("src/app/events/page.js", page("Events"));
createFile("src/app/events/error.js", error);
createFile("src/app/events/[slug]/page.js", page("Event Details"));

// Categories
createFile("src/app/categories/page.js", page("Categories"));
createFile("src/app/categories/[slug]/page.js", page("Category Details"));

// Tags
createFile("src/app/tags/page.js", page("Tags"));
createFile("src/app/tags/[slug]/page.js", page("Tag Details"));

// Authors
createFile("src/app/authors/page.js", page("Authors"));
createFile("src/app/authors/[slug]/page.js", page("Author Details"));

// API
createFile("src/app/api/blogs/route.js", apiRoute);
createFile("src/app/api/blogs/[slug]/route.js", apiRoute);
createFile("src/app/api/events/route.js", apiRoute);
createFile("src/app/api/events/[slug]/route.js", apiRoute);
createFile("src/app/api/categories/route.js", apiRoute);
createFile("src/app/api/categories/[slug]/route.js", apiRoute);
createFile("src/app/api/tags/route.js", apiRoute);
createFile("src/app/api/tags/[slug]/route.js", apiRoute);
createFile("src/app/api/search/route.js", searchApi);
createFile("src/app/api/auth/login/route.js", authApi("Login"));
createFile("src/app/api/auth/signup/route.js", authApi("Signup"));
createFile("src/app/api/auth/reset-password/route.js", authApi("Password reset"));

console.log("✅ FULL STRUCTURE WITH BOILERPLATE CREATED");


// To run this script, use: node scripts/setup.js