
- **Frontend URL**: https://assignment-sable-kappa.vercel.app/
- **API URL**: https://assignment-h9fg.onrender.com
- **Patient**: `shivam12@example.com` / `12345678`
- **Admin**: `admin@gmail.com` / `12345678`
- **Repo URL**: https://github.com/shivamxverma/assignment

# Clinic Appointment Booking

## URLs
- Frontend: https://assignment-sable-kappa.vercel.app/
- API: https://assignment-h9fg.onrender.com
- Repo: https://github.com/shivamxverma/assignment

## Credentials
- Patient: `shivam12@example.com` / `12345678`
- Admin: `admin@gmail.com` / `12345678`

## Run Locally
1. Clone: `git clone https://github.com/shivamxverma/assignment`
2. Backend (`cd backend`):
   - `.env`:
     ```
     MONGO_URI=mongodb://mongodb:27017/clinic
     ACCESS_TOKEN_SECRET=secret
     REFRESH_TOKEN_SECRET=secret
     ACCESS_TOKEN_EXPIRY=1d
     REFRESH_TOKEN_EXPIRY=7d
     PORT=8000
     ```
   - `npm install`
3. Frontend (`cd frontend`):
   - `.env`:
     ```
     REACT_APP_API_URL=http://backend:8000
     ```
   - `npm install`
4. Run: `cd .. && docker-compose up --build`
5. Open: `http://localhost`

## cURL
1. Register:
   ```
   curl -X POST https://assignment-h9fg.onrender.com/api/register -H "Content-Type: application/json" -d '{"name":"Test","email":"shivam12@example.com","password":"12345678","role":"patient"}'
   ```
2. Login:
   ```
   curl -X POST https://assignment-h9fg.onrender.com/api/login -H "Content-Type: application/json" -c cookies.txt -d '{"email":"admin@gmail.com","password":"12345678"}'
   ```
3. Slots:
   ```
   curl -X GET https://assignment-h9fg.onrender.com/api/slots -b cookies.txt
   ```
4. Book:
   ```
   curl -X POST https://assignment-h9fg.onrender.com/api/book -H "Content-Type: application/json" -b cookies.txt -d '{"slotId":"<slotId>"}'
   ```
5. My Bookings:
   ```
   curl -X GET https://assignment-h9fg.onrender.com/api/my-bookings -b cookies.txt
   ```
6. All Bookings (Admin):
   ```
   curl -X GET https://assignment-h9fg.onrender.com/api/all-bookings -b cookies.txt
   ```
