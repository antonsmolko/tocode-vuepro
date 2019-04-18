<template>
  <div class="wrapper">
    <!-- sadfsfs -->
    <div class="wrapper-content">
      <section>
        <div class="container">

          <!-- new note -->
          <new-note />

          <!-- title -->
          <div class="note-header">
            <h1>{{ title }}</h1>

            <!-- search -->
            <search
              :value="search"
              placeholder="Find your note"
              @search="search = $event"
            />

            <!-- icons controls -->
            <div class="icons">
              <svg :class="{ active: grid }" @click="grid = true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <svg :class="{ active: !grid }" @click="grid = false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
            </div>
          </div>

          <div>
            <p><strong>dblclick по Note</strong> - запускает редактирование</p>
            <p><strong>Enter или click по любой другой области</strong> - закрывает редактирование и сохраняет результат, обновляя дату</p>
            <p><strong>Escape</strong> - закрывает редактирование и не сохраняет результат</p>
          </div>

          <!-- note list -->
          <notes
            :notes="filterNotes"
            :grid="grid"
          />

        </div>
      </section>
    </div>
  </div>
</template>

<script>

import Notes from '@/components/Notes.vue'
import NewNote from '@/components/NewNote.vue'
import Search from '@/components/Search.vue'

export default {
  name: 'app',
  components: {
    Notes,
    NewNote,
    Search
  },
  data() {
    return {
      title: 'Notes App',
      search: '',
      grid: true
    }
  },
  created () {
    this.$store.dispatch('notes/getItems');
  },
  computed: {
    fields () {
      return this.$store.state['notes/fields'];
    },
    errorMessage () {
      return this.$store.state['errorMessage'];
    },
    filterNotes () {
      return this.$store.getters['notes/filterItems'](this.search);
    },
  }
}
</script>

<style lang="scss" scoped>
  .note-header {
    margin-top: 30px;
  }
</style>
