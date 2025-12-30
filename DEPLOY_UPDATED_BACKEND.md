# 🔒 Updated Backend - Only Gubbu.io Links!

## ⚠️ IMPORTANT: Upload Updated server-with-rag.js

I've updated the backend to ONLY recommend Gubbu.io booking pages, never competitors!

---

## 🎯 What Changed:

### **Before (Bad):**
```
User: "Where can I book flights?"
AI: "Try Skyscanner, Google Flights, Kayak..." ❌
```

### **After (Good):**
```
User: "Where can I book flights?"
AI: "You can search and book flights directly on Gubbu.io at https://gubbu.io/flights" ✅
```

---

## 📋 New System Prompt Enforces:

### **ONLY Recommend Gubbu.io:**
- ✅ Flights → https://gubbu.io/flights
- ✅ Hotels → https://gubbu.io/hotels
- ✅ Activities → https://gubbu.io/activities

### **NEVER Mention:**
- ❌ Booking.com
- ❌ Airbnb
- ❌ Skyscanner
- ❌ Kayak
- ❌ Google Flights
- ❌ Expedia
- ❌ Any competitor sites

---

## 🚀 Deploy Updated Backend:

### **Option 1: cPanel File Manager (Easiest)**

1. **Download updated file:**
   - File: `/Users/kishorekumar/CascadeProjects/travel-blog-website/server-with-rag.js`

2. **Upload to cPanel:**
   - Log into cPanel
   - File Manager → `~/gubbu-api/src/`
   - Upload as `server.js` (replace existing)

3. **Restart app:**
   - Setup Node.js App → Restart

### **Option 2: Copy Content**

```bash
# Copy file content to clipboard
cat /Users/kishorekumar/CascadeProjects/travel-blog-website/server-with-rag.js | pbcopy

# Then in cPanel File Manager:
# - Edit ~/gubbu-api/src/server.js
# - Select all, delete
# - Paste new content
# - Save
# - Restart app
```

---

## 🧪 Test After Upload:

```bash
curl -X POST https://api.gubbu.io/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Where can I book flights to New York?"}]}'
```

**Should return:**
```
"You can search and book flights directly on Gubbu.io at https://gubbu.io/flights"
```

**Should NOT mention:** Skyscanner, Kayak, Google Flights, etc.

---

## ✅ Expected Responses:

### **Flights:**
```
User: "Book flights to Paris"
AI: "You can search and book flights on Gubbu.io at https://gubbu.io/flights. 
     Based on our budget travel guide, book 2-3 months in advance and 
     fly on Tuesdays/Wednesdays to save 20-30%."
```

### **Hotels:**
```
User: "Find hotels in NYC"
AI: "You can search and book hotels on Gubbu.io at https://gubbu.io/hotels.
     For New Year's Eve, book 2-3 months ahead as prices are $300-600/night 
     in Times Square area."
```

### **Activities:**
```
User: "Things to do in Paris"
AI: "You can book activities and tours on Gubbu.io at https://gubbu.io/activities.
     Best time to visit is April-June for pleasant weather and outdoor cafés."
```

---

## 💰 Benefits:

1. **All bookings go through YOUR site** ✅
2. **Earn affiliate commissions** ✅
3. **Keep users on Gubbu.io** ✅
4. **No free advertising for competitors** ✅
5. **Professional, branded experience** ✅

---

## 🎯 Summary:

**File to upload:** `server-with-rag.js`  
**Upload to:** `~/gubbu-api/src/server.js` on cPanel  
**Then:** Restart Node.js app  
**Result:** AI only recommends Gubbu.io pages!

---

**Upload the updated backend now to stop recommending competitors!** 🚀
