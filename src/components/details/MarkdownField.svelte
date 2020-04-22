<script>
    import marked from 'marked';
    import NotEmpty from './NotEmpty.svelte'

    export let title = ''
    export let content = ''
    export let hideWhenEmpty = true

</script>

{#if hideWhenEmpty }
    <NotEmpty value={content}>
        <p><strong>{title}: </strong>{@html marked(content)}</p>
    </NotEmpty>
{:else}
    <p><strong>{title}: </strong>{@html marked(content)}</p>
{/if}