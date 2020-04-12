<script>
    import {details} from '../stores'
    import getValidUrl from '../utils/getValidUrl'
    import {formatPhoneNumber} from '../utils/textFormating'

</script>

{#if $details}
    <div class="content has-background-ter">
        <h4 class="is-4">{$details.merchantname}</h4>
        <p><strong>{$details.overallcategory}</strong> - {$details.subcategory}</p>
        <hr/>
        <p><strong>Address:</strong> {$details.address}</p>
        <p><strong>#:</strong> <a href="tel:{formatPhoneNumber($details.number)}" class="">{formatPhoneNumber($details.number)}</a></p>
        {#if $details.websiteownerrundeliverypreferred}
            <p><strong><a href="{getValidUrl($details.websiteownerrundeliverypreferred)}"
                          target="_blank">Website</a></strong></p>
        {/if}
        <hr/>
        <h5 class="is-5">Hours</h5>
        <p><strong>Open Time:</strong> {$details.opentime}</p>
        <p><strong>Close Time:</strong> {$details.closetime}</p>

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

            <div class="control">
                <div class="tags has-addons">
                    <span class="tag">Shipping</span>
                    <span class="tag {$details.shippingyorn === 'Y'  ? 'is-success' : 'is-white'}">
                        {$details.shippingyorn === 'Y' ? 'Yes' : '-'}
                    </span>
                </div>
            </div>
        </div>

        <p><strong>Notes: </strong>{$details.notes}</p>

        {#if $details.buyagiftcardtosupportyourfavoriteevmerchantorganization || $details.supportyourfavoriteevmerchantorganizationsfundraiser}
            <hr>
            <div class="field is-grouped is-grouped-multiline">
                <div class="tags">
                    {#if $details.buyagiftcardtosupportyourfavoriteevmerchantorganization}
                        <a href="{$details.buyagiftcardtosupportyourfavoriteevmerchantorganization}"><span
                                class="tag is-link">Buy a GIFTCARD to support this business!</span></a>
                    {/if}

                    {#if $details.supportyourfavoriteevmerchantorganizationsfundraiser}
                        <a hremail
                           f="{$details.supportyourfavoriteevmerchantorganizationsfundraiser}"><span
                                class="tag is-link">Contribute to this business's FUNDRAISER</span></a>
                    {/if}
                </div>
            </div>

        {/if}

        <hr>

        <p class="has-text-grey-light">Last Updated: {$details.dateupdated} ID: {$details.id}</p>
        {#if $details.sourceofinformationforopenclosedpleaseensurethereisasourceforclosedorgsbusinesses}
            <p>Source: <a
                    href="{$details.sourceofinformationforopenclosedpleaseensurethereisasourceforclosedorgsbusinesses}">Click
                here</a></p>
        {/if}
    </div>
{:else}
    <div class="content has-background-ter">
        <h4 class="is-4">Click on a point for more details</h4>
    </div>
{/if}



        <!--{#if $isDetailsOpen && data}-->

<!--    <div class="content has-background-ter">-->
<!--        <h4 class="is-4">Feature Details</h4>-->
<!--        <p><strong>Name:</strong> {data.name}</p>-->
<!--        <p><strong>Address:</strong> {data.address}</p>-->
<!--        <p><strong>Data Source:</strong> {data.source}</p>-->


<!--        <div class="field is-grouped is-grouped-multiline">-->
<!--            <div class="control">-->
<!--                <div class="tags has-addons">-->
<!--                    <span class="tag">Status</span>-->
<!--                    <span class="tag {statusColor}">{status}</span>-->
<!--                </div>-->
<!--            </div>-->

<!--            <div class="control">-->
<!--                <div class="tags has-addons">-->
<!--                    <span class="tag">Accommodation hours</span>-->
<!--                    <span class="tag is-success {data.are_there_special_hours_ ? 'is-success' : 'is-warning'}">-->
<!--                        {data.are_there_special_hours_ ? 'Yes' : '-'}-->
<!--                    </span>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

<!--        <Hours text="Normal Hours" hours={data.normal_hours}/>-->
<!--        <Hours text="Special accommodation hours" hours={data.accommodation_hours}/>-->

<!--        <div class="field is-grouped is-grouped-multiline">-->
<!--            <div class="control">-->
<!--                <div class="tags has-addons">-->
<!--                    <span class="tag">Pickup</span>-->
<!--                    <span class="tag is-success {data.pickup_orders_ ? 'is-success' : 'is-warning'}">-->
<!--                        {data.pickup_orders_ ? 'Yes' : '-'}-->
<!--                    </span>-->
<!--                </div>-->
<!--            </div>-->

<!--            <div class="control">-->
<!--                <div class="tags has-addons">-->
<!--                    <span class="tag">Delivery</span>-->
<!--                    <span class="tag is-success {data.delivery_ ? 'is-success' : 'is-warning'}">-->
<!--                        {data.delivery_ ? 'Yes' : '-'}-->
<!--                    </span>-->
<!--                </div>-->
<!--            </div>-->

<!--            <div class="control">-->
<!--                <div class="tags has-addons">-->
<!--                    <span class="tag">SNAP/EBT/WIC</span>-->
<!--                    <span class="tag is-success {data.snap_ebt_wic ? 'is-success' : 'is-warning'}">-->
<!--                        {data.snap_ebt_wic ? 'Yes' : '-'}-->
<!--                    </span>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

<!--        {#if data.delivery_pick_up_notes}-->
<!--            <p><strong>Pickup/Delivery Notes: </strong>{data.delivery_pick_up_notes}</p>-->
<!--        {/if}-->

<!--        {#if data.contact_info}-->
<!--            <p><strong>Contact info: </strong>{data.contact_info}</p>-->
<!--        {/if}-->

<!--        {#if data.other_notes}-->
<!--            <p><strong>Notes: </strong>{data.other_notes}</p>-->
<!--        {/if}-->

<!--        <p class="has-text-grey-light">Last Updated: {data.last_updated}</p>-->
<!--    </div>-->
<!--{/if}-->

<style>
    .content {
        padding: 0.5rem 0.5rem;
    }
</style>