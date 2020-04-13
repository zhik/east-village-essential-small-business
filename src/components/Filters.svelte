<script>
    import {data, filters} from '../stores'
    import GeneralSearch from './GeneralSearch.svelte'
    import {capitalizeFirstLetter} from '../utils/textFormating'
    import CategoryFilter from './filters/CategoryFilter.svelte'
    import OptionFilter from './filters/OptionFilter.svelte'

    let overallCategoryItems = []
    let subCategoryItems = []
    let textSearch = '' //todo - add textSearch filter

    $: {
        //init filters
        if ($data && $data.features.length > 0) {
            const categories = new Set($data.features.map(feature => capitalizeFirstLetter(feature.properties.overallcategory)))
            const unique = Array.from(categories).sort()
            overallCategoryItems = unique.filter(item => item.length > 0).map(item => ({
                name: item,
                selected: false
            }))

        }
    }


    //update subCategories
    $: {
        if ($data && overallCategoryItems.length > 0) {
            const overallCategory = overallCategoryItems.find(item => item.selected);
            if (overallCategory) {
                //get subCategories for the selected overallCategory
                const subCategories = $data.features.filter(feature => capitalizeFirstLetter(feature.properties.overallcategory) === overallCategory.name)
                        .map(feature => capitalizeFirstLetter(feature.properties.subcategory))
                //filter for unique items
                const unique = Array.from(new Set(subCategories)).sort()
                subCategoryItems = unique.filter(item => item.length > 0).map(item => ({
                    name: item,
                    selected: false
                }))
            } else {
                subCategoryItems = []
            }
        }
    }

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


    //function to generate filters
    $: {
        const overallCategoryFilter = (feature) => {
            const filterItems = overallCategoryItems.filter(item => item.selected);
            if (filterItems.length) {
                return filterItems.map(item => item.name).includes(capitalizeFirstLetter(feature.properties.overallcategory))
            }
            return true;

        }

        const subCategoryFilter = (feature) => {
            const filterItems = subCategoryItems.filter(item => item.selected);
            if (filterItems.length) {
                return filterItems.map(item => item.name).includes(capitalizeFirstLetter(feature.properties.subcategory))
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

        filters.set([overallCategoryFilter,subCategoryFilter, optionFilter])
    }


</script>

<GeneralSearch {textSearch}/>

<CategoryFilter name="Categories" categories={overallCategoryItems} on:update={e => overallCategoryItems = e.detail}/>

<br>

<CategoryFilter name="Sub-Categories" categories={subCategoryItems} showAfter={1} on:update={e => subCategoryItems = e.detail}/>

<br>

<OptionFilter name="Options" options={optionItems} on:update={e => optionItems = e.detail}/>

<br>
