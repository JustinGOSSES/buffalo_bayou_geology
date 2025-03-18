const kmlFilePath = "../data/BB_outcrops_022025_kmz_unzipped_images/doc.kml";
const galleryContainer = document.getElementById("gallery-container");

var baseUrl = window.location.protocol + "//" + window.location.host + "/";
var fullUrl = window.location.href;

fetch(kmlFilePath)
    .then(response => response.text())
    .then(kmlText => {
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlText, "text/xml");
        const placemarks = kml.getElementsByTagName("Placemark");

        for (let i = 0; i < placemarks.length; i++) {
            const placemark = placemarks[i];
            const name = placemark.getElementsByTagName("name")[0]?.textContent || "Unnamed";
            const description = placemark.getElementsByTagName("description")[0]?.textContent || "No description available";

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

            // Extract coordinates
            const coordinatesElement = placemark.getElementsByTagName("coordinates")[0];
            const coordinates = coordinatesElement?.textContent.trim().split(",") || [];
            const [lng, lat] = coordinates.map(coord => parseFloat(coord));
            console.log("Extracted coordinates:", lat, lng);

            // Create a gallery item
            const galleryItem = document.createElement("div");
            galleryItem.classList.add("gallery-item");
            galleryItem.style.display = "flex"; // Arrange image and text/map side by side
            galleryItem.style.gap = "20px"; // Add spacing between the image and the other elements

            if (imageUrls.length > 0) {
                imageUrls.forEach(imageUrl => {
                    const img = document.createElement("img");
                    img.src = imageUrl;
                    img.alt = name;
                    img.style.width = "50%"; // Set a fixed width for the image
                    img.style.objectFit = "cover"; // Ensure the image fits nicely
                    galleryItem.appendChild(img);
                });
                console.log("Appended multiple images to galleryItem");
            }
            // No else block needed, it will simply skip adding images if imageUrls is empty

            const contentContainer = document.createElement("div");
            contentContainer.style.display = "flex";
            contentContainer.style.flexDirection = "column"; // Stack text and map vertically
            contentContainer.style.gap = "10px"; // Add spacing between the elements

            const title = document.createElement("h3");
            title.textContent = name;
            title.style.margin = "10px 0"; // Add spacing between elements
            contentContainer.appendChild(title);

            const desc = document.createElement("p");
            desc.innerHTML = constDescriptionWithNoImages //description; // Use innerHTML to preserve any HTML formatting
            desc.style.margin = "10px 0"; // Add spacing between elements
            contentContainer.appendChild(desc);

            // Add a small map if coordinates are available
            if (!isNaN(lat) && !isNaN(lng)) {
                const coordinatesText = document.createElement("p");
                coordinatesText.textContent = `Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                contentContainer.appendChild(coordinatesText);

                const mapContainer = document.createElement("div");
                mapContainer.classList.add("map-container");
                contentContainer.appendChild(mapContainer);

                const map = L.map(mapContainer, {
                    center: [lat, lng],
                    zoom: 15,
                    scrollWheelZoom: false,
                    dragging: false,
                    zoomControl: false,
                });

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                }).addTo(map);

                L.marker([lat, lng]).addTo(map);

                // Fix map offset issue
                setTimeout(() => {
                    map.invalidateSize();
                }, 0);
            }

            galleryItem.appendChild(contentContainer);
            galleryContainer.appendChild(galleryItem);
        }
    })
    .catch(error => {
        console.error("Error loading KML file:", error);
    });
