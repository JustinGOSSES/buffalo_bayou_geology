
var kmlFilePath = "/data/BB_outcrops_022025_kmz_unzipped_images/doc.kml";

var baseUrl = window.location.protocol + "//" + window.location.host + "/";
var fullUrl = window.location.href;

// Adjust fullUrl for GitHub Pages deployment
kmlFilePath  = window.location.href.includes("github.io")
? "https://justingosses.github.io/buffalo_bayou_geology/data/BB_outcrops_022025_kmz_unzipped_images/doc.kml"
: kmlFilePath

baseUrl  = window.location.href.includes("github.io")
? "https://justingosses.github.io/buffalo_bayou_geology/"
: baseUrl


const galleryContainer = document.getElementById("gallery-container");

fetch(kmlFilePath)
    .then(response => response.text())
    .then(kmlText => {
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlText, "text/xml");
        const placemarks = kml.getElementsByTagName("Placemark");

        // Convert to array and extract data with coordinates for sorting
        const placemarkData = [];
        for (let i = 0; i < placemarks.length; i++) {
            const placemark = placemarks[i];
            const name = placemark.getElementsByTagName("name")[0]?.textContent || "Unnamed";
            const description = placemark.getElementsByTagName("description")[0]?.textContent || "No description available";
            
            // Extract coordinates
            const coordinatesElement = placemark.getElementsByTagName("coordinates")[0];
            const coordinates = coordinatesElement?.textContent.trim().split(",") || [];
            const [lng, lat] = coordinates.map(coord => parseFloat(coord));
            
            placemarkData.push({ name, description, lat, lng, index: i });
        }

        // Sort by longitude west to east (ascending, since more negative = further west)
        placemarkData.sort((a, b) => a.lng - b.lng);

        // Process sorted placemarks
        placemarkData.forEach((data, i) => {
            const { name, description, lat, lng } = data;

            var imageUrls = [];
            if (name == "Image") {
                // Extract image URLs from description if it contains images
                const imageUrlMatches = description.match(/<img.*?src=["'](.*?)["']/g);
                if (imageUrlMatches) {
                    imageUrls = imageUrlMatches.map(match => {
                        const urlMatch = match.match(/src=["'](.*?)["']/);
                        return urlMatch ? baseUrl + '/data/BB_outcrops_022025_kmz_unzipped_images/' + urlMatch[1] : null;
                    }).filter(url => url !== null);
                }
            }

            var constDescriptionWithNoImages = description.replace(/<img.*?src=["'](.*?)["'].*?>/g, "");
            constDescriptionWithNoImages = constDescriptionWithNoImages.replace(/height=["']300["']/g, "");

            console.log("Sorted coordinates:", lat, lng);

            // Create a gallery item
            const galleryItem = document.createElement("div");
            galleryItem.classList.add("gallery-item");
            
            // Mark whether this item has images
            const hasImages = imageUrls.length > 0;
            galleryItem.dataset.hasImages = hasImages;

            if (imageUrls.length > 0) {
                imageUrls.forEach(imageUrl => {
                    const img = document.createElement("img");
                    img.src = imageUrl;
                    img.alt = name;
                    galleryItem.appendChild(img);
                });
                console.log("Appended multiple images to galleryItem");
            }
            // No else block needed, it will simply skip adding images if imageUrls is empty

            const contentContainer = document.createElement("div");
            contentContainer.classList.add("content-container");

            const title = document.createElement("h3");
            title.textContent = name;
            contentContainer.appendChild(title);

            const desc = document.createElement("p");
            desc.innerHTML = constDescriptionWithNoImages //description; // Use innerHTML to preserve any HTML formatting
            contentContainer.appendChild(desc);

            // Add a small map if coordinates are available
            if (!isNaN(lat) && !isNaN(lng)) {
                const coordinatesText = document.createElement("p");
                coordinatesText.classList.add("coordinates");
                coordinatesText.textContent = `📍 Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                contentContainer.appendChild(coordinatesText);

                const mapContainer = document.createElement("div");
                mapContainer.classList.add("map-container");
                // Set explicit dimensions directly on the element
                mapContainer.style.width = "100%";
                mapContainer.style.height = "200px";
                contentContainer.appendChild(mapContainer);

                // Use a unique ID for the map container
                const mapId = "map-" + i;
                mapContainer.id = mapId;

                // Create map after element is in the DOM
                galleryItem.appendChild(contentContainer);
                galleryContainer.appendChild(galleryItem);

                // Initialize map after DOM insertion
                requestAnimationFrame(() => {
                    const map = L.map(mapId, {
                        center: [lat, lng],
                        zoom: 15,
                        scrollWheelZoom: false,
                        dragging: false,
                        zoomControl: false,
                    });

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 18,
                        attribution: '&copy; OpenStreetMap',
                    }).addTo(map);

                    L.marker([lat, lng]).addTo(map);

                    // Force a resize after tiles have a chance to load
                    setTimeout(() => {
                        map.invalidateSize();
                    }, 250);
                });
            } else {
                galleryItem.appendChild(contentContainer);
                galleryContainer.appendChild(galleryItem);
            }
        });
    })
    .then(() => {
        // Set up filter toggle after gallery is loaded
        const toggle = document.getElementById('images-only-toggle');
        const itemCount = document.getElementById('item-count');
        
        function updateFilter() {
            const showImagesOnly = toggle.checked;
            const items = document.querySelectorAll('.gallery-item');
            let visibleCount = 0;
            let totalImages = 0;
            
            items.forEach(item => {
                const hasImages = item.dataset.hasImages === 'true';
                if (hasImages) totalImages++;
                
                if (showImagesOnly && !hasImages) {
                    item.classList.add('hidden');
                } else {
                    item.classList.remove('hidden');
                    visibleCount++;
                }
            });
            
            itemCount.textContent = showImagesOnly 
                ? `Showing ${visibleCount} items with images`
                : `Showing all ${visibleCount} items (${totalImages} with images)`;
        }
        
        toggle.addEventListener('change', updateFilter);
        updateFilter(); // Initial count
    })
    .catch(error => {
        console.error("Error loading KML file:", error);
        galleryContainer.innerHTML = '<div class="loading" style="color: #ff6b6b;">Error loading gallery data. Please try refreshing the page.</div>';
    });
