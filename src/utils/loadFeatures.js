import getIcons  from "./getIcons";

function loadFeatures(db) {
    const validFeatures = db.filter(feature => feature.longitude && feature.latitude)
    
    const openFeatures = validFeatures.filter(feature => {
        const status = feature["openfortakeoutordeliveryorshippingynunknown-autopopulatesdonotfilloutplease"]
        return !['Unknown','Closed'].includes(status)
    })
    console.log(`${openFeatures.length} rows loaded.`)

    const features = openFeatures.map(feature => {
        //generate icon
        const lnglat = [+feature.longitude, +feature.latitude]
        const latlng = lnglat.slice().reverse()
        const icon = getIcons(feature.overallcategory, feature.subcategory, latlng)

        return {
            "type": "Feature",
            "properties": {
                ...feature,
                icon
            },
            "geometry": {
                "type": "Point",
                "coordinates": lnglat
            }
        }
    })

    return features
}

export default loadFeatures;

