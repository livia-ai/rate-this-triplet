<script>
  import { onMount } from 'svelte';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import SiSpinrilla from 'svelte-icons-pack/si/SiSpinrilla';

  let anchor;
  let similar;
  let dissimilar;

  const fetchTriplet = () => {
    anchor = null;
    similar = null;
    dissimilar = null;

    fetch('/api/triplet')
      .then(res => res.json())
      .then(data => {
        console.log(data);

        anchor = data.anchor;
        similar = data.similar;
        dissimilar = data.dissimilar;
      });
  };

  // Shorthand
  const proxy = url => `/api/proxy?url=${url}`;

  onMount(() => fetchTriplet())
</script>

<main>
  <div class="triplet-container">
    <div class="triplet-image">
      <Icon src={SiSpinrilla} />
      {#if anchor}
        <img src={proxy(anchor.image)} alt="Reference" />
      {/if}
    </div>

    <div class="triplet-image">
      <Icon src={SiSpinrilla} />
      {#if similar}
        <img src={proxy(similar.image)} alt="Similar" />
      {/if}
    </div>

    <div class="triplet-image">
      <Icon src={SiSpinrilla} />
      {#if dissimilar}
        <img src={proxy(dissimilar.image)} alt="Different" />
      {/if}
    </div>
  </div>
</main>

<style>
  .triplet-container {
    height:380px;
    display:grid;
    grid-template-columns: 33% 33% 33%;
    grid-gap:0.5%;
  }
  .triplet-image {
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    background-color: #cfcfcf;
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
    max-height: 360px;
    z-index: 2;
  }
</style>