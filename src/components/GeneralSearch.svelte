<script>
    import { mapView, data, details } from '../stores'
    export let textSearch = ''
    let value = ''
    let searchAddrs = []
    let error = false
    let features = []

    $: if($data && $data.features){
        features = $data.features.sort((a, b) => a.properties.merchantname.localeCompare(b.properties.merchantname))
    }

    let markerLayer = null;

    function _set(addr) {
        //set value to clicked addr , then clear searchAddrs
        if (addr) value = addr.properties.merchantname
        searchAddrs = []

        const coords = addr.geometry.coordinates.slice().reverse() // reverse no side-effects
        $mapView.setView(coords, 18)
        details.set(addr.properties)

        //add marker to map
        if(!markerLayer){
            markerLayer = L.circleMarker(coords, {
                radius: 15,
                fillColor: "#f7ff45",
                color: "#000",
                weight: 0,
                opacity: 1,
                fillOpacity: 0.8
            });
            markerLayer.addTo($mapView);
        }else{
            markerLayer.setLatLng(coords)
        }

    }

    function _search() {
        if (value.length > 0) {
            const matchedFeatures = features.filter(feature => feature.properties.merchantname.toLowerCase().includes(value));
            //todo: remove duplicates
            searchAddrs = matchedFeatures.splice(0,5)
        } else {
            searchAddrs = []
        }
        return true
    }
</script>

<form on:submit|preventDefault="{_set}">
    <div class="field is-horizontal">
        <div class="field-label is-normal">
            <label class="label">Search by name</label>
        </div>
        <div class="field-body">
            <div class="field">
                <div class="control is-expanded">
                    <input
                            id="address"
                            placeholder="Tompkins Square Park"
                            type="text"
                            name="address"
                            bind:value
                            autocomplete="off"
                            on:keyup="{() => {_search(); error = false;}}"
                            class="{!error ? 'input is-fullwidth' : 'input is-fullwidth is-danger'}"
                    />
                </div>
            </div>
            <button type="submit" class="button">Search</button>
        </div>
    </div>
    {#if error}
        <p class="help is-danger">
            No addresses found
        </p>
    {/if}

    <ul>
        {#each searchAddrs as addr}
            <li on:click="{() => _set(addr)}">{addr.properties.merchantname}</li>
        {/each}
    </ul>
</form>

<style>
    form {
        margin-bottom: 1rem;
    }

    #address {
        width: 100%;
        padding: 5px 15px;
        box-sizing: border-box;
        margin-bottom: 5px;
    }

    input[type='submit'] {
        background-color: #6a6a6a;
        border: none;
        color: white;
        padding: 5px 10px;
        text-decoration: none;
        cursor: pointer;
    }

    ul {
        padding-left: 10px;
        color: rgb(61, 61, 61);
        margin: 0px !important;
    }

    li {
        margin-left: 5px;
    }

    li:hover {
        background-color: #f1f1f1;
    }
</style>