<script>
    import marked from 'marked';

    export let title = ''
    export let content = ''
    export let isEmpty = content.trim().length === 0

</script>

{#if isEmpty }

{:else}
    <p><strong>{title}: </strong>{@html marked(content)}</p>
{/if}