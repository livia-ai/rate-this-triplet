<script>
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import HiSolidThumbDown from 'svelte-icons-pack/hi/HiSolidThumbDown';
  import BiCheckbox from 'svelte-icons-pack/bi/BiCheckbox';
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
    <Icon src={HiSolidThumbDown} />
    <div class="illustration">
      <Icon src={BiCheckbox} />
      <Icon src={BiCheckbox} />
      <Icon src={BiCheckbox} />
    </div>
  </div>
  <div class="instructions">
    <p>
      No similarity between A and B, or C too similar to A or B.
    </p>
  </div>
</button>

<style>
  button:enabled:hover {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25), 0 0 12px rgba(206, 39, 39, 0.6);
  }

  button:enabled .icon-container {
    background-color: #ce2727;
  }

  button:enabled:hover .icon-container {
    background-color: #d83636;
  }

  button:enabled .instructions {
    border-color: #ce2727;
    color: #ce2727;
  }

  button:enabled .instructions:hover {
    border-color: #d83636;
    color: #d83636; 
  }
</style>