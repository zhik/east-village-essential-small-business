import ICONS from './icons'

const defaultIconOptions = {
    shadowUrl: './icons/shadow.png',
    iconSize:     [28.8, 33.3], // size of the icon
    shadowSize:   [45.9 ,33.3], // size of the shadow
    iconAnchor:   [15, 25], // point of the icon which will correspond to marker's location
    shadowAnchor: [15, 25],  // the same for the shadow
    popupAnchor:  [0, -14] // point from which the popup should open relative to the iconAnchor
}

const CUSTOM_ICONS = ICONS.map(icon => {
    return {
        overallcategory: icon[0],
        subcategory: icon[1],
        iconName: icon[2],
        icon: L.icon({
            iconUrl: `./icons/${icon[2]}.png`,
            ...defaultIconOptions
        })
    }
})

export default function(overall, sub, latlng){
    const icon = iconLookup(overall, sub)
    return L.marker(latlng, {icon})
}



function iconLookup(overall, sub){
    let iconMatch = null;

    const overall_lower = overall.trim().toLowerCase();
    const sub_lower = sub.trim().toLowerCase()

    const match = CUSTOM_ICONS.find(icon => icon.overallcategory === overall_lower && icon.subcategory === sub_lower)

    if(match){
        return match.icon
    }

    //default icons
    if(!iconMatch){
        switch(overall_lower){
            case 'dessert':
                return L.icon({
                    iconUrl: './icons/patisserie.png',
                    ...defaultIconOptions
                })
            case 'groceries':
                return L.icon({
                    iconUrl: './icons/supermarket.png',
                    ...defaultIconOptions
                })
            case 'health':
                return L.icon({
                    iconUrl: './icons/leaf.png',
                    ...defaultIconOptions
                })
            case 'restaurants':
                return L.icon({
                    iconUrl: './icons/food.png',
                    ...defaultIconOptions
                })
            case 'retail':
                return L.icon({
                    iconUrl: './icons/retail.png',
                    ...defaultIconOptions
                })
            case 'shops & services':
                return L.icon({
                    iconUrl: './icons/shop.png',
                    ...defaultIconOptions
                })
            case 'free food':
                return L.icon({
                    iconUrl: './icons/hotfood.png',
                    ...defaultIconOptions
                })
            default:
                return L.icon({
                    iconUrl: './icons/blank.png',
                    ...defaultIconOptions
                })
        }
    }
}