Here's a comprehensive README.md for your Sanaa Thru My Lens project:

````markdown
# Sanaa Thru My Lens

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black)](https://nextjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)](https://mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A modern, full-featured blog platform celebrating Kenya's creative ecosystem - architecture, design, urbanism, and creative culture.

## 🌟 Features

### 📝 Content Management

- **Blog Posts** - Rich article content with SEO optimization
- **Categories & Tags** - Organized content taxonomy
- **Author Profiles** - Detailed author bios with credentials
- **Events Calendar** - Manage and promote creative events

### 👥 User Engagement

- **Authentication** - Email/Password + Google OAuth
- **Comments** - Threaded discussions with moderation
- **Likes & Bookmarks** - Save and favorite content
- **Follow Authors** - Stay updated with favorite creators
- **Content Reporting** - Community moderation tools

### 🎨 Design & UX

- **Responsive Layout** - Mobile-first design
- **Dark/Light Mode** - Theme toggle (optional)
- **Rich Text Editor** - Full article formatting
- **Image Optimization** - Next.js Image component

### 🔍 SEO & Discovery

- **Dynamic Sitemap** - Auto-updating XML sitemap
- **RSS Feed** - Content syndication
- **Meta Tags** - OpenGraph, Twitter Cards, JSON-LD
- **Breadcrumbs** - Improved navigation structure
- **Canonical URLs** - SEO best practices

### 💰 Monetization

- **Google AdSense** - Strategic ad placements
- **Cookie Consent** - GDPR compliant banner
- **Affiliate Links** - Ready for integration

### 🔒 Security

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt encryption
- **Rate Limiting** - Protect against abuse
- **XSS Protection** - Content sanitization
- **CSRF Protection** - Form security

### 📊 Analytics

- **Page Views** - Track article popularity
- **Search Analytics** - Monitor user queries
- **User Activity** - Engagement metrics
- **Custom Events** - Track conversions

## 🚀 Tech Stack

| Category           | Technology                 |
| ------------------ | -------------------------- |
| **Framework**      | Next.js 16 (App Router)    |
| **Language**       | JavaScript (No TypeScript) |
| **Database**       | MySQL 8.0                  |
| **Authentication** | JWT, Google OAuth 2.0      |
| **Styling**        | Tailwind CSS               |
| **Email**          | Nodemailer (SMTP)          |
| **Deployment**     | Vercel / Self-hosted       |

## 📋 Prerequisites

- Node.js 18+
- MySQL 8.0+
- NPM or Yarn
- Google OAuth credentials (optional)
- SMTP email account (for email features)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/sanaa-thru-my-lens.git
cd sanaa-thru-my-lens
```
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Database

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE jobready_blog_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Import schema
mysql -u root -p jobready_blog_db < database/schema.sql

# Import seed data (optional)
mysql -u root -p jobready_blog_db < database/seed.sql
```

### 4. Configure Environment Variables

Copy `.env.example` to `.env.local` and update values:

```env
# Database
DB_HOST=localhost
DB_NAME=jobready_blog_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_PORT=3306

# Security
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRES_IN=7d

# App
APP_NAME=Sanaa Thru My Lens
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
SMTP_FROM_NAME=Sanaa Thru My Lens

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

## 📁 Project Structure

```
sanaa-thru-my-lens/
├── src/
│   ├── app/
│   │   ├── (website)/           # Public pages with header/footer
│   │   │   ├── page.js          # Homepage
│   │   │   ├── blogs/           # Blog listing & detail
│   │   │   ├── events/          # Events pages
│   │   │   ├── categories/      # Category pages
│   │   │   ├── tags/            # Tag pages
│   │   │   ├── authors/         # Author profiles
│   │   │   ├── about/           # About page
│   │   │   ├── contacts/        # Contact page
│   │   │   └── search/          # Search page
│   │   ├── (authentication)/    # Auth pages (no header/footer)
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── reset-password/
│   │   ├── api/                 # API routes
│   │   │   ├── auth/            # Authentication endpoints
│   │   │   ├── blogs/           # Blog CRUD
│   │   │   ├── comments/        # Comments API
│   │   │   ├── likes/           # Likes API
│   │   │   ├── bookmarks/       # Bookmarks API
│   │   │   ├── follow/          # Author follow API
│   │   │   ├── reports/         # Content reporting
│   │   │   ├── newsletter/      # Newsletter subscription
│   │   │   ├── contact/         # Contact form
│   │   │   └── search/          # Search API
│   │   ├── sitemap.xml/         # Dynamic sitemap
│   │   ├── feed.xml/            # RSS feed
│   │   ├── robots.txt/          # Robots.txt
│   │   └── layout.js            # Root layout
│   ├── components/
│   │   ├── layout/              # Header, Footer
│   │   ├── home/                # Homepage components
│   │   ├── widgets/             # Sidebar widgets
│   │   ├── interactive/         # Interactive components
│   │   ├── auth/                # Authentication components
│   │   ├── providers/           # Context providers
│   │   └── ui/                  # Reusable UI components
│   └── lib/
│       ├── db.js                # Database connection
│       ├── auth.js              # Auth utilities (Node.js)
│       ├── auth-edge.js         # Auth utilities (Edge)
│       └── queries.js           # Database queries
├── database/
│   ├── schema.sql               # Database schema
│   └── seed.sql                 # Seed data
├── public/                      # Static assets
├── .env.local                   # Environment variables
├── middleware.js                # Next.js middleware
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind config
└── package.json                 # Dependencies
```

## 🔧 API Endpoints

### Authentication

| Endpoint                   | Method   | Description          |
| -------------------------- | -------- | -------------------- |
| `/api/auth/login`          | POST     | Email/password login |
| `/api/auth/signup`         | POST     | User registration    |
| `/api/auth/logout`         | POST     | Logout               |
| `/api/auth/me`             | GET      | Current user         |
| `/api/auth/reset-password` | POST/PUT | Password reset       |
| `/api/auth/google`         | GET/POST | Google OAuth         |

### Content

| Endpoint            | Method          | Description     |
| ------------------- | --------------- | --------------- |
| `/api/blogs`        | GET             | List blogs      |
| `/api/blogs/[slug]` | GET             | Single blog     |
| `/api/comments`     | GET/POST        | Comments        |
| `/api/likes`        | GET/POST/DELETE | Likes           |
| `/api/bookmarks`    | GET/POST/DELETE | Bookmarks       |
| `/api/follow`       | GET/POST/DELETE | Follow authors  |
| `/api/reports`      | POST            | Report content  |
| `/api/search`       | GET             | Search articles |
| `/api/newsletter`   | POST            | Subscribe       |
| `/api/contact`      | POST            | Contact form    |

## 🎯 Environment Variables Reference

| Variable               | Required | Description                       |
| ---------------------- | -------- | --------------------------------- |
| `DB_HOST`              | ✅       | MySQL host                        |
| `DB_NAME`              | ✅       | Database name                     |
| `DB_USER`              | ✅       | Database user                     |
| `DB_PASSWORD`          | ✅       | Database password                 |
| `JWT_SECRET`           | ✅       | JWT signing secret (min 32 chars) |
| `NEXT_PUBLIC_APP_URL`  | ✅       | Application URL                   |
| `SMTP_HOST`            | ❌       | Email server host                 |
| `SMTP_USER`            | ❌       | Email username                    |
| `SMTP_PASSWORD`        | ❌       | Email password                    |
| `GOOGLE_CLIENT_ID`     | ❌       | Google OAuth client ID            |
| `GOOGLE_CLIENT_SECRET` | ❌       | Google OAuth client secret        |

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Deploy to Self-hosted Server

```bash
# Build
npm run build

# Start production server
npm run start
```

## 📊 Database Schema

The database includes 30+ tables covering:

- **Users** - Public and admin users
- **Content** - Blogs, revisions, collaborations
- **Taxonomy** - Categories, tags, collections
- **Comments** - Threaded discussions
- **Engagement** - Likes, bookmarks, follows
- **Author Profiles** - Bio, education, experience, specialties
- **Events** - Calendar and RSVP
- **Analytics** - Page views, search logs
- **Newsletter** - Subscriber management
- **Compliance** - GDPR/CCPA tables
- **Moderation** - Content reports
- **Authentication** - Sessions, password resets

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for utility-first styling
- MySQL for reliable database
- The Kenyan creative community for inspiration

## 📧 Contact

- Website: [sanaathrumylens.co.ke](https://sanaathrumylens.co.ke)
- Email: hello@sanaathrumylens.co.ke
- Twitter: [@sanaathrumylens](https://twitter.com/sanaathrumylens)
- Instagram: [@sanaathrumylens](https://instagram.com/sanaathrumylens)

---

## 🔍 Troubleshooting

### Common Issues

**"The edge runtime does not support Node.js 'stream' module"**

- Add `export const runtime = 'nodejs'` to API routes
- Ensure middleware doesn't import Node.js modules
- Use `auth-edge.js` for middleware auth

**Database connection failed**

- Verify credentials in `.env.local`
- Check MySQL service is running
- Confirm database exists

**Google OAuth not working**

- Verify redirect URI matches exactly
- Ensure client ID and secret are correct
- Check OAuth consent screen is configured

**Email sending fails**

- Verify SMTP credentials
- Check if port 587 is open
- Use app password for Gmail

---

**Built with ❤️ for Kenya's creative community**

```

This README provides comprehensive documentation covering:
- Project overview and features
- Tech stack details
- Installation and setup instructions
- Project structure
- API endpoints
- Environment variables
- Deployment guides
- Troubleshooting tips
- Contributing guidelines

You can customize the contact information, repository URLs, and any other project-specific details as needed! 🚀
```
