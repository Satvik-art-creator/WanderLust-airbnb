# 🌍 WanderLust
*A mini Airbnb-style web application for listing and exploring places*

🔗 **Live Demo:** https://wanderlust-dwep.onrender.com/listings  

---

## 📌 About the Project

**WanderLust** is a full-stack web application inspired by Airbnb. It allows users to create, view, edit, and delete property listings, upload images, view locations on maps, and authenticate securely.

The project is built using **Node.js**, **Express**, **MongoDB**, and follows the **MVC (Model–View–Controller)** architecture.

---

## 🚀 Features

- 🏠 Create, edit, and delete property listings  
- 📷 Image upload with **Cloudinary**
- 🗺️ Interactive maps using **Mapbox**
- 🔐 User authentication (Local & Google OAuth)
- 🧾 Server-side validation using **Joi**
- 🗃️ MongoDB session storage
- 💬 Flash messages for better UX
- 📱 Responsive UI with EJS templates

---

## 🛠️ Tech Stack

### Backend
- **Node.js** (v22.18.0)
- **Express.js**

### Database
- **MongoDB**
- **Mongoose**

### Authentication
- **Passport.js**
- Passport Local Strategy
- Google OAuth (OIDC)

### Frontend
- **EJS**
- **EJS-Mate**

### Cloud & Maps
- **Cloudinary** – Image storage
- **Mapbox SDK** – Maps & geolocation

### Other Tools & Middleware
- Multer
- Express Session
- Connect-Mongo
- Method Override
- Express Flash
- Dotenv
- Joi Validation

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Satvik-art-creator/WanderLust-airbnb.git
cd wanderlust
```
2️⃣ Install Dependencies
```bash
npm install
```
3️⃣ Environment Variables

Create a .env file in the root directory and add:
```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret

MAPBOX_TOKEN=your_mapbox_token

DB_URL=your_mongodb_connection_string
SESSION_SECRET=your_session_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```
4️⃣ Run the Application
```bash
node app.js
```
Then visit:
```bash
http://localhost:3000/listings
```
🧪 Validation & Security

Input validation using Joi
Secure authentication with Passport
Encrypted sessions stored in MongoDB
Protected routes for authorized users only

📦 NPM Packages Used

All dependencies are listed in package.json, including:

express
mongoose
passport
cloudinary
multer
mapbox-sdk
joi
dotenv
…and more

👨‍💻 Author

Satvik Rastogi
GitHub: https://github.com/Satvik-art-creator

📄 License
This project is licensed under the ISC License.

⭐ Acknowledgements

Inspired by Airbnb
Mapbox & Cloudinary documentation
Open-source Node.js community
