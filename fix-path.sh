#!/bin/bash

# This script fixes the PATH issue permanently by updating .zshrc
# Run this script with: /bin/bash fix-path.sh

ZSHRC="$HOME/.zshrc"

# Backup the current .zshrc
/bin/cp "$ZSHRC" "$ZSHRC.backup.$(/bin/date +%Y%m%d_%H%M%S)"

# Create the new .zshrc content
/bin/cat > "$ZSHRC" << 'EOF'
# Restore standard macOS binaries to PATH first
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$HOME/bin:$PATH"

# Add Homebrew to PATH
eval "$(/opt/homebrew/bin/brew shellenv)"

# Add console-ninja to PATH
export PATH="$HOME/.console-ninja/.bin:$PATH"

# Add Ruby (via Homebrew) to PATH
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"

# Initialize rbenv only if installed (this should be done once)
if command -v rbenv >/dev/null 2>&1; then
    export PATH="$HOME/.rbenv/bin:$PATH"
    eval "$(rbenv init - zsh)"
fi

# Initialize nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
EOF

/bin/echo "✅ .zshrc has been updated!"
/bin/echo "📁 Backup saved to: $ZSHRC.backup.$(/bin/date +%Y%m%d_%H%M%S)"
/bin/echo ""
/bin/echo "To apply the changes, run:"
/bin/echo "  source ~/.zshrc"
/bin/echo ""
/bin/echo "Or restart your terminal."
