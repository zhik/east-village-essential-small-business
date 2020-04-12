<script>
    import {onMount} from 'svelte'
    import {data} from './stores'
    import 'bulma/css/bulma.css'
    import loadFeatures from './utils/loadFeatures'

    import Footer from './components/Footer.svelte'
    import MapView from './components/MapView.svelte'
    import LoadingIndicator from './components/LoadingIndicator.svelte'
    import Details from './components/Details.svelte'
    import Filters from './components/Filters.svelte'

    onMount(() => {
        (async () => {
            // Load the data from the Drive Spreadsheet
            const db = await drive("1Z3pNCmtJhVNwo_tJDnb1i_qAsxYEglRPN9lztTATIVM");
            data.set({"type": "FeatureCollection", features: loadFeatures(db)})
        })();
    })
</script>

<main>
    <Filters/>
    <div class="panel">
        <div class="panel-left">
            {#if !$data}
                <LoadingIndicator/>
            {:else}
                <Details/>
            {/if}
        </div>
        <div class="panel-right">
            <MapView/>
        </div>
    </div>
    <!--        <Footer/>-->
</main>

<style>
    main {
        margin: 40px auto;
        max-width: 1500px;
        color: #444;
        padding: 0 10px;
    }

    .panel {
        display: flex;
        flex-wrap: wrap;
        min-height: 600px;
    }

    .panel-left {
        flex: 1 1 300px;
        padding: 1rem;
    }

    .panel-right {
        flex: 1 1 340px;
        min-width: 340px;
        min-height: 500px;
    }

    :global(.is-1, .is-2, .is-3, .is-4, .is-5, .is-6, .is-7) {
        font-family: 'Merriweather', serif;
    }

    .info {
        padding: 0.5rem 1rem;
        margin-bottom: 1rem;
    }

</style>
