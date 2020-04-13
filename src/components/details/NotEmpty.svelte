<script>
    const EMPTY_VALUES = ['none']
    export let value = '';
    export let show = false;
    $: empty = value.trim().length === 0 || EMPTY_VALUES.includes(value.trim().toLowerCase());

</script>

{#if !empty || show}
    <slot></slot>
{/if}