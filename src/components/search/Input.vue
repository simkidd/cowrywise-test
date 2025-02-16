<template>
  <div class="search-input">
    <div class="input-container">
      <input
        :value="modelValue"
        @input="handleInput"
        @keyup.enter="handleSearch"
        :placeholder="placeholder"
        class="input-field"
        type="text"
        aria-label="Search for photo"
      />
      <button
        class="clear-button"
        @click="clearInput"
        v-show="modelValue"
        aria-label="Clear search"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'searchInput',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Search free high-resolution photos',
    },
  },
  emits: ['update:modelValue', 'search'],
  methods: {
    handleInput(event: Event) {
      const value = (event.target as HTMLInputElement).value
      this.$emit('update:modelValue', value) // Emit the updated value for v-model
    },
    handleSearch() {
      this.$emit('search', this.modelValue) // Emit the search event
    },
    clearInput() {
      this.$emit('update:modelValue', '') // Clear the input and emit empty value
      this.$emit('search', '') // Optionally trigger search with empty query
    },
  },
}
</script>

<style scoped lang="scss">
.search-input {
  --input-height: 56px;
  --border-radius: 8px;
  --padding: 16px;
  --transition-speed: 0.2s;

  position: relative;
  width: 100%;

  .input-container {
    position: relative;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    border-radius: var(--border-radius);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .input-field {
    width: 100%;
    height: var(--input-height);
    padding: var(--padding);
    padding-right: calc(var(--input-height) + var(--padding));
    font-size: 1.1rem;
    border: 2px solid #e0e0e0;
    border-radius: var(--border-radius);
    transition:
      border-color var(--transition-speed) ease,
      box-shadow var(--transition-speed) ease;

    &:focus {
      outline: none;
      border-color: #4d90fe;
      box-shadow: 0 0 0 3px rgba(77, 144, 254, 0.15);
    }
  }

  .clear-button {
    position: absolute;
    right: 0;
    top: 0;
    height: var(--input-height);
    width: var(--input-height);
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #757575;
    cursor: pointer;
    transition: color var(--transition-speed) ease;

    &:hover {
      color: #212121;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(33, 33, 33, 0.1);
    }
  }
}
</style>
