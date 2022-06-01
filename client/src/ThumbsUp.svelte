<script>
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import HiSolidThumbUp from 'svelte-icons-pack/hi/HiSolidThumbUp';
  import BiSolidCheckbox from 'svelte-icons-pack/bi/BiSolidCheckbox';
  import BiCheckbox from 'svelte-icons-pack/bi/BiCheckbox';
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
    <Icon src={HiSolidThumbUp} />
    <div class="illustration">
      <Icon src={BiSolidCheckbox} />
      <Icon src={BiSolidCheckbox} />
      <Icon src={BiCheckbox} />
    </div>
  </div>
  <div class="instructions">
    <p>
      Images A and B show similar motives or themes. 
      Image C is sufficiently different from A and B.
    </p>
  </div>
</button>

<style>
  button:enabled:hover {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25), 0 0 12px rgba(14, 145, 14, 0.6);
  }

  button:enabled .icon-container {
    background-color: #0e910e;
  }

  button:enabled:hover .icon-container {
    background-color: #1fa71f;
  }

  button:enabled .instructions {
    border-color: #0e910e;
    color: #0e910e;
  }

  button:enabled .instructions:hover {
    border-color: #1fa71f;
    color: #1fa71f; 
  }
</style>