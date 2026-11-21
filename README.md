# 🎁 Interactive Birthday Unboxing Website

A personalized, interactive digital birthday surprise with 3D animations, celebration effects, music, and unboxing surprises.

---

## 🚀 How to Open and Preview

1. Open File Explorer and navigate to:
   `C:\Users\yagni\.gemini\antigravity\scratch\birthday-unboxing`
2. Double-click **`index.html`** to open it in your browser (Chrome, Edge, Firefox, Safari, etc.).
3. That's it! No servers, build tools, or installations needed.

---

## ✨ Features Included

1. **3D Mystery Gift Box**:
   - Hover and tap to untie the golden ribbon and pop open the box lid.
2. **Audio Synthesizer (Web Audio API)**:
   - Built-in cheerful birthday music and sound effects (box fanfare, wish chime, balloon pops). Zero external audio dependencies needed!
3. **Surprise #1: Interactive Cake**:
   - 3-tier birthday cake with lit candles.
   - Click to "Make a wish & blow out the candles" — extinguishing flames with smoke puffs and confetti!
4. **Surprise #2: Wax-Sealed Letter**:
   - Realistic envelope with wax seal stamp that unfolds and reveals a customizable heartfelt letter.
5. **Surprise #3: Polaroid Memory Gallery**:
   - Beautiful polaroid cards pinned to the board with fun tilts.
6. **Surprise #4: Scratch-to-Reveal Card**:
   - Interactive scratch foil canvas where they use their mouse or finger to uncover a hidden gift or wish.
7. **Pop-able Ambient Balloons**:
   - Floating celebration balloons that pop with sound effects when clicked.

---

## ✏️ How to Customize

### 1. Recipient's Name
Open `index.html` and search for:
- `Birthday Star ⭐` (on the delivery tag) — change to their name!
- `Dear Birthday Legend,` (inside the letter)

### 2. The Letter's Message
In `index.html`, inside `<div class="letter-content">`, edit the paragraphs with your personal heartfelt memories, jokes, or blessings.

### 3. Add Real Photos (Optional)
Inside `index.html`, replace the placeholder block:
```html
<div class="polaroid-img placeholder-art art-1">...</div>
```
with an image tag:
```html
<img class="polaroid-img" src="your-photo.jpg" alt="Memory" />
```
Put your images directly inside the `birthday-unboxing` folder!

### 4. Customizing the Scratch Card Prize
In `index.html`, inside `<div class="scratch-reward">`, customize the prize text (e.g. "Free Coffee Date", "Weekend Trip", "A Big Hug", etc.).

---

## 🌐 How to Host for Free (To Share with Them)
You can deploy this in 60 seconds so you can send them a private link on their birthday:
1. **Vercel / Netlify**: Drag-and-drop the `birthday-unboxing` folder onto [Netlify Drop](https://app.netlify.com/drop) or Vercel.
2. **GitHub Pages**: Push this folder to a GitHub repository and turn on Pages in repository settings.
