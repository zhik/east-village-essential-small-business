<script>
    import {details} from '../stores'
    import NotEmpty from './details/NotEmpty.svelte'
    import {getValidUrl, getValidInstagram} from '../utils/getValidUrl'
    import {formatPhoneNumber} from '../utils/textFormating'
</script>

{#if $details}
    <div class="content has-background-ter">
        <h4 class="is-4">{$details.merchantname}</h4>
        <p><strong>{$details.overallcategory}</strong> - {$details.subcategory}</p>
        <hr/>

        <NotEmpty value={$details.address}>
            <p><strong>Address:</strong> {$details.address}</p>
        </NotEmpty>


        <NotEmpty value={$details.number}>
            <p><strong>#:</strong> <a href="tel:{formatPhoneNumber($details.number)}"
                                      class="">{formatPhoneNumber($details.number)}</a></p>
        </NotEmpty>

        <div class="field is-grouped margin">
            <NotEmpty value={$details.websiteownerrundeliverypreferred}>
                <p><strong><a href="{getValidUrl($details.websiteownerrundeliverypreferred)}"
                              target="_blank">Website</a></strong></p>
            </NotEmpty>

            <NotEmpty value={$details.instagramfulllinknothandle}>
                <p><strong><a href="{getValidInstagram($details.instagramfulllinknothandle)}"
                              target="_blank">Instagram</a></strong></p>
            </NotEmpty>
        </div>

        <hr/>
        <NotEmpty show={$details.opentime && $details.closetime}>
            <h5 class="is-5">Hours</h5>
            <p><strong>Open Time:</strong> {$details.opentime}</p>
            <p><strong>Close Time:</strong> {$details.closetime}</p>
        </NotEmpty>

        <div class="field is-grouped is-grouped-multiline">
            <div class="control">
                <div class="tags has-addons">
                    <span class="tag">Takeout</span>
                    <span class="tag {$details.takeoutyorn === 'Y'  ? 'is-success' : 'is-white'}">
                        {$details.takeoutyorn === 'Y' ? 'Yes' : '-'}
                    </span>
                </div>
            </div>


            <div class="control">
                <div class="tags has-addons">
                    <span class="tag">Delivery</span>
                    <span class="tag {$details.deliveryyorn === 'Y'  ? 'is-success' : 'is-white'}">
                        {$details.deliveryyorn === 'Y' ? 'Yes' : '-'}
                    </span>
                </div>
            </div>

            <NotEmpty value={$details.shippingyorn} show={$details.shippingyorn === 'Y'}>
                <div class="control">
                    <div class="tags has-addons">
                        <span class="tag">Shipping</span>
                        <span class="tag {$details.shippingyorn === 'Y'  ? 'is-success' : 'is-white'}">
                        {$details.shippingyorn === 'Y' ? 'Yes' : '-'}
                    </span>
                    </div>
                </div>
            </NotEmpty>
        </div>


        <NotEmpty value={$details.notes}>
            <p><strong>Notes: </strong>{$details.notes}</p>
        </NotEmpty>

        {#if $details.buyagiftcardtosupportyourfavoriteevmerchantorganization || $details.supportyourfavoriteevmerchantorganizationsfundraiser}
            <hr>
            <div class="field is-grouped is-grouped-multiline support">
                <div class="tags">
                    {#if $details.buyagiftcardtosupportyourfavoriteevmerchantorganization}
                        <a href="{getValidUrl($details.buyagiftcardtosupportyourfavoriteevmerchantorganization)}"><span
                                target="_blank" class="tag is-link">Buy a GIFTCARD to support this business!</span></a>
                    {/if}

                    {#if $details.supportyourfavoriteevmerchantorganizationsfundraiser}
                        <a href="{getValidUrl($details.supportyourfavoriteevmerchantorganizationsfundraiser)}"><span
                                target="_blank" class="tag is-link">Contribute to this business's FUNDRAISER!</span></a>
                    {/if}
                </div>
            </div>
        {/if}

        <hr>

        <p class="has-text-grey-light">Last Updated: {$details.dateupdated} ID: {$details.id}</p>
        <NotEmpty value={$details.sourceofinformationforopenclosedpleaseensurethereisasourceforclosedorgsbusinesses}>
            <p>Source: <a
                    href="{getValidUrl($details.sourceofinformationforopenclosedpleaseensurethereisasourceforclosedorgsbusinesses)}"
                    target="_blank">Click
                here</a></p>
        </NotEmpty>
    </div>
{:else}
    <div class="content has-background-ter">
        <h4 class="is-4">Click on a point for more details</h4>
    </div>
{/if}


<style>
    .content {
        padding: 0.5rem 0.5rem;
    }

    .margin p {
        margin-right: 1rem;
    }

    .support .tag {
        margin-right: 5px;
    }
</style>