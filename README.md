# buffalo_bayou_geology

While this GitHubrepository was originally used to hold some quickly built
web pages to display data to help the
Houston Geological Societies working group on Buffalo Bayou Geology better
visualize some of the data, it is now being used additionally as a data repository.

This repository holds outcrops photos from along Buffalo Bayou as well as
some associated well local log locations and faults. Only the images are whole
created by the authors.

The outcrop photos along Buffalo Bayou were used in the following publication:

> Patterson, P., Kendall, J., Schwartz, A., Novello, J., Gaston, W., Lang, R., West, D., Gosses, J., & Wachtman, C. (2025). Sedimentology, Sequence Stratigraphy, Diagenesis, and Paleogeographic Reconstruction of the Beaumont Formation, Late Pleistocene, Buffalo Bayou, Houston, Texas. *Houston Geological Society Bulletin*, June 2025. [PDF](https://www.newhgs.org/documents/bulletin_archives/Final%20-6_2_25%20June%20Bulletin.pdf)

The GitHub repository will be given a DOI and an entrace on
[https://zenodo.org/](https://zenodo.org/).

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

## Some data comes from a kmz

Within that folder for the website, most of the data is in the `data` directory
with `BB_outcrops_022025_kmz_unzipped_images` directory containing all the content that
was originally in the `BB_outcrops_022025.kmz` KMZ file but extracted into its own folder.
This was necessary as the original KMZ file is basically a zipped up folder with a
large number of images and as a result the file size of that one file exceeded the
one file size limit of GitHub without using LFS (Large file service), which we
didn't want to use as then it makes loading the file with JavaScript annoyingly complex.

You can still (likely) download that KMZ from a Google drive at: _____TODO______

## Material moved elsewhere

The structure of the repository was originally broken into two directories, one
JavaScript for visualization of the images and one Python for creation of a
REM (Relative Elevation Map). 

The `python_data_processing` directory for creation of a REM
(Relative Elevation Map) formed the basis of this
blog post: ["Houston has topography: Looking at why Buffalo Bayou does not drain to the sea, directly"](https://justingosses.com/blog/why-buffalo-bayou-does-not-drain-to-the-sea).
It has since moved to this separate GitHub repository
[https://github.com/JustinGOSSES/buffalo_bayou_geology_REM](https://github.com/JustinGOSSES/buffalo_bayou_geology_REM).

## Contributing 

This repository is still in flux as more information from google drives is moved here.
However, the eventual plan is to have this repository be at some point archived.

### Communication 

Please reach out to the authors of the publication linked above that were part
of the Houston Geology Association Buffalo Bayou for questionson the science.
You can leave a question as a repository issue as well, but there may noot be anyone
monitoring it, so do not expect a quick response.

## Data sources

____TODO____