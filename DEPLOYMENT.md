# CTRL Studio CRM - Deployment Guide

## Prerequisites

- Vercel account (or your hosting provider)
- PostgreSQL database (Vercel PostgreSQL, AWS RDS, or self-hosted)
- SMTP email service (Gmail, SendGrid, AWS SES, etc.)
- GitHub account (for deployment)

## Step 1: Database Setup

### Using Vercel PostgreSQL (Recommended)

1. Go to your Vercel project settings
2. Navigate to the "Storage" tab
3. Click "Create Database" → "PostgreSQL"
4. Copy the `DATABASE_URL` from the connection details
5. Add it to your environment variables in the next step

### Using AWS RDS or Other Provider

1. Create a PostgreSQL database
2. Note the connection string format: `postgresql://user:password@host:port/database`
3. Add it to environment variables in the next step

## Step 2: Vercel Deployment

### Initial Deployment

1. Push your code to GitHub
```bash
git push origin main
```

2. Import your GitHub repository to Vercel:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Click "Continue"

### Configuration in Vercel

1. In "Project Settings", go to "Environment Variables"
2. Add all required environment variables:

```
DATABASE_URL=postgresql://user:password@host:port/database
NEXTAUTH_SECRET=<generate-with: openssl rand -base64 32>
NEXTAUTH_URL=https://your-domain.vercel.app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

3. For **NEXTAUTH_SECRET**: Generate locally and add:
```bash
openssl rand -base64 32
```

4. For **EMAIL_PASSWORD**: Use app-specific password (not Gmail account password)
   - Enable 2FA on Gmail account
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Generate app password for "Mail"
   - Copy and paste here

5. Click "Deploy"

### Post-Deployment

1. After deployment completes, run database migrations:
```bash
npm install -g vercel
vercel env pull
npx prisma migrate deploy
```

Or via Vercel CLI:
```bash
vercel run "npx prisma migrate deploy"
```

2. Create admin user with seed script:
```bash
npx ts-node prisma/seed.ts
```

## Step 3: Initialize Admin User

Run the seed script to create your first admin user:

### Local Development
```bash
npm install -D ts-node
npx ts-node prisma/seed.ts
```

### Production (via Vercel)
```bash
vercel run "npx ts-node prisma/seed.ts"
```

Default admin credentials will be output. Change password immediately after first login.

## Step 4: Configure Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Update DNS records according to Vercel instructions
4. Update `NEXTAUTH_URL` in environment variables:
   - Change from `https://your-project.vercel.app` to `https://your-domain.com`
5. Redeploy

## Email Configuration

### Gmail Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Generate App Password:
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer" (or your device)
   - Copy the generated 16-character password
3. Use this password in `EMAIL_PASSWORD` environment variable

### SendGrid Setup
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create API key
3. Set environment variables:
   ```
   EMAIL_HOST=smtp.sendgrid.net
   EMAIL_PORT=587
   EMAIL_USER=apikey
   EMAIL_PASSWORD=<your-sendgrid-api-key>
   ```

### AWS SES Setup
1. Verify email address in AWS SES console
2. Create SMTP credentials
3. Set environment variables with provided credentials
4. Request production access if needed

## Monitoring & Maintenance

### Check Logs
- Vercel Dashboard: Project → "Deployments" → "Logs"
- Database: Check PostgreSQL provider's monitoring tools
- Email: Monitor SendGrid/Gmail for delivery issues

### Backup Database
- Vercel PostgreSQL: Automatic daily backups included
- AWS RDS: Configure backup retention in AWS console
- Self-hosted: Set up pg_dump cron job

### Scale Application
- Vercel: Auto-scales serverless functions
- Database: Upgrade connection pool limits if needed
- Email: Monitor rate limits with your provider

## Troubleshooting

### Database Connection Error
- Verify `DATABASE_URL` is correct
- Check PostgreSQL whitelist allows Vercel IPs
- Test locally: `npx prisma db execute --stdin < test.sql`

### NextAuth Issues
- Ensure `NEXTAUTH_URL` matches deployment URL
- Verify `NEXTAUTH_SECRET` is set in environment
- Check session storage configuration

### Email Not Sending
- Verify credentials are correct
- Check email provider's sending limits
- Review email logs in database (`EmailLog` table)
- Test manually: Create brief and send from admin panel

### Build Fails on Deploy
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure `package.json` dependencies are up to date
- Run `npm run build` locally to reproduce

## Security Checklist

- [ ] Change default admin password
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set `NEXTAUTH_SECRET` (never commit to git)
- [ ] Use app-specific passwords for email
- [ ] Enable database backups
- [ ] Configure database firewall rules
- [ ] Review environment variables (no hardcoded secrets)
- [ ] Test admin-only endpoints are protected
- [ ] Verify client data isolation in API

## Performance Optimization

### Image Optimization
- Use Next.js Image component for all images
- Consider CDN for static assets

### Database Optimization
- Add indexes to frequently queried fields
- Monitor slow queries with PostgreSQL logs
- Consider caching with Redis if needed

### API Performance
- Monitor response times in Vercel Analytics
- Implement pagination for large result sets
- Use ISR (Incremental Static Regeneration) where applicable

## Rollback Procedure

If deployment breaks:

1. Go to Vercel Dashboard
2. Select your project
3. Go to "Deployments"
4. Find the last working deployment
5. Click "..." menu → "Promote to Production"

Your application will revert to the previous version.

## Getting Help

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- Prisma Docs: [prisma.io/docs](https://prisma.io/docs)
- NextAuth.js Docs: [next-auth.js.org](https://next-auth.js.org)
