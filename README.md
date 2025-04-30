# EasyFixer App

**Smart Service Request Management System**
(Why smart? → It detects your location and alerts the nearest available worker within 40 km)
**Main Aim:** To help people solve building problems quickly while providing nearby workers with job opportunities and a way to earn money.  
**Target Audience:**  

- People who have problems in their buildings and need repairs.  
- Craftsmen and companies who can offer such services.

---

## Technologies

*(React + Next.js + Vercel / MongoDB Atlas / Firebase Auth)*

- **UI:** Next.js / Vercel  
- **Backend:** Next.js (API Routes) + Express.js for business logic  
- **Database:** Supabase  
- **Hosting:** Free tier on Vercel, Render, or Railway  
- **Version Control:** GitHub (team collaboration)  
- **Planning / Brainstorming:** Notion  
- **UI Design:** Figma  
- **Authentication:** Supabase Auth — free for up to 10,000 monthly active users with built-in Google OAuth  
- **Image Storage:** Cloudinary — free plan (~25 GB bandwidth / 25 credits), use signed uploads via API for security

---

## Minimum MVP Functionality

### 1. Access & Identity

- **User authentication/registration** (people and workers)
- **Profile management:** edit profile, set real location (updated on each login), upload photo

### 2. Finding Help

- **Keyword search** (problem or service) — shows nearest workers on a map
- **Auto-suggest nearest workers** when a request is created

### 3. Creating & Matching Requests

- **Create service request** with problem description and optional image
- **Accept or reject suggested worker** and confirm the order
- **Map view of available workers** for direct selection

### 4. Worker Tools

- **Browse, filter, and apply for jobs**
- **Commit to an assigned job**
- **Contact requester** (phone, email, or in-app message)

### 5. Progress Tracking

- **Status flow:** new → in progress → completed
- **Notifications:** new assignment, status change, job updates

### 6. Insight Dashboards

- **Clients:** active and past requests
- **Workers:** job history and earnings
- **Admins:** user management and system performance

---

## User Flow

| Role | First-time Path | Returning Path |
|------|------------------|----------------|
| **Client** | 1. Guest → **Sign up** (name, email, phone) <br> 2. **Onboard FORM**: role, confirm location manually, add photo (optional), extra info <br> 3. **Create request**: choose category, describe issue, attach images, manually add location <br> 4. **See worker matches** (distance, rating, price) <br> 5. **Pick / invite** a worker → confirm order <br> 6. **Track status** → chat / call if needed <br> 7. **Mark complete & rate** | 1. Log in → **Dashboard** <br> 2. Quick “+ New request” or view active ones <br> 3. Accept / change suggested worker <br> 4. Receive push / email updates |
| **Worker** | 1. Guest → **Sign up** (email, phone) <br> 2. **Onboard FORM**: role, confirm location manually, add photo (optional), extra info (skills, service radius) <br> 3. Toggle **availability** <br> 4. **Browse / auto-match** jobs in radius <br> 5. **Accept** assigned job <br> 6. In-app map to client → change status <br> 7. **Upload “after” photo**, mark complete → get paid | 1. Log in → **Dashboard** <br> 2. Filter jobs by distance / category <br> 3. Accept or update jobs <br> 4. Review earnings & ratings |
| **Admin** | 1. Log in → **Admin Panel** <br> 2. Approve worker profiles, monitor job feed <br> 3. Manage users, disputes, categories <br> 4. Edit system settings & banners | 1. Log in → **Dashboards** (KPIs, heat-map) <br> 2. Bulk actions: suspend user, refund, export reports |
