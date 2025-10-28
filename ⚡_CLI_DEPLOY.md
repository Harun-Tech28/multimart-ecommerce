# ⚡ Deploy Using Vercel CLI (Fastest Method!)

You have Vercel CLI installed! This is the fastest way to deploy.

---

## 🚀 Quick CLI Deployment

### Step 1: Login to Vercel
```bash
vercel login
```
Follow the prompts to authenticate.

---

### Step 2: Deploy Backend

```bash
cd backend
vercel
```

**During setup, answer:**
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- What's your project's name? `multimart-backend` (or your choice)
- In which directory is your code located? `./`
- Want to override settings? **N**

**After deployment:**
- Copy the production URL (e.g., `https://multimart-backend.vercel.app`)
- Save this URL!

---

### Step 3: Add Backend Environment Variables

```bash
vercel env add NODE_ENV
```
Enter: `production`

```bash
vercel env add MONGODB_URI
```
Enter your MongoDB Atlas connection string

```bash
vercel env add JWT_SECRET
```
Enter a secure random string (32+ characters)

```bash
vercel env add PORT
```
Enter: `5000`

```bash
vercel env add FRONTEND_URL
```
Enter: `https://temporary.vercel.app` (we'll update this)

**Redeploy backend with env variables:**
```bash
vercel --prod
```

---

### Step 4: Deploy Frontend

```bash
cd ../frontend
vercel
```

**During setup, answer:**
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- What's your project's name? `multimart-frontend` (or your choice)
- In which directory is your code located? `./`
- Want to override settings? **N**

---

### Step 5: Add Frontend Environment Variable

```bash
vercel env add REACT_APP_API_URL
```
Enter your backend URL + `/api`
Example: `https://multimart-backend.vercel.app/api`

**Redeploy frontend:**
```bash
vercel --prod
```

Copy the frontend URL!

---

### Step 6: Update Backend with Frontend URL

```bash
cd ../backend
vercel env rm FRONTEND_URL
vercel env add FRONTEND_URL
```
Enter your actual frontend URL (e.g., `https://multimart-frontend.vercel.app`)

**Final backend redeploy:**
```bash
vercel --prod
```

---

## ✅ Done!

Your site is now live! 🎉

---

## 🔧 Useful CLI Commands

### Check deployment status:
```bash
vercel ls
```

### View logs:
```bash
vercel logs
```

### Remove a deployment:
```bash
vercel rm [deployment-url]
```

### View environment variables:
```bash
vercel env ls
```

### Pull environment variables locally:
```bash
vercel env pull
```

---

## 💡 Pro Tips

- Use `vercel --prod` for production deployments
- Use `vercel` alone for preview deployments
- Environment variables need to be added for each environment (production, preview, development)
- After adding env variables, always redeploy

---

## 🆘 Troubleshooting

### "No existing credentials found"
Run: `vercel login`

### "Command not found: vercel"
Your CLI is installed, but if you get this error, restart your terminal

### Environment variables not working
Make sure to redeploy after adding them:
```bash
vercel --prod
```

---

## 📊 CLI vs Web Dashboard

| Method | Speed | Ease | Best For |
|--------|-------|------|----------|
| CLI | ⚡ Fastest | Requires terminal | Developers |
| Web | 🐢 Slower | Visual interface | Beginners |

Both methods work perfectly - choose what you prefer!

---

## 🔄 Future Deployments

After initial setup, deploying updates is super easy:

```bash
# Make your changes
git add .
git commit -m "Your changes"
git push origin main

# Or deploy directly with CLI
cd backend
vercel --prod

cd ../frontend
vercel --prod
```

Vercel also auto-deploys on git push if you set it up via the dashboard!

---

**Ready? Start with Step 1 above!** ⚡
