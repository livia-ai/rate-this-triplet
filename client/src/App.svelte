<script>
  import Triplet from './Triplet.svelte';
  import ThumbsUp from './ThumbsUp.svelte';
  import ThumbsDown from './ThumbsDown.svelte';

  import { onMount } from 'svelte';

  let triplet;

  let loading = true;

  const fetchTriplet = () => {
    loading = true;

    triplet = null;

    fetch('/api/triplet')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        triplet = data;
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
        anchor: triplet.anchor.id,
        similar: triplet.similar.id,
        dissimilar: triplet.dissimilar.id,
        method: triplet.method,
        museum: triplet.museum,
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
      <strong>Help us improve our data by providing feedback about this triplet.</strong> A good triplet   
      is one where images A and B show similar motives or themes, and image C is different 
      from A and B. If there is little similarity between A and B, or C is similar to A or B, that's a 
      bad triplet.
    </p>

    <p>
      <strong>We know that ratings are subjective. That's no problem!</strong> We want to collect as much &
      as diverse feedback as possible. Don't overthink it. Just focus on image motives and themes, and 
      rate according to your intuition. 
    </p>
  </div>

  <div class="abc">
    <div>A</div>
    <div>B</div>
    <div>C</div>
  </div>

  <Triplet 
    triplet={triplet}
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
    <button on:click={fetchTriplet} >Skip this Triplet</button>
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

  .abc {
    display: flex;
    padding: 0 0 10px 0;
    justify-content: space-around;
    font-weight: bold;
    font-size: 20px;
  }

  .rate-buttons-container {
    display: flex;
    margin-top: 40px;
    justify-content: center;
  }

  .rate-buttons-container > div {
    margin: 0 20px;
  }

  :global(.rate-buttons-container button) {
    width:340px;
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
    background-color: #ebebeb;
    padding: 10px 0 5px 0;
    border-radius:6px 6px 0 0;
  }

  :global(.rate-buttons-container button .icon-container svg) {
    font-size: 28px;
    color: #fff;
  }

  :global(.rate-buttons-container button .icon-container svg path) {
    fill: #fff;
  }

  :global(.rate-buttons-container button .illustration) {
    padding: 0;
  }

  :global(.rate-buttons-container button .illustration svg) {
    font-size: 14px;
  }

  :global(.rate-buttons-container button .instructions) {
    margin: 0;
    border-color: #ebebeb;
    border-style: solid;
    border-width: 0 2px 2px 2px;
    border-radius:0 0 6px 6px;
    height: 70px;
    display:flex;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
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
    color: #4b5563;
    cursor: pointer;
  }
</style>