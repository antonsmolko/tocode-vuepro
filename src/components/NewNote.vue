<template>
    <div>
        <!-- new-note -->
        <div class="new-note">
            <div class="new-note--half">
                <label>Title</label>
                <input type="text" :value="title" @input="changeTitle">
                <!-- message -->
                <message class="message" v-if="!$v.title.required && $v.title.$dirty" message="Title fill is required!"/>
            </div>
            <div class="new-note--half">
                <label>Priority</label>
                <select :value="priorities[0].key" @change="changePriority">
                    <option
                        v-for="priority in priorities"
                        :key="priority.key"
                        :value="priority.key"
                    >{{ priority.name }}</option>
                </select>
            </div>
            <div class="new-note--textarea">
                <label>Description</label>
                <textarea :value="descr" @input="changeDescr"></textarea>
                <!-- message -->
                <message class="message" v-if="!$v.descr.required && $v.descr.$dirty" message="Description fill is required!"/>
            </div>
            <div class="flex flex-center">
                <button class="btn btnPrimary" @click="addNote" :disabled="!$v.title.required || !$v.descr.required">New Note</button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

import hash from 'md5'
import { required } from 'vuelidate/lib/validators'

import Message from '@/components/Message.vue'

export default {
    name: 'new-note',
    components: {
        Message
    },
    validations: {
        title: {
            required,
            touch: false
        },
        descr: {
            required,
            touch: false
        }
    },
    computed: {
        ...mapState('notes', {
            title: state => state.newItemFields.title,
            descr: state => state.newItemFields.descr,
            priority: state => state.newItemFields.priority,
            priorities: state => state.priorities
        })
    },
    methods: {
        changeTitle (e) {
            this.$v.title.$touch();
            this.$store.dispatch('notes/changeNewItemTitleField', e.target.value);
        },
        changeDescr (e) {
            this.$v.descr.$touch();
            this.$store.dispatch('notes/changeNewItemDescrField', e.target.value);
        },
        changePriority (e) {
            this.$store.dispatch('notes/changeNewItemPriorityField', e.target.value);
        },
        addNote () {
            this.$store.dispatch('notes/addNote', {
                id: hash(Date.now()),
                title: this.title,
                descr: this.descr,
                priority: this.priority,
                data: new Date(Date.now()).toLocaleString(),
                edit: false
            });
            this.$v.$reset();
        }
    }
}
</script>
<style lang="scss">
    .flex {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
    .flex-center {
        justify-content: center;
    }
    .message {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        color: tomato;
    }
    .new-note {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        justify-content: space-between;
        &--half {
            position: relative;
            width: 48%;
        }
        &--textarea {
            position: relative;
            width: 100%;
        }
    }
    .btn {
        margin: 20px 0;
        &.btnPrimary[disabled] {
            background-color: #ccc !important;
            border-color: #ccc !important;
        }
    }
</style>


