## Modify Image Display in pokepay.html

### Current State

* Lines 956-958 display a single centered image with 70% width and height

### Required Changes

1. **Display two images side by side** instead of one
2. **Left image**: Keep the existing image (`pokepay-cover.png`)
3. **Right image**: Add the new image (`photo_2026-01-19_13-57-29.jpg`)
4. **Equal height**: Ensure both images have the same height
5. **Magnifying glass**: Add a zoom button for the right image

### Implementation Steps

1. Replace the current single image container with a flexbox container
2. Add both images inside the container
3. Set consistent height for both images
4. Add a magnifying glass button overlay to the right image
5. Implement basic zoom functionality using JavaScript or CSS

### Expected Result

* Two images displayed side by side with equal height

* Right image has a magnifying glass button that allows zooming in

* Layout remains responsive and visually appealing

