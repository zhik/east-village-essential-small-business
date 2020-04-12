<script>
    import {data, filters} from '../stores'
    import GeneralSearch from './GeneralSearch.svelte'
    import {capitalizeFirstLetter} from '../utils/textFormating'

    //logic for category filters - todo: move to it's own comp
    let overallCategoryItems = []

    $: {
        //init filters
        if ($data && $data.features.length > 0) {
            let unique = new Set($data.features.map(feature => capitalizeFirstLetter(feature.properties.overallcategory)))
            overallCategoryItems = Array.from(unique).filter(item => item.length > 0).map(item => ({
                name: item,
                selected: false
            }))

        }
    }
    //have allCategories be true only if everything else is false
    $: allCategories = overallCategoryItems.every(item => !item.selected)

    function resetCategoryItems() {
        //remove all filters, when all button is clicked
        overallCategoryItems = overallCategoryItems.map(item => {
            item.selected = false;
            return item;
        })
    }

    function toggleCategoryItem(selectedItem) {
        //select one category in the “Categories” section at a time
        overallCategoryItems = overallCategoryItems.map(item => {
            selectedItem.name === item.name ? item.selected = true : item.selected = false;
            return item;
        })
    }

    //logic for option filters  - todo: move to it's own comp
    let optionItems = [
        {
            name: 'Takeout',
            selected: false,
            filter: feature => feature.properties.takeoutyorn.toUpperCase() === 'Y'
        },
        {
            name: 'Delivery',
            selected: false,
            filter: feature => feature.properties.deliveryyorn.toUpperCase() === 'Y'
        },
        {
            name: 'Shipping',
            selected: false,
            filter: feature => feature.properties.shippingyorn.toUpperCase() === 'Y'
        },
    ]

    $: anyOptions = optionItems.every(item => !item.selected)

    function resetOptionItems() {
        optionItems = optionItems.map(item => {
            item.selected = false;
            return item;
        })
    }

    function toggleOptionItem(item) {
        item.selected = !item.selected;
        optionItems = optionItems //update assignment
    }

    //logic for text search
    //todo - add textSearch filter
    let textSearch = ''

    //function to generate filters
    $: {
        const overallCategoryFilter = (feature) => {
            const filterItems = overallCategoryItems.filter(item => item.selected);
            if (filterItems.length) {
                return filterItems.map(item => item.name).includes(capitalizeFirstLetter(feature.properties.overallcategory))
            }
            return true;

        }

        const optionFilter = (feature) => {
            const filterItems = optionItems.filter(item => item.selected);
            if (filterItems.length > 0) {
                return filterItems.every(item => item.filter(feature))
            }
            return true;
        }

        filters.set([overallCategoryFilter, optionFilter])
    }


</script>

<GeneralSearch {textSearch}/>

<div class="filter-header"><h6 class="is-6">Categories:</h6>
    <button class="button is-small {allCategories ? 'is-info' : ''}" on:click={resetCategoryItems}>All</button>
</div>

<div class="filter-container">
    {#each overallCategoryItems as item, name}
        <button class="button is-small {item.selected ? 'is-info' : ''}"
                on:click={toggleCategoryItem(item)}>{item.name}</button>
    {/each}
</div>

<br>
<div class="filter-header"><h6 class="is-6">Options:</h6>
    <button class="button is-small {anyOptions ? 'is-info' : ''}" on:click={resetOptionItems}>Any</button>
</div>
<div class="filter-container">
    {#each optionItems as item, name}
        <button class="button is-small {item.selected ? 'is-info' : ''}"
                on:click={toggleOptionItem(item)}>{item.name}</button>
    {/each}
</div>


<br>
<style>
    .filter-header {
        display: flex;
        flex-direction: row;
        margin-bottom: 0.4rem;
    }

    .filter-header button {
        margin-left: 1rem;
    }

    .filter-container button {
        margin-right: 1rem;
        margin-bottom: 0.2rem;
    }

</style>