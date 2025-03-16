# Shrawani's Birthday Website

A beautiful and interactive birthday website created especially for Shrawani's special day. The website features a modern, elegant design with animations, a personal message, photo gallery, and a fun interactive balloon pop challenge.

## Features

- Modern, elegant design with soft pastel colors
- Smooth animations and transitions
- Custom cursor and starry background effects
- Floating balloons animation
- Personal birthday message section
- Photo gallery to showcase memories
- Interactive balloon pop challenge game
- Interactive 3D birthday card with surprise message
- Beautiful fireworks animation effects
- Background music with play/pause controls
- Confetti celebration when the cake is revealed
- Fully responsive design (mobile-friendly)

## How to Use

1. Replace placeholder images in the `images` folder with your own photos:
   - Replace `placeholder1.jpg` through `placeholder6.jpg` with your own photos
   - Replace `cake.png` with an image of a birthday cake
   - Replace `pattern.png` and `confetti-bg.png` with your own background textures (optional)

2. Customize the birthday message in `index.html`:
   - Locate the "Birthday Wishes" section
   - Edit the message inside the `<p class="wish-text">` element

3. Customize colors (optional):
   - Open `css/style.css`
   - Adjust the color variables in the `:root` section

4. Host the website:
   - Upload all files to a web hosting service
   - Or use GitHub Pages to host it for free

## Customization Tips

### Changing Colors

To change the color scheme, edit the color variables in `css/style.css`:

```css
:root {
    --primary-color: #ff85a2;
    --secondary-color: #ffa8b6;
    --accent-color: #ffd166;
    --dark-color: #331832;
    --light-color: #fff9f5;
    --transition: all 0.3s ease;
}
```

### Adding More Photos

To add more photos to the gallery:

1. Add new image files to the `images` folder
2. In `index.html`, duplicate the gallery item elements in the gallery section:

```html
<div class="gallery-item">
    <img src="images/your-new-image.jpg" alt="Memory Description">
</div>
```

### Customizing the Background Music

To change the background music:

1. Find a royalty-free music track you want to use
2. In `js/music.js`, update the `musicUrl` parameter in the BackgroundMusic initialization:

```javascript
window.birthdayMusic = new BackgroundMusic({
    musicUrl: 'path/to/your/music-file.mp3',
    autoplay: false,
    loop: true,
    volume: 0.5
});
```

### Customizing the Birthday Card

To customize the birthday card message:

1. Open `js/birthday-card.js`
2. Locate the `createCard()` method
3. Edit the HTML content in the `cardInside.innerHTML` section to update the message

### Customizing Fireworks

To adjust the fireworks animation:

1. Open `js/fireworks.js`
2. You can modify parameters such as colors, density, and timing in the Fireworks class

### Changing the Challenge

If you'd like to change the balloon pop challenge to one of the other options:

1. Open `index.html` and locate the `<!-- Balloon Pop Challenge -->` section
2. Replace it with one of the alternative challenge options mentioned in the requirements
3. Update the corresponding JavaScript in `js/main.js`

## Credits

- Fonts: Google Fonts (Dancing Script, Montserrat, Poppins)
- Icons: Font Awesome
- Framework: Bootstrap 5
- Confetti Animation: canvas-confetti 