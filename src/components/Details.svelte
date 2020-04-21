<script>
    import { _ } from 'svelte-i18n'
    import marked from 'marked';
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
            <p><strong>{$_('details.address')}:</strong> {$details.address}</p>
        </NotEmpty>


        <NotEmpty value={$details.number}>
            <p><strong>#:</strong> <a href="tel:{formatPhoneNumber($details.number)}"
                                      class="">{formatPhoneNumber($details.number)}</a></p>
        </NotEmpty>

        <div class="field is-grouped margin">
            <NotEmpty value={$details.websiteownerrundeliverypreferred}>
                <p><strong><a href="{getValidUrl($details.websiteownerrundeliverypreferred)}"
                              target="_blank">{$_('details.website')}</a></strong></p>
            </NotEmpty>

            <NotEmpty value={$details.instagramfulllinknothandle}>
                <p><strong><a href="{getValidInstagram($details.instagramfulllinknothandle)}"
                              target="_blank">Instagram</a></strong></p>
            </NotEmpty>
        </div>

        <hr/>
        <NotEmpty show={$details.opentime && $details.closetime}>
            <h5 class="is-5">Hours</h5>
            <p><strong>{$_('details.open_time')}</strong> {$details.opentime}</p>
            <p><strong>{$_('details.close_time')}</strong> {$details.closetime}</p>
        </NotEmpty>

        <div class="field is-grouped is-grouped-multiline">
            <div class="control">
                <div class="tags has-addons">
                    <span class="tag">{$_('details.takeout')}</span>
                    <span class="tag {$details.takeoutyorn === 'Y'  ? 'is-success' : 'is-white'}">
                        {$details.takeoutyorn === 'Y' ? 'Yes' : '-'}
                    </span>
                </div>
            </div>


            <div class="control">
                <div class="tags has-addons">
                    <span class="tag">{$_('details.delivery')}</span>
                    <span class="tag {$details.deliveryyorn === 'Y'  ? 'is-success' : 'is-white'}">
                        {$details.deliveryyorn === 'Y' ? 'Yes' : '-'}
                    </span>
                </div>
            </div>

            <NotEmpty value={$details.shippingyorn} show={$details.shippingyorn === 'Y'}>
                <div class="control">
                    <div class="tags has-addons">
                        <span class="tag">{$_('details.shipping')}</span>
                        <span class="tag {$details.shippingyorn === 'Y'  ? 'is-success' : 'is-white'}">
                        {$details.shippingyorn === 'Y' ? 'Yes' : '-'}
                    </span>
                    </div>
                </div>
            </NotEmpty>
        </div>


        <NotEmpty value={$details.notes}>
            <p><strong>{$_('details.notes')}: </strong>{@html marked($details.notes)}</p>
        </NotEmpty>

        {#if $details.buyagiftcardtosupportyourfavoriteevmerchantorganization || $details.supportyourfavoriteevmerchantorganizationsfundraiser}
            <hr>
            <div class="field is-grouped is-grouped-multiline support">
                <div class="tags">
                    {#if $details.buyagiftcardtosupportyourfavoriteevmerchantorganization}
                        <a href="{getValidUrl($details.buyagiftcardtosupportyourfavoriteevmerchantorganization)}"><span
                                target="_blank" class="tag is-link">{$_('details.buy_a_giftcard')}</span></a>
                    {/if}

                    {#if $details.supportyourfavoriteevmerchantorganizationsfundraiser}
                        <a href="{getValidUrl($details.supportyourfavoriteevmerchantorganizationsfundraiser)}"><span
                                target="_blank" class="tag is-link">{$_('details.contribute_to_fundraiser')}</span></a>
                    {/if}
                </div>
            </div>
        {/if}

        <hr>

        <p class="has-text-grey-light">{$_('details.last_updated', {values: { lastUpdated: $details.dateupdated} })} ID: {$details.id}</p>
        <NotEmpty value={$details.sourceofinformationforopenclosedpleaseensurethereisasourceforclosedorgsbusinesses}>
            <p>{@html $_('details.source_link', { values: {
                url: getValidUrl($details.sourceofinformationforopenclosedpleaseensurethereisasourceforclosedorgsbusinesses)
            }})}</p>
        </NotEmpty>
    </div>
{:else}
    <div class="content has-background-ter">
        <h4 class="is-4">{$_('details.click_on_a_point')}</h4>
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