# 🚀 DevOps Path-Based Routing (Frontend + Backend - Port 3000)

## 📌 Overview

This project demonstrates **path-based routing using an Application Load Balancer** with:

* 🌐 HTML Frontend (DevOps Tools Dashboard)
* ⚙️ Node.js Backend (Express)
* 🎯 Target Groups running on **port 3000**

Traffic is routed based on URL paths like:

* `/jenkins`
* `/docker`
* `/kubernetes`

---

## 🏗️ Architecture

```
User (Browser)
     ↓
Frontend (HTML Page)
     ↓
Application Load Balancer (Port 80)
     ↓
Path-Based Routing
     ↓
Target Groups (Port 3000)
     ↓
EC2 Instances (Node.js Apps)
```

---

# 🌐 Frontend Setup

## 📄 `index.html`

```html
<!DOCTYPE html>
<html>
<head>
    <title>DevOps Tools Portal</title>
    <style>
        body {
            font-family: Arial;
            text-align: center;
            background-color: #f4f4f4;
        }
        h1 {
            margin-top: 40px;
        }
        .container {
            margin-top: 50px;
        }
        .btn {
            display: block;
            width: 250px;
            margin: 15px auto;
            padding: 15px;
            font-size: 18px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
        }
        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>

<h1>🚀 DevOps Tools Dashboard</h1>

<div class="container">
    <button class="btn" onclick="goTo('jenkins')">Jenkins</button>
    <button class="btn" onclick="goTo('docker')">Docker</button>
    <button class="btn" onclick="goTo('kubernetes')">Kubernetes</button>
</div>

<script>
function goTo(tool) {
    const baseURL = "http://<ALB-DNS>";
    window.location.href = baseURL + "/" + tool + "/";
}
</script>

</body>
</html>
```

---

## 🚀 How to Run Frontend

### Option 1: Open directly

```bash
open index.html
```

### Option 2: Host using Apache/Nginx (recommended)

```bash
sudo yum install httpd -y
sudo systemctl start httpd
sudo systemctl enable httpd
```

Copy file:

```bash
sudo cp index.html /var/www/html/
```

Access:

```
http://<FRONTEND-PUBLIC-IP>
```

---

## 🔐 Frontend Security Group (IMPORTANT)

### If frontend is hosted on EC2:

Allow:

```
HTTP (80) → 0.0.0.0/0
```

Optional:

```
HTTPS (443) → 0.0.0.0/0
```

👉 This allows users to access frontend page from browser

---

# ⚙️ Backend Setup (Node.js)

## 📄 `server.js`

```javascript
const express = require("express");
const app = express();

const PORT = 3000;

app.get("/jenkins", (req, res) => {
    res.send(`Jenkins Server ⚙️ running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

---

## 🔧 Installation Steps (EC2)

### 1️⃣ Install Node.js

```bash
sudo yum update -y
sudo yum install nodejs -y
```

### 2️⃣ Initialize Project

```bash
npm init -y
```

### 3️⃣ Install Express

```bash
npm install express
```

### 4️⃣ Run App

```bash
node server.js
```

---

# 🔐 Backend Security Group

Allow:

```
Port: 3000
Source: Load Balancer Security Group
```

---

# 🎯 Target Group Configuration

* Protocol: HTTP
* Port: **3000**
* Target Type: Instance

### Health Check

```
Path: /jenkins
Port: 3000
```

---

# 🌐 Load Balancer Setup

## Listener Rules

| Path          | Target Group  |
| ------------- | ------------- |
| /jenkins/*    | jenkins-tg    |
| /docker/*     | docker-tg     |
| /kubernetes/* | kubernetes-tg |

---

# 🧪 Testing

### From Frontend:

* Click Jenkins → `/jenkins`
* Click Docker → `/docker`
* Click Kubernetes → `/kubernetes`

---

# 🔴 Important Notes

### ❗ Always Use ALB DNS in Frontend

```
http://<ALB-DNS>/jenkins
```

---

### ❗ Port Matching Rule

| Component    | Port |
| ------------ | ---- |
| ALB          | 80   |
| Target Group | 3000 |
| Backend App  | 3000 |

---

### ❗ Path vs Port

* `/jenkins` → path
* `3000` → port

👉 Routing happens using **path**, not port

---

# 🚀 Outcome

* Frontend dashboard with DevOps tools
* Backend services on port 3000
* Path-based routing via Load Balancer
* Secure and scalable setup

---

# 🙌 Ali

DevOps Practice Project
