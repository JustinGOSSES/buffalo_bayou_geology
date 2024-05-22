# Digital elevation model (DEM) download based on USGS lidar dataset converted into Relative Elevation Model (REM) and overlaid with faults and river shapefiles

The resulting maps consist of the following parts: 

1. Digital elevation model 
2. Relative elevation model created from the digital elevation model and calculated relative to selected river center lines.
3. Overlays of: 
    - faults
    - buffalo bayou centerline
    - highways


## Digital Elevation Model dataset download description

## Summary 

The digital elevation model or DEM used in this repository (most of which is only on local computer due to size of some of the files)
came from [Open Topography's](https://opentopography.org/) topographic data locator and download tools. 

The dataset itself is sourced from USGS (United Stats Geologic Survey), specifically the 
USGS 1/3 arc-second Digital Elevation Model(USGS10m). More detailed information can be found in the metadata file
`python_data_processing/data/input_rem_data/metadata-rt1716147037733.txt`.
The dataset was download to a bounding box boundary selected in Open Topography's web portal as a tiff file with 
multi-directional hillshade with 20x exaggeration. The hillshade method and exaggeration are user selections.
Boundary edges are Xmin = -96.207303	  Ymin = 29.324906	  Xmax = -94.634402	  Ymax = 30.083256.
The `input_rem_data` directory has the various files that were exported from Open Topography. This includes: 
- A tiff file: [buffaloBayouRegionalV1_USGS10m.tif](data/input_rem_data/buffaloBayouRegionalV1_USGS10m.tif)
- A metadata file that describes what was downloaded from where [metadata-rt1716147037733.txt](data/input_rem_data/metadata-rt1716147037733.txt)
- A raster file [rasters_USGS10m.tar.gz](data/input_rem_data/rasters_USGS10m.tar.gz)
- Zipped version of the kmz [viz.tar.gz](data/input_rem_data/viz.tar.gz)
- KMZ file of the DEM with hillshade that can be dropped into Google Earth Pro [viz.USGS10m_hillshade.kmz](data/input_rem_data/viz.USGS10m_hillshade.kmz)

These are not all pushed into the remote repository on GitHub to avoid slowing down the website that is also in the 
repository. However, all of these files can be found in 
a [google drive folder](https://drive.google.com/drive/folders/1rsUcOLENkj3Mep1P0wf--2rS9FM__Kza?usp=drive_link).



https://portal.opentopography.org/rasterOutput?jobId=rt1716147037733