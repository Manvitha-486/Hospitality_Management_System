# 🧾 Hotel Food Invoice Generator (Full Stack)

A full-stack web application that allows hotels to manage food orders for in-house guests and generate **professional PDF invoices** with **GST breakdown**. The system supports **meal-based menus (Breakfast, Lunch, Dinner)**, dynamic pricing, quantity selection, and secure guest-only billing.

---

## 🚀 Features

* Guest-only access using **Room Number & Guest Name**
* Meal-based menu:

  * Breakfast
  * Lunch
  * Dinner
* Dynamic food price management
* Quantity control using **+ / −**
* Automatic bill calculation
* GST-compliant billing:

  * CGST (2.5%)
  * SGST (2.5%)
* Professional, printable **PDF invoice**
* Backend-calculated totals (secure & reliable)

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose
* PDFKit

---

## 📂 Project Structure

```
Invoice-generator/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── vite.config.js
```

---

## ⚙️ Backend Setup

1. Navigate to backend:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

4. Start server:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## 🎨 Frontend Setup

1. Navigate to frontend:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start frontend:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔌 API Endpoints

### Guest

* `POST /api/guests` – Guest check-in / validation

### Food

* `POST /api/foods` – Add food item
* `GET /api/foods?mealType=breakfast|lunch|dinner`

### Invoice

* `POST /api/invoices/pdf` – Generate GST invoice PDF

---

## 🧾 Invoice Calculation Logic

```
Subtotal = Σ (price × quantity)
CGST = 2.5% of Subtotal
SGST = 2.5% of Subtotal
Grand Total = Subtotal + CGST + SGST
```

All calculations are done **on the backend**.

---

## 🔐 Access Control

* Only guests who are checked-in can generate invoices
* Unauthorized room numbers are blocked

---

## 📄 PDF Invoice Includes

* Hotel branding
* Guest name & room number
* Meal type
* Itemized food list
* Subtotal
* CGST & SGST
* Grand total
* Date & time

---

## 🌟 Why This Project?

* Real-world hotel billing use case
* End-to-end full stack implementation
* PDF generation (industry-relevant skill)
* GST-compliant billing
* Strong resume & interview project

---

## 🔮 Future Enhancements

* Admin authentication
* Daily sales reports
* Invoice history
* Hotel logo upload
* Deployment (Render / Netlify)





