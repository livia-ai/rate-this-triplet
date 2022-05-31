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
  <div>
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
    <ThumbsUp 
      disabled={loading}
      on:click={onRate('GOOD')} />

    <ThumbsDown 
      disabled={loading}
      on:click={onRate('BAD')} />
  </div>

  <button on:click={fetchTriplet}>Skip</button>
</main>

<style>

</style>