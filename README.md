# **Prometheus \- AI Fake News Detector**

**Live Demo:** [https://prometheus-3t0i.onrender.com](https://prometheus-3t0i.onrender.com)

Prometheus is a full-stack web application designed to combat misinformation by providing users with a powerful tool to assess the credibility of news articles. By pasting text directly or providing a URL, users can leverage a custom-trained Machine Learning model to receive a real-time prediction on whether an article is likely real or fake.

The application features a complete three-tier architecture, including a React frontend, a Node.js backend API, and a separate Python AI microservice, all deployed and working in harmony on Render.

*(Note: You should replace this with an updated screenshot of your live application)*

## **Features**

* **AI-Powered Analysis:** Utilizes a custom-trained Logistic Regression model with TF-IDF vectorization to classify news text with high accuracy.  
* **Analyze by Text or URL:** Users can either paste raw text or simply provide a URL to an article for analysis. The backend handles the web scraping and text extraction.  
* **Secure User Authentication:** Full user registration and login system using JSON Web Tokens (JWT) for session management. Passwords are securely hashed using bcrypt.js.  
* **Personalized Analysis History:** Each logged-in user has their own private, persistent history of past analyses, stored securely in a cloud-hosted MongoDB Atlas database.  
* **User Feedback System:** Users can report incorrect predictions, providing valuable data that can be used for future model retraining and improvement.  
* **Complete Account Management:** Users have the ability to securely delete their account and all of their associated data.  
* **Modern UI/UX:** A clean, responsive, and intuitive user interface built with React and styled with Tailwind CSS, featuring a dark mode for user comfort.

## **Tech Stack & Architecture**

This project is built with a modern, decoupled three-tier architecture, making it scalable and maintainable.

* **Frontend (Static Site on Render):**  
  * **Framework:** React.js  
  * **HTTP Client:** Axios  
  * **Styling:** Tailwind CSS  
* **Backend (Web Service on Render):**  
  * **Environment:** Node.js  
  * **Framework:** Express.js  
  * **Database ORM:** Mongoose  
  * **Authentication:** JSON Web Tokens (JWT), bcrypt.js  
* **AI Model (Web Service on Render):**  
  * **Language:** Python  
  * **Framework:** Flask  
  * **ML Libraries:** Scikit-learn, Pandas, Joblib  
  * **Production Server:** Gunicorn  
* **Database:**  
  * **Type:** NoSQL  
  * **Service:** MongoDB Atlas (Cloud-hosted)

## **Local Development Setup**

To run this project on your local machine, follow these steps:

### **Prerequisites**

* Node.js and npm installed  
* Python and pip installed  
* A local or cloud MongoDB instance (a free tier from MongoDB Atlas is recommended)

### **1\. Clone the Repository**

git clone \[https://github.com/Atikur1043/fake-news-detector-2.git] (https://github.com/Atikur1043/fake-news-detector-2.git)  
cd fake-news-detector-2

### **2\. Backend Setup**

\# Navigate to the server directory  
cd server

\# Install dependencies  
npm install

\# Create a .env file and add your environment variables  
\# (MONGO\_URI, JWT\_SECRET, and MODEL\_API\_URL for the local model)  
cp .env.example .env

\# Start the server  
npm start

### **3\. AI Model Setup**

\# Navigate to the model directory  
cd model

\# Create and activate a virtual environment  
python \-m venv venv  
source venv/bin/activate  \# On Windows, use \`venv\\Scripts\\activate\`

\# Install dependencies  
pip install \-r requirements.txt

\# If you haven't trained the model yet, run the training script  
\# (This requires Fake.csv and True.csv in the /model directory)  
python train\_model.py

\# Start the Flask API server  
flask run

### **4\. Frontend Setup**

\# Navigate to the client directory  
cd client

\# Install dependencies  
npm install

\# Create a .env file and add your local backend API URL  
\# REACT\_APP\_API\_URL=http://localhost:8000  
cp .env.example .env

\# Start the React development server  
npm start

Your application should now be running, with the frontend on http://localhost:3000, the backend on http://localhost:8000, and the AI model on http://localhost:5000.
