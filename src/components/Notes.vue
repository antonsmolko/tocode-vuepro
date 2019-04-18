<template>
    <div class="notes">
        <note
            :class="[{ full: !grid }, note.priority]"
            v-for="note in notes"
            :key="note.id"
            :note="note"
            @edit="editNote"
            @escapeEdit="escapeEditNote"
            @update="updateNote"
            @remove="removeNote"
        />
    </div>
</template>
<script>
import Note from './Note.vue'

import { mapState } from 'vuex'

export default {
    name: 'notes',
    components: {
        Note
    },
    props: {
        notes: {
            type: Array,
            required: true
        },
        grid: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        removeNote (id) {
            this.$store.dispatch('notes/removeItem', id);
        },
        editNote (note) {
            this.$store.dispatch('notes/editItem', note);
        },
        // noTitleChange(value) {
        //     this.$store.dispatch('notes/changeItemTitleField', value);
        // },
        // noDescrChange(value) {
        //     this.$store.dispatch('notes/changeItemDescrField', value);
        // },
        updateNote (note) {
            this.$store.dispatch('notes/updateItem', {
                fields: {
                    title: note.title,
                    descr: note.descr,
                    date: new Date(Date.now()).toLocaleString(),
                    edit: false
                },
                id: note.id
            });
        },
        escapeEditNote (id) {
            this.$store.dispatch('notes/escapeEditItem', id);
        },
        removeNote (id) {
            this.$store.dispatch('notes/removeItem', id);
        }
    }
}
</script>

<style lang="scss">
    .notes {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 40px 0;
    }
</style>


