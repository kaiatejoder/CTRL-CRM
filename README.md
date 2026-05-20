# CTRL Studio CRM

A modern Next.js-based CRM platform for design and development studios. Features sendable briefs to clients, real-time notifications, email integration, client portal, and admin project tracker.

## Tech Stack

- **Framework:** Next.js 15+ with TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js (CredentialsProvider)
- **Email:** Nodemailer
- **Validation:** Zod

## Features

### Client Portal
- View assigned briefs with filters (status, type)
- Submit brief responses
- Track project progress
- Real-time notifications
- View completed work

### Admin Dashboard
- Client management (create, view, edit)
- Project tracking and assignment
- Brief creation and distribution
- Response monitoring
- Email integration for brief delivery
- Dashboard statistics (clients, projects, briefs, responses)

### Email Integration
- Automated brief delivery via email
- Email logging and tracking
- Nodemailer configuration for SMTP servers

### Notifications
- Real-time in-app notifications
- Mark as read/unread
- Filter by read status

## Getting Started

### Prerequisites

- Node.js 18+ with npm/yarn
- PostgreSQL database
- SMTP email service credentials

### Installation

1. Clone the repository
```bash
git clone <repo-url>
cd CTRLCRM
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env.local
```

4. Configure your database
```bash
npx prisma migrate dev --name init
```

5. Generate admin seed data (see Deployment section)

6. Run development server
```bash
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables

```
DATABASE_URL=postgresql://user:password@localhost:5432/ctrlcrm
NEXTAUTH_SECRET=<generate-with: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

## Project Structure

```
app/
├── (admin)/           # Admin dashboard (protected)
│   ├── admin/
│   │   ├── page.tsx              # Dashboard
│   │   ├── clients/page.tsx       # Client management
│   │   ├── projects/page.tsx      # Project management
│   │   └── briefs/page.tsx        # Brief management
│   └── layout.tsx
├── (client)/          # Client portal (protected)
│   ├── portal/
│   │   ├── page.tsx              # Portal home
│   │   ├── briefs/
│   │   │   ├── page.tsx          # Briefs list
│   │   │   └── [id]/page.tsx     # Brief detail
│   │   └── notifications/page.tsx # Notifications
│   └── layout.tsx
├── api/               # API routes
│   ├── auth/
│   ├── briefs/
│   ├── projects/
│   ├── email/
│   ├── notifications/
│   └── admin/
├── about/page.tsx     # About page
├── services/page.tsx  # Services page
├── page.tsx           # Homepage
└── layout.tsx

lib/
├── auth.ts            # NextAuth configuration
├── db.ts              # Prisma client
├── email.ts           # Email service
├── validators.ts      # Zod schemas
└── notifications.ts   # Notification helpers

prisma/
├── schema.prisma      # Database schema
└── migrations/        # Database migrations
```

## API Routes

### Authentication
- `POST /api/auth/callback/credentials` - Login

### Briefs
- `GET /api/briefs?limit=50` - Get briefs (clients filtered by ID, admins see all)
- `GET /api/briefs/[id]` - Get brief details
- `PATCH /api/briefs/[id]` - Update brief
- `POST /api/briefs/[id]/responses` - Submit brief response

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/clients` - List all clients
- `POST /api/admin/clients` - Create client
- `GET /api/admin/projects` - List projects
- `POST /api/admin/projects` - Create project
- `GET /api/admin/briefs` - List briefs
- `POST /api/admin/briefs` - Create brief

### Email
- `POST /api/email/send` - Send brief via email (admin only)

### Notifications
- `GET /api/notifications` - Get notifications
- `PATCH /api/notifications/[id]` - Mark as read

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## License

Proprietary - CTRL Studio
