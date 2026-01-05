#!/bin/zsh

# This script reloads your shell configuration to apply the PATH fix
# Run this with: source reload-shell.sh

echo "🔄 Reloading shell configuration..."

# Source the updated .zshrc
source ~/.zshrc

echo "✅ Shell configuration reloaded!"
echo ""
echo "Testing basic commands:"
echo "  PATH is now: $PATH"
echo ""

# Test if commands are working
if command -v clear >/dev/null 2>&1; then
    echo "✅ 'clear' command found at: $(which clear)"
else
    echo "❌ 'clear' command not found"
fi

if command -v ls >/dev/null 2>&1; then
    echo "✅ 'ls' command found at: $(which ls)"
else
    echo "❌ 'ls' command not found"
fi

if command -v cat >/dev/null 2>&1; then
    echo "✅ 'cat' command found at: $(which cat)"
else
    echo "❌ 'cat' command not found"
fi

echo ""
echo "You can now use 'clear' or 'cls' (if aliased) normally!"
