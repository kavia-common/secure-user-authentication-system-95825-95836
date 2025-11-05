#!/bin/bash
cd /home/kavia/workspace/code-generation/secure-user-authentication-system-95825-95836/frontend_react_auth
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

