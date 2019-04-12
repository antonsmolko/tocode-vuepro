<template>
    <div class="new-note">
        <div class="new-note--half">
            <label>Title</label>
            <input type="text" v-model="note.title">
        </div>
        <div class="new-note--half">
            <label>Priority</label>
            <select v-model="note.priority">
                <option value="standart">Стандартный</option>
                <option value="middle">Высокий</option>
                <option value="high">Очень высокий</option>
            </select>
        </div>
        <div class="new-note--textarea">
            <label>Description</label>
            <textarea v-model="note.descr"></textarea>
            <button class="btn btnPrimary" @click="addNote">New Note</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'new-note',
    props: {
        note: {
            type: Object,
            required: true
        }
    },
    methods: {
        addNote () {
            this.$emit('addNewNote', this.note);
        }
    }
}
</script>
<style lang="scss">
    .new-note {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        justify-content: space-between;
        &--half {
            width: 48%;
        }
        &--textarea {
            width: 100%;
        }
    }
    .btn {
        margin: 20px 0;
    }
</style>


