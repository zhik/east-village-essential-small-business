import 'leaflet-iconmaterial/dist/leaflet.icon-material'
import 'leaflet-iconmaterial/dist/leaflet.icon-material.css'

export default function(overallcategory, subcategory, latlng){
    const icon = L.IconMaterial.icon({
        icon: typeIconLookup(overallcategory, subcategory),
        iconColor: '#ffffff',
        markerColor: 'rgba(64,134,241,0.8)',
        outlineColor: 'rgba(77,77,77,0.71)',
        outlineWidth: 0.5
    });
    return L.marker(latlng, {icon})
}

// export default function(overallcategory, subcategory, latlng){
//     const icon = L.MakiMarkers.icon({icon: typeIconLookup(overallcategory, subcategory), color: "#237aaf", size: "m"});
//     return L.marker(latlng, {icon: icon})
// }

function typeIconLookup(cat, subcat){
    //todo - refactor :)
    const text = cat.trim().toLowerCase();
    const text2 = subcat.trim().toLowerCase()

    //restaurant
    if(text.includes('food') || text.includes('restaurant')){
        if(text2.includes('pizza')) return 'local_pizza'
        if(text2.includes(('burger'))) return 'fast_food'
        return 'restaurant_menu'
    }

    //med
    if(text.includes('health')) {
        if(text2.includes('pharmacy')) return 'local_pharmacy'
        return 'spa'
    }


    //cafe
    if(text.includes('cafe')){
        if(text2.includes('bakery')) return  'cake'
        return 'local_cafe'
    }

    //laundromat
    if(text.includes('laundromat')) return 'local_laundry_service'

    if(text.includes('specialty')){
        if(text2.includes('hardware')) return 'build'
        if(text2.includes('pet')) return 'pet'
        if(text2.includes('wine') || text2.includes('beer')) return 'local_bar'
        if(text2.includes('shipping')) return 'local_shipping'
        return 'redeem'
    }

    return 'storefront'
}