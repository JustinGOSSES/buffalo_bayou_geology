from riverrem.REMMaker import REMMaker
# provide the DEM file path and desired output directory
rem_maker = REMMaker(dem='../data/input_rem_data/buffaloBayouRegionalV4_USGS10m.tif', out_dir='../data/output_rem_data/v3/', centerline_shp='../data/combined_BrazosBuffaloBayou.shp')
# create an REM
rem_maker.make_rem()
# create an REM visualization with the given colormap
rem_maker.make_rem_viz(cmap='mako_r')

# /Users/justingosses/Code/river-maps-experiments/Data-Exploration-4/buffaloBayouTestGeojson.geojson
# ../data/BuffaloBayouLineFromNHDJoined.shp