<script>
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import SiSpinrilla from 'svelte-icons-pack/si/SiSpinrilla';
  import { afterUpdate, createEventDispatcher } from 'svelte';

  export let triplet; 

  const dispatch = createEventDispatcher();

  let numLoaded = 0;

  afterUpdate(() => {
    numLoaded = 0;
  });

  // Runs file downloads through the server-side proxy
  const getDownloadUrl = url => triplet.proxy ? `/api/proxy?url=${url}` : url;

  const onload = () => {
    numLoaded = numLoaded + 1;

    if (numLoaded === 3)
      dispatch('loaded');
  }
</script>

<div class="triplet-container">
  <div class="triplet-image">
    <Icon src={SiSpinrilla} />
    {#if triplet}
      <img 
        src={getDownloadUrl(triplet.anchor.image)} 
        alt="Reference" 
        on:load={onload} />
    {/if}
  </div>

  <div class="triplet-image">
    <Icon src={SiSpinrilla} />
    {#if triplet}
      <img 
        src={getDownloadUrl(triplet.similar.image)} 
        alt="Similar" 
        on:load={onload} />
    {/if}
  </div>

  <div class="triplet-image">
    <Icon src={SiSpinrilla} />
    {#if triplet}
      <img 
        src={getDownloadUrl(triplet.dissimilar.image)}
        alt="Different" 
        on:load={onload} />
    {/if}
  </div>
</div>

<style>
  .triplet-container {
    display:grid;
    grid-template-columns: 33% 33% 33%;
    grid-gap:0.5%;
    background-color: #ebebeb;
    padding: 10px;
    border-radius: 6px;
    min-height: 300px;
  }

  .triplet-image {
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
  }

  @-webkit-keyframes rotating {
    from {
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  :global(.triplet-image svg) {
    position:absolute;
    z-index: 1;
    width: 50px;
    height: 50px;
    fill: white;
    -webkit-animation: rotating 2s linear infinite;
       -moz-animation: rotating 2s linear infinite;
        -ms-animation: rotating 2s linear infinite;
         -o-animation: rotating 2s linear infinite;
            animation: rotating 2s linear infinite;
  }

  .triplet-image img {
    max-width: 100%;
    max-height: 280px;
    z-index: 2;
  }
</style>
