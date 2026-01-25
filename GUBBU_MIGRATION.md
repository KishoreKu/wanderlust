# Gubbu.io Migration to Firebase

We have prepared the configuration files to migrate Gubbu.io from cPanel to Firebase Hosting.

## Remaining Steps

### 1. Create the Firebase Project
Run this command in your terminal:
```bash
firebase projects:create gubbu-io-web --display-name "Gubbu.io"
```
*(If this fails, go to console.firebase.google.com and create a project named `gubbu-io-web` manually)*

### 2. Generate Service Account Key
1. Go to [Firebase Console](https://console.firebase.google.com/project/gubbu-io-web/settings/serviceaccounts/adminsdk)
2. Click **"Generate new private key"**
3. Save the JSON file.

### 3. Add to GitHub Secrets
1. Go to your GitHub repo for Gubbu.io.
2. Settings -> Secrets and variables -> Actions.
3. Create new secret `FIREBASE_SERVICE_ACCOUNT`.
4. Paste the content of the JSON file.

### 4. Push Changes
Run these commands to deploy:
```bash
git add .
git commit -m "Migrate Gubbu.io to Firebase Hosting"
git push origin main
```

### 5. Update DNS (Final Step)
Once deployed, go to **Namecheap**:
1. Remove old A records.
2. Add A records for `gubbu.io` pointing to Firebase IPs:
   - `151.101.1.195`
   - `151.101.65.195`
