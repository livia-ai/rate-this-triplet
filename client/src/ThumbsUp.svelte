<script>
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import FaThumbsUp from 'svelte-icons-pack/fa/FaThumbsUp';
  import BsSquare from 'svelte-icons-pack/bs/BsSquare';
  import BsSquareFill from 'svelte-icons-pack/bs/BsSquareFill';
  import { createEventDispatcher } from 'svelte';

  export let disabled;

  const dispatch = createEventDispatcher();

  const onClick = () => dispatch('click')
</script>

<button 
  disabled={disabled}
  class="thumbs thumps-up"
  on:click={onClick}>
  <div class="icon-container">
    <Icon src={FaThumbsUp} />
    <div class="illustration">
      <Icon src={BsSquareFill} />
      <Icon src={BsSquareFill} />
      <Icon src={BsSquare} />
    </div>
  </div>
  <p class="instructions">
    Images A and B show similar motives or themes. 
    Image C is sufficiently different from A and B.
  </p>
</button>