# buffalo_bayou_geology

While this GitHub repository was originally used to hold some quickly built
web pages to display data to help the
Houston Geological Societies working group on Buffalo Bayou Geology better
visualize some of the data, it is now being used additionally as a data repository.

This repository holds outcrops photos from along Buffalo Bayou as well as
some associated well local well locations and fault location information.
Only the outcrop images are whole created by the authors.

The outcrop photos from along Buffalo Bayou in this repository were used in the following publication:

> Patterson, P., Kendall, J., Schwartz, A., Novello, J., Gaston, W., Lang, R., West, D., Gosses, J., & Wachtman, C. (2025). Sedimentology, Sequence Stratigraphy, Diagenesis, and Paleogeographic Reconstruction of the Beaumont Formation, Late Pleistocene, Buffalo Bayou, Houston, Texas. *Houston Geological Society Bulletin*, June 2025. [PDF](https://www.newhgs.org/documents/bulletin_archives/Final%20-6_2_25%20June%20Bulletin.pdf)

## Visualization of where the photos occur 

The photos and locations of faults and wells nearby are visualized in a couple different ways
to make the data easier to consume across different HTML pages that are published
as GitHub pages accessible as a normal webpage.

You can also download, clone, or fork the GitHub repository and work with the data
in any way you want.

### Single large map page use case

This view shows a single map in order to have the most things in view for the user.
Image icons can be clicked and outcrop images, bedding plane strike slip measurements,
and notes will appear as pop-ups.

link: https://justingosses.github.io/buffalo_bayou_geology/large-map.html

### Four smaller linked maps page

This pages has several small maps that are linked such that when you click and drag one
one map to move it or zoom, it does the same on all the maps. Additionally, when you click
on one map, it adds a small red dot where you clicked on all maps. This makes it easier
to track where locations are across the different maps.

- Top-left map starts as: topo map
- Top-right map starts as: geologic map
- Bottom-left map starts as: openstreet map road map.

The bottom-right square shows text from the geologic map where the user has just clicked.

link: https://justingosses.github.io/buffalo_bayou_geology/four-maps.html

### Gallery-style view of all photos page

In this page, all the photos are shown in sequence with their location located
on a mini-map to their right. This makes it easier to see the photo details
and puts less emphasis on their spatial location.

link: https://justingosses.github.io/buffalo_bayou_geology/gallery.html

# Data 

## DOI

The GitHub repository will be given a DOI and an entrace on
[https://zenodo.org/](https://zenodo.org/). This is in progress.

## Data structure

```
buffalo_bayou_geology/
├── index.html              # Homepage with project overview and navigation
├── large-map.html          # Single large interactive map view
├── four-maps.html          # Four synchronized linked maps with info panel
├── gallery.html            # Scrollable photo gallery view
├── old.html                # Legacy version of the visualization page
├── README.md
├── LICENSE
├── package.json
│
├── css/
│   └── main.css            # Shared stylesheet
│
├── js/
│   ├── main.js             # Main JavaScript for map functionality
│   ├── gallery.js          # Gallery page functionality
│   ├── macrostratFetch.js  # Macrostrat API integration
│   ├── L.KML.js            # Leaflet KML parsing extension
│   └── jszip.js            # ZIP file handling library
│
├── data/
│   ├── BB_outcrops_022025_kmz_unzipped_images/
│   │   ├── doc.kml         # KML file with outcrop locations and metadata
│   │   ├── *.jpg           # Outcrop photos
│   │   └── *.png           # Stereonet plots and other diagrams
│   ├── texas_faults.json   # Regional fault traces (GeoJSON)
│   ├── wells_v1.geojson    # Well locations (GeoJSON)
│   └── faults/             # Original fault shapefiles
│
├── icons/                  # Map marker icons
│
└── screen_captures/        # Screenshots for documentation
```

### Material moved elsewhere

The structure of the repository was originally broken into two directories, one
JavaScript for visualization of the images and one Python for creation of a
REM (Relative Elevation Map). 

The `python_data_processing` directory for creation of a REM
(Relative Elevation Map) formed the basis of this
blog post: ["Houston has topography: Looking at why Buffalo Bayou does not drain to the sea, directly"](https://justingosses.com/blog/why-buffalo-bayou-does-not-drain-to-the-sea).
It has since moved to this separate GitHub repository
[https://github.com/JustinGOSSES/buffalo_bayou_geology_REM](https://github.com/JustinGOSSES/buffalo_bayou_geology_REM).

### Data format - KMZ and KML files

Most of the outcrop photos and observational data was originally in a KMZ file.
It has been extracted into a KML folder structure.
Specifically,  we have extracted all photos and observations into the 
`BB_outcrops_022025_kmz_unzipped_images` directory containing all the content that
was originally in the `BB_outcrops_022025.kmz` KMZ file. 

This was necessary as the original KMZ file is basically a zipped up folder with a
large number of images and as a result the file size of that one file exceeded the
one file size limit of GitHub without using LFS (Large file service), which we
didn't want to use as then it makes loading the file with JavaScript annoyingly complex.

You can still (likely) download that KMZ from a Google drive at: _____TODO______


## Data sources

### Geologic Field Data (Outcrops)

Outcrop photos, bedding plane measurements, and lineation data were collected along Buffalo Bayou 
using the Midland Valley Clino structural geology mobile app. Data collection was led by Jerry Kendall 
as part of the Houston Geological Society Buffalo Bayou working group.

The brown lines shown on maps are lineations (topographic alignments) mapped from outcrop observations 
and LIDAR data. Only 2 of these lineaments are associated with known active faults.

### Regional Fault Data

Regional fault traces are from subsurface seismic mapping are shown on some of the maps as
black lines. These faults are mostly not exposed at the surface, so geographic positions should be interpreted as very approximate only.

TOOD---------------

#### Faults with surface geomorphic expression

A map of active surface faults in the Houston area can be found at:
- Shah, S.D. & Lanning-Rush, J. (2005). Principal Faults in the Houston, Texas, Metropolitan Area. 
  U.S. Geological Survey. [ArcGIS Web Map](https://www.arcgis.com/apps/mapviewer/index.html?webmap=e96a9e9e48824c2380c3a9b1e6a0a8c1)
These are slow moving growth faults.

Close evaluaition of bayou path and fault position suggests bayou is only impacted by faults
by small deviations in path by most active modern growth faults and possibly one active salt dome.
Regional level diretion of flow does not seem to correlate with fault positioning.

### Well Data

Well locations are mostly near-surface wells drilled for water supply and geotechnical purposes.
Source data is stored in `data/wells_v1.geojson`.


### Basemaps

- **ESRI National Geographic World Map**: [ArcGIS](https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer)
- **ESRI World Imagery**: [ArcGIS](https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer)
- **OpenStreetMap**: [openstreetmap.org](https://www.openstreetmap.org/)
- **OpenTopoMap**: [opentopomap.org](https://opentopomap.org/) - Topographic maps rendered from OpenStreetMap 
  and SRTM data. Created by Stefan Erhardt (derstefan) and contributors. Tiles licensed under 
  [CC-BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Source code available at 
  [GitHub](https://github.com/der-stefan/OpenTopoMap).
- **Macrostrat Geologic Map**: [macrostrat.org](https://macrostrat.org/) - Geologic map tiles and API 
  for querying geologic units at clicked locations. Citation: Peters, S.E., Husson, J.M., & Czaplewski, J. (2018). 
  Macrostrat: A Platform for Geological Data Integration and Deep-Time Earth Crust Research. 
  *Geochemistry, Geophysics, Geosystems*, 19(4), 1393-1409. [https://doi.org/10.1029/2018GC007467](https://doi.org/10.1029/2018GC007467)

### Street-level images
- **Google Street View**: [Google Maps Platform](https://developers.google.com/maps/documentation/streetview/overview)

## Contributing 

This repository is still in flux as more information from google drives is moved here.
However, the eventual plan is to have this repository be at some point a fixed archive.

### Communication 

Please reach out to the authors of the publication linked above that were part
of the Houston Geology Association Buffalo Bayou for questionson the science.
You can leave a question as a repository issue as well, but there may noot be anyone
monitoring it, so do not expect a quick response.

