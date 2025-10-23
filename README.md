# ☕️ Echo+ — The Broista’s Superpower  

### Team: RunTime Terror  
### Challenge: Dutch Bros x ASU Spark Challenge — Broista Co-Pilot  

---

## 🌟 Overview
**Echo+** is an AI-powered co-pilot for Dutch Bros Broistas.  
It listens naturally to customer conversations, understands orders in real time, and builds them automatically — keeping the Broista focused on people, not screens.

> “We handle the data so the Broista can handle the magic.”

---

## 🎯 Current Goal
Create a hands-free ordering assistant that:
- Understands drink, size, milk, sweetness, etc.  
- Detects missing details (“milk type?”, “sweetness?”).  
- Sends the final structured order directly to the Dutch Bros system for display.  

---

## 🧠 Current MVP Features ✅
| Feature | Description |
|----------|-------------|
| **OrderSync** | Parses natural-language orders into structured JSON. |
| **AWS Backend** | Deployed via AWS SAM — Lambda + API Gateway + DynamoDB. |
| **React Frontend** | Simple UI to enter an order and see the parsed result. |
| **Live Integration** | End-to-end call to AWS returning a real parsed order. |

---

## ☁️ Architecture
Customer Speech/Text
↓
Frontend (React + Vite)
↓
AWS API Gateway → Lambda (OrderSync)
↓
DynamoDB (Menu + Memory)
↓
Response → Frontend UI
↓
Dutch Bros KDS (API Integration Next)

yaml
Copy code

---

## ⚙️ Tech Stack
| Layer | Technology |
|-------|-------------|
| Frontend | React + Vite + Axios |
| Backend | AWS Lambda (Node.js 20) |
| Database | Amazon DynamoDB |
| Infra Deploy | AWS SAM |
| Speech-to-Text | Web Speech API (frontend) / Amazon Transcribe (backend planned) |
| NLP Parsing | Amazon Comprehend (Custom Entities) |

---

## 🧩 Setup

### 1️⃣ Frontend (.env.local)
Create `/web/.env.local`:
```bash
VITE_API_BASE=<your-AWS-API-URL>
Example:

bash
Copy code
VITE_API_BASE=https://wtqjry80si.execute-api.us-west-2.amazonaws.com/dev
2️⃣ Run Frontend
bash
Copy code
cd web
npm install
npm run dev
Then open http://localhost:5173.

🧪 Example Response
json
Copy code
{
  "order_id": "oid_q396oqam8tmmh3ywsa1",
  "items": [
    {
      "name": "Golden Eagle",
      "size": "Medium",
      "temp": "Iced",
      "modifiers": []
    }
  ],
  "status": "Awaiting Confirm",
  "confidence": 0.75,
  "price": 6.5
}
👥 Team Roles
Member	Role	Focus
Jishnu (Lead)	AWS Infra + Integration	Maintain backend, manage PRs, connect to Dutch Bros API
Teammate 1	Frontend UI	Dashboard + Order History
Teammate 2	Voice Module	Mic input (Web Speech API)
Teammate 3	Memory & Loyalty	/memoryCapture and profile recall
Teammate 4	QR & KDS	QR scanner + live order display

🧰 GitHub Workflow
bash
Copy code
git clone https://github.com/jparuchu-818/EchoSync.git
git checkout -b feature-name
# make changes
git add .
git commit -m "Add new feature"
git push origin feature-name
Create a Pull Request → tag @Jishnu for review.

🚀 Next Steps
🎤 Continuous voice listening + auto-transcript

💬 SmartWhisper (ask about milk / sweetness)

💾 Customer memory storage in DynamoDB

📱 QR integration for loyalty customers

☁️ Send final JSON to Dutch Bros KDS API

🔒 Security
.env.local is ignored by Git (do not push keys).

Dutch Bros API keys are stored only in AWS Lambda environment variables.

🏁 Status
✅ Backend & Frontend working
🟡 Integration with Dutch Bros API in progress
🚀 Ready for team development and final demo