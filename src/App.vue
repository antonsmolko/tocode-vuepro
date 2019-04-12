<template>
  <div class="wrapper">
    <!-- sadfsfs -->
    <div class="wrapper-content">
      <section>
        <div class="container">

          <!-- message -->
          <message class="message" v-if="message" :message="message"/>

          <!-- new note -->
          <new-note :note="note" @addNewNote="addNote" />

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
            :notes="notesFilter"
            :grid="grid"
            @removeNote="removeNote"
            @editNote="editNote"
            @updateNote="updateNote"
            @escapeNote="escapeNote"
          />

        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Message from '@/components/Message.vue'
import Notes from '@/components/Notes.vue'
import NewNote from '@/components/NewNote.vue'
import Search from '@/components/Search.vue'

export default {
  name: 'app',
  components: {
    Message,
    Notes,
    NewNote,
    Search
  },
  data() {
    return {
      title: 'Notes App',
      search: '',
      message: null,
      grid: true,
      note: {
        title: '',
        descr: '',
        priority: 'standart'
      },
      id: '',
      notes: [
        {
          id: 1,
          title: 'First Note',
          descr: 'Description for the first note',
          date: new Date(Date.now()).toLocaleString(),
          priority: 'standart',
          edit: false
        },
        {
          id: 2,
          title: 'Second Note',
          descr: 'Description for the second note',
          date: new Date(Date.now()).toLocaleString(),
          priority: 'middle',
          edit: false
        },
        {
          id: 3,
          title: 'Third Note',
          descr: 'Description for the third note',
          date: new Date(Date.now()).toLocaleString(),
          priority: 'high',
          edit: false
        }
      ]
    }
  },
  computed: {
    notesFilter () {
      let array = this.notes,
          search = this.search;
      if (!search) return array;
      // toLowerCase
      search = search.trim().toLowerCase();
      // Filter
      return array.filter(item => item.title.toLowerCase().indexOf(search) !== -1);
    },
  },
  methods: {
    addNote () {
      let {title, descr, priority} = this.note;

      if (title === '') {
          this.message = "Title can't be empty!"
          return false
      };

      this.notes.push({
          id: this.id,
          title,
          priority,
          descr,
          date: new Date(Date.now()).toLocaleString(),
          edit: false
      }),
      this.note.title = '',
      this.note.descr = '',
      this.note.priority = 'standart'
      this.message = null;
      this.id++;
    },
    removeNote (id) {
      this.notes = this.notes.filter(note => note.id != id);
    },
    editNote (id) {
      this.notes.forEach(note => {
        if (note.id == id) {
          note.edit = true;
        } else {
          if (note.edit === true) {
            this.updateNote(note);
          }
        }
      });
    },
    updateNote (payload) {
      this.notes.forEach(note => {
        if (note.id == payload.id) {
          note.title = payload.title;
          note.descr = payload.descr;
          note.date = new Date(Date.now()).toLocaleString();
          note.edit = false;
        }
      });
    },
    escapeNote (id) {
      this.notes.forEach(note => {
        if (note.id == id) {
          note.edit = false;
        }
      });
    }
  },
  created () {
    this.id = this.notes.length + 1;
  }
}
</script>

<style lang="scss" scoped>
  .message {
    text-align: center;
    padding: 20px;
  }
  .note-header {
    margin-top: 30px;
  }
</style>
