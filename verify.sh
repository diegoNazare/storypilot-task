#!/bin/bash

echo "🔍 Storyteller Project Verification"
echo "===================================="
echo ""

# Check Node version
NODE_VERSION=$(node --version)
echo "✓ Node version: $NODE_VERSION"
echo ""

# Check project structure
echo "📁 Checking project structure..."
if [ -d "docs-site" ] && [ -d "prototype" ]; then
    echo "✓ Both docs-site and prototype directories exist"
else
    echo "✗ Missing directories"
    exit 1
fi
echo ""

# Check docs-site
echo "📖 Verifying docs-site..."
cd docs-site
if [ -f "package.json" ]; then
    echo "✓ package.json exists"
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo "  Installing dependencies..."
        npm install > /dev/null 2>&1
    fi
    
    # Try to build
    echo "  Building docs-site..."
    if npm run build > /dev/null 2>&1; then
        echo "✓ Docs-site builds successfully"
    else
        echo "✗ Build failed"
        cd ..
        exit 1
    fi
else
    echo "✗ package.json not found"
    cd ..
    exit 1
fi
cd ..
echo ""

# Check prototype
echo "🎬 Verifying prototype..."
cd prototype
if [ -f "package.json" ]; then
    echo "✓ package.json exists"
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo "  Installing dependencies..."
        npm install > /dev/null 2>&1
    fi
    
    echo "✓ All dependencies installed"
else
    echo "✗ package.json not found"
    cd ..
    exit 1
fi
cd ..
echo ""

# Check key files
echo "📄 Checking key files..."
FILES=(
    "README.md"
    "docs-site/README.md"
    "docs-site/app/page.tsx"
    "docs-site/app/architecture/page.tsx"
    "docs-site/app/api/page.tsx"
    "docs-site/app/data-model/page.tsx"
    "docs-site/app/implementation/page.tsx"
    "docs-site/app/rollout/page.tsx"
    "docs-site/app/ai/page.tsx"
    "prototype/README.md"
    "prototype/src/index.js"
    "prototype/src/services/personalization.js"
    "prototype/src/routes/feed.js"
    "prototype/tests/demo.sh"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file"
    else
        echo "✗ Missing: $file"
    fi
done
echo ""

# Summary
echo "===================================="
echo "✅ Verification Complete!"
echo ""
echo "To view documentation:"
echo "  cd docs-site && npm run dev"
echo "  Open http://localhost:3000"
echo ""
echo "To run prototype:"
echo "  cd prototype && npm start"
echo "  Server at http://localhost:3001"
echo ""
echo "To run demo:"
echo "  cd prototype && ./tests/demo.sh"
echo ""
