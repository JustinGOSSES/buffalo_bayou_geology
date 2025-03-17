# buffalo_bayou_geology
A series of maps for sharing geologic data related to Buffalo Bayou in Houston Texas

This is an early in development project that is currently only for 
purposes of helping members of the Houston Geological Societies working group on 
Buffalo Bayou Geology.

Full licenses, copyright, and citation details are in progress!

## Contributing 

Please reach out through the Houston Geology Association Buffalo Bayou working group to contribute.

# Structure

The structure of the repository is largely broken into two directories. 

The `python_data_processing` directory was mostly used for python-based processing
of elevation data to create REM (Relative elevation maps) that formed the basis
of this blog post about 
["Houston has topography: Looking at why Buffalo Bayou does not drain to the sea, directly"](https://justingosses.com/blog/why-buffalo-bayou-does-not-drain-to-the-sea).

The directory `website_javascript` forms the webpage in development at
[https://justingosses.github.io/buffalo_bayou_geology/website_javascript/](https://justingosses.github.io/buffalo_bayou_geology/website_javascript/)
whose goal is to show some of the data that has been collected about the geology
of Buffalo Bayou. The basic interactive connected maps approach is copied from
previous JavaScript map code written for [LAGDAL](https://github.com/JustinGOSSES/LAGDAL).

Within that folder for the website, most of the data is in the `data` directory
with `BB_outcrops_022025_kmz_unzipped_images` directory containing all the content that
was originally in the `BB_outcrops_022025.kmz` KMZ file but extracted into its own folder.
This was necessary as the original KMZ file is basically a zipped up folder with a
large number of images and as a result the file size of that one file exceeded the
one file size limit of GitHub without using LFS (Large file service), which we
didn't want to use as then it makes loading the file with JavaScript annoying complex.

## Roadmap

1. Consolidate and clean up the number of maps.
2. Create another view of the images that is just photos in order to make it easier to see downstream changes without having to click to open each one.
3. Add in repository documentation in preparation for making it more of a data resource for others.
4. Get dates and time of when pictures were taken so I can find gage height at shepard and add that to metadata for the pictures as that's useful information.


