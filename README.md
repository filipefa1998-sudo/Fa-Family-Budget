# Fa Family Budget

A private, shared budget for two people. You enter everything by hand, so no bank logins are involved. It runs as a free website on GitHub Pages and stores data in your own Firebase project. Only the two Google accounts you list can sign in.

## What's in the repo

| File | What it is |
|---|---|
| `index.html` | The whole app |
| `firebase-config.js` | Your Firebase keys and the two allowed emails (**you edit this**) |
| `firestore.rules` | Database security rules (**you edit the emails, then paste into Firebase**) |
| `manifest.json`, `sw.js`, `icons/` | Make it installable on your phones and let it open offline |

## Setup (about 15 minutes, one time)

### 1. Create the Firebase project
1. Go to <https://console.firebase.google.com> and click **Add project**. Name it something like `fa-family-budget`. You can turn Google Analytics off.
2. In the project, click the **</>** (Web) icon to add a web app. Nickname it `budget`. Skip Firebase Hosting.
3. Firebase shows a `firebaseConfig` block. Copy those values into `firebase-config.js`, replacing every `PASTE_...`.

### 2. Turn on Google sign-in
1. Go to **Build → Authentication → Get started → Sign-in method → Google → Enable**. Pick your support email and save.
2. Go to **Authentication → Settings → Authorized domains → Add domain** and add `YOUR-GITHUB-USERNAME.github.io`.

### 3. Create the database and lock it down
1. Go to **Build → Firestore Database → Create database**. Choose **production mode** and a US location, such as `us-central1`.
2. Open the **Rules** tab. Delete what's there, paste in the contents of `firestore.rules`, and replace the two emails with yours and your wife's, in **lowercase**. Click **Publish**.

### 4. Put your emails in the app
In `firebase-config.js`, set `householdEmails` to the same two addresses.

### 5. Publish on GitHub Pages
1. Create a new repository on GitHub, such as `fa-family-budget`. Public is fine, and so is private on a paid plan.
2. Upload every file and folder in this repo, keeping `icons/` as a folder.
3. Go to **Settings → Pages → Build and deployment**. Set **Source: Deploy from a branch**, **Branch: `main`**, folder `/ (root)`, then click **Save**.
4. After a minute or two, your app is live at `https://YOUR-GITHUB-USERNAME.github.io/fa-family-budget/`.

### 6. Install it on both phones
Open the link in **Safari** on iPhone, or **Chrome** on Android. Sign in with Google, then use **Share → Add to Home Screen** on iPhone or **Install app** on Android.

On the first sign-in, the app creates the starter categories (including Tithing and Fast offerings). Then open **Settings** and enter your usual monthly take-home pay, fun money, big-purchase check-in amount and fast offering.

## Is it safe to put the Firebase keys in a public repo?
Yes. Firebase web keys are meant to be public. What protects your data is `firestore.rules`, which only lets your two signed-in, verified Google accounts read or write.

If you'd like an extra layer, go to Google Cloud Console → **APIs & Services → Credentials**. Restrict the browser key to the HTTP referrer `https://YOUR-GITHUB-USERNAME.github.io/*` plus `https://YOUR-PROJECT.firebaseapp.com/*`. Keep the firebaseapp.com entry, because Google sign-in uses that domain.

## Making changes later
- Edit `index.html`, then upload or commit it.
- In `sw.js`, bump `VERSION` (for example `ffb-v1` → `ffb-v2`) so installed phones pick up the new version. The new version loads the next time the app is opened while online.

## Cost
Free. Two people logging transactions use a tiny fraction of Firebase's free Spark plan and of GitHub Pages.

## Troubleshooting
- **"Firebase isn't set up yet"**: `firebase-config.js` still has `PASTE_` values.
- **"…isn't on the household list"**: the email you signed in with isn't in `householdEmails`. Check spelling, and use lowercase.
- **Sign-in popup closes with an error about the domain**: add your `github.io` domain under Authentication → Authorized domains (step 2).
- **Things load but won't save**: the emails in the Firestore **Rules** tab don't match, or the rules weren't published.
