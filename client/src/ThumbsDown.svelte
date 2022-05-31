<script>
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import FaThumbsDown from 'svelte-icons-pack/fa/FaThumbsDown';
  import BsSquare from 'svelte-icons-pack/bs/BsSquare';
  import { createEventDispatcher } from 'svelte';

  export let disabled; 

  const dispatch = createEventDispatcher();

  const onClick = () => dispatch('click')
</script>

<button
  disabled={disabled}
  class="thumbs thumps-down"
  on:click={onClick}>
  <div class="icon-container">
    <Icon src={FaThumbsDown} />
    <div class="illustration">
      <Icon src={BsSquare} />
      <Icon src={BsSquare} />
      <Icon src={BsSquare} />
    </div>
  </div>
  <p class="instructions">
    Images A and B don't show similar motives or themes, 
    image C is too similar to A or B, or there is not
    much observable difference between A, B and C.
  </p>
</button>