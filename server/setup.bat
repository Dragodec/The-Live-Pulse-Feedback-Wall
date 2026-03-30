@echo off

echo Creating folder structure...

mkdir src
mkdir src\config
mkdir src\models
mkdir src\middleware
mkdir src\routes
mkdir src\controllers

echo Creating files...

type nul > src\config\db.js
type nul > src\models\Vibe.js
type nul > src\middleware\rateLimiter.js
type nul > src\routes\vibeRoutes.js
type nul > src\controllers\vibeController.js
type nul > src\server.js
type nul > .env

echo Done! Structure created 🚀
pause