#!/bin/bash

# MultiMart Deployment Script
# This script helps you deploy to GitHub and Vercel

echo "🚀 MultiMart Deployment Helper"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

echo ""
echo "📝 Current Git Status:"
git status --short

echo ""
read -p "Do you want to commit all changes? (y/n): " commit_choice

if [ "$commit_choice" = "y" ]; then
    echo ""
    read -p "Enter commit message: " commit_msg
    
    if [ -z "$commit_msg" ]; then
        commit_msg="Update MultiMart project"
    fi
    
    echo "📦 Adding all files..."
    git add .
    
    echo "💾 Committing changes..."
    git commit -m "$commit_msg"
    
    echo "✅ Changes committed"
fi

echo ""
echo "🔗 GitHub Repository Setup"
echo "=========================="
echo ""
echo "Have you created a GitHub repository? (https://github.com/new)"
read -p "Enter your GitHub repository URL (or press Enter to skip): " repo_url

if [ ! -z "$repo_url" ]; then
    # Check if remote already exists
    if git remote | grep -q "origin"; then
        echo "📝 Updating remote origin..."
        git remote set-url origin "$repo_url"
    else
        echo "📝 Adding remote origin..."
        git remote add origin "$repo_url"
    fi
    
    echo ""
    read -p "Push to GitHub now? (y/n): " push_choice
    
    if [ "$push_choice" = "y" ]; then
        echo "🚀 Pushing to GitHub..."
        git branch -M main
        git push -u origin main
        echo "✅ Pushed to GitHub successfully!"
    fi
fi

echo ""
echo "☁️  Vercel Deployment"
echo "===================="
echo ""
echo "Next steps for Vercel deployment:"
echo ""
echo "1. Install Vercel CLI (if not installed):"
echo "   npm install -g vercel"
echo ""
echo "2. Deploy Backend:"
echo "   cd backend"
echo "   vercel login"
echo "   vercel"
echo "   vercel --prod"
echo ""
echo "3. Deploy Frontend:"
echo "   cd frontend"
echo "   vercel"
echo "   vercel --prod"
echo ""
echo "📖 For detailed instructions, see: DEPLOY_TO_GITHUB_VERCEL.md"
echo ""
echo "✅ Deployment preparation complete!"
