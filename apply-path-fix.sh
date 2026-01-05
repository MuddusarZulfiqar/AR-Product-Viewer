#!/bin/zsh

# Quick fix script to apply PATH changes to current terminal session
# Run this with: source apply-path-fix.sh

echo "🔄 Applying PATH fix to current terminal session..."

# Export the correct PATH
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$HOME/bin:$PATH"
export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:$PATH"
export PATH="$HOME/.console-ninja/.bin:$PATH"
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
export PATH="$HOME/.rbenv/bin:$PATH"

# Create cls alias
alias cls='clear'

echo "✅ PATH has been updated for this terminal session!"
echo ""
echo "Current PATH:"
echo "$PATH"
echo ""
echo "Testing commands:"

if command -v clear >/dev/null 2>&1; then
    echo "✅ 'clear' works - located at: $(which clear)"
else
    echo "❌ 'clear' not found"
fi

if command -v ls >/dev/null 2>&1; then
    echo "✅ 'ls' works - located at: $(which ls)"
else
    echo "❌ 'ls' not found"
fi

echo ""
echo "You can now use:"
echo "  - clear (to clear screen)"
echo "  - cls (alias for clear)"
echo "  - npm run dev (will work normally)"
echo ""
echo "⚠️  Note: This fix is temporary for this terminal session only."
echo "    To make it permanent, restart your terminal or run: source ~/.zshrc"
