<script>
    import {onMount} from 'svelte'
    import {mapView, data, details, filters} from '../stores'
    import getIcons from '../utils/getIcons'

    let container
    let map
    let layer

    function generateLayer(data, filter = () => true){
        return L.geoJSON(data, {
            pointToLayer: (feature, latlng) => getIcons(feature.properties.overallcategory, feature.properties.subcategory, latlng),
            onEachFeature: (feature, layer) => {
                const {merchantname, overallcategory} = feature.properties
                layer.bindPopup(`<p><strong>${merchantname}</strong></p><p>${overallcategory}</p>`)
                layer.on('click', () => details.set(feature.properties))
            },
            filter
        })
    }

    onMount(() => {
        const maxZoom = 20

        map = L.map(container, {maxZoom}).setView([40.7268, -73.9835], 15)
        // map.scrollWheelZoom.disable()

        L.tileLayer(
                'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/light_all/{z}/{x}/{y}{r}.png',
                {maxZoom}
        ).addTo(map)

        //add map to store
        mapView.set(map)
    })

    $: if (map && $data) {
        layer = generateLayer($data).addTo(map);
    }

    $: {
        if(map && layer){
            //update layer when filter functions changes
            map.removeLayer(layer);
            layer = generateLayer($data, feature => $filters.every(filter => filter(feature))).addTo(map);
            layer.addTo(map);
        }
    }


</script>

<div id="map" bind:this="{container}"></div>

<style>
    #map {
        width: 100%;
        height: 100%;
    }

    :global(.awesome-marker i) {
        font-size: 4px;
    }
</style>