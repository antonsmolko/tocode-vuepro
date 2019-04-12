<template>
    <div class="notes">
        <note
            :class="[{ full: !grid }, note.priority]"
            v-for="(note, index) in notes"
            :key="index"
            :note="note"
            @remove="removeNote"
            @edit="editNote"
            @update="update"
            @escape="escape"
        />
    </div>
</template>
<script>
import Note from './Note.vue'

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
        editNote (id) {
            this.$emit('editNote', id);
        },
        removeNote (id) {
            this.$emit('removeNote', id);
        },
        update (note) {
            this.$emit('updateNote', note);
        },
        escape (id) {
            this.$emit('escapeNote', id);
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


