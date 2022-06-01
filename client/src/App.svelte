<script>
  import Triplet from './Triplet.svelte';
  import ThumbsUp from './ThumbsUp.svelte';
  import ThumbsDown from './ThumbsDown.svelte';

  import { onMount } from 'svelte';

  let anchor;
  let similar;
  let dissimilar;

  let loading = true;

  const fetchTriplet = () => {
    loading = true;

    anchor = null;
    similar = null;
    dissimilar = null;

    fetch('/api/triplet')
      .then(res => res.json())
      .then(data => {
        anchor = data.anchor;
        similar = data.similar;
        dissimilar = data.dissimilar;
      });
  };

  const onTripletLoaded = () => {
    loading = false;
  }

  const onRate = rating => () => {
    fetch('/api/rating', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        anchor: anchor.id,
        similar: similar.id,
        dissimilar: dissimilar.id,
        rating
      })
    });

    // Fetch next
    fetchTriplet();
  }

  onMount(() => fetchTriplet())
</script>

<main>
  <div class="intro">
    <h1>Rate this Triplet</h1>

    <p>
      Help us improve our data by providing feedback about this triplet. A "good" triplet is 
      one where images A and B depict similar motives or themes, and image C is as different 
      to A and B as possible.
    </p>

    <p>
      For example, two plans of the same or different buildings vs. a portrait would be a 
      good triplet. A triplet where there this little similarity between A and B, or where
      C is similar to A or B would be a bad triplet.
    </p>

    <p>
      We are aware that ratings are subjective. That's not a problem! We want to collect as much -
      and as diverse - data as possible.
    </p>
  </div>

  <Triplet 
    anchor={anchor} 
    similar={similar} 
    dissimilar={dissimilar} 
    on:loaded={onTripletLoaded} />

  <div class="rate-buttons-container">
    <div>
      <ThumbsUp 
        disabled={loading}
        on:click={onRate('GOOD')} />
    </div>

    <div>
      <ThumbsDown 
        disabled={loading}
        on:click={onRate('BAD')} />
    </div>
  </div>

  <div class="skip">
    <button on:click={fetchTriplet} >Skip this triplet</button>
  </div>
</main>

<style>
  main {
    padding: 10px 20px;
    font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
    color: #4b5563;
    line-height: 1.625;
  }

  main .intro {
    padding: 0 0 20px 0;
  }

  main h1 {
    color: #4b5563;
    text-align: center;
    font-size: 28px;
  }

  main p {
    font-size: 16px;
  }

  .rate-buttons-container {
    display: flex;
    margin-top: 60px;
    justify-content: space-around;
  }

  :global(.rate-buttons-container button) {
    width:400px;
    background-color: #fff;
    outline: none;
    padding: 0;
    border: none;
    font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
    color: #d1d1d1;
    font-size: 15px;
    line-height: 140%;
    cursor: pointer;
    border-radius:6px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
  }

  :global(.rate-buttons-container button .icon-container) {
    background-color: #d1d1d1;
    padding: 20px 0;
    border-radius:6px 6px 0 0;
  }

  :global(.rate-buttons-container button .icon-container svg) {
    font-size: 50px;
    color: #fff;
  }

  :global(.rate-buttons-container button .icon-container svg path) {
    fill: #fff;
  }

  :global(.rate-buttons-container button .illustration) {
    padding: 15px 0 0 0;
  }

  :global(.rate-buttons-container button .illustration svg) {
    font-size: 30px;
  }

  :global(.rate-buttons-container button .instructions) {
    margin: 0;
    border-color: #d1d1d1;
    border-style: solid;
    border-width: 0 2px 2px 2px;
    border-radius:0 0 6px 6px;
    height: 110px;
    display:flex;
    align-items: center;
  }

  :global(.rate-buttons-container button .instructions p) {
    margin: 0;
    padding: 0 20px;
  }

  .skip {
    text-align: center;
    padding: 30px;
  }

  .skip button {
    background-color:transparent;
    border: none;
    outline: none;
    font-size: 16px;
    text-decoration: underline;
    color: #4b5563;;
  }
</style>