<template>
    <div class="note" @dblclick="editNote">
            <div class="note-header">
                <h1 v-if="!note.edit">{{ note.title }}</h1>
                <input
                    v-else
                    class="edit-control"
                    :value="note.title"
                    @input="onChangeTitle"
                />
                <p style="cursor: pointer" @click="removeNote">x</p>
            </div>
            <div class="note-body">
                <p v-if="!note.edit">{{ note.descr }}</p>
                <textarea
                    v-else
                    class="edit-control"
                    :value="note.descr"
                    @input="onChangeDescr"
                ></textarea>
                <span>{{ note.date }}</span>
            </div>
        </div>
</template>
<script>
export default {
    name: 'note',
    props: {
        note: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            title: '',
            descr: ''
        }
    },
    methods: {
        onChangeTitle(event) {
            this.title = event.target.value;
        },
        onChangeDescr(event) {
            this.descr = event.target.value;
        },
        removeNote () {
            this.$emit('remove', this.note.id);
        },
        editNote () {
            this.$emit('edit', this.note.id)
        }
    },
    created () {
        this.title = this.note.title;
        this.descr = this.note.descr;
        document.addEventListener('keyup', event => {
            if (this.note.edit) {
                if (event.code === 'Enter') {
                    this.$emit('update', {
                        id: this.note.id,
                        title: this.title,
                        descr: this.descr
                    });
                } else if (event.code === 'Escape') {
                    this.$emit('escape', this.note.id);
                }
            }
        });
        document.addEventListener('click', event => {
            if (this.note.edit && (this.$el != event.target && !this.$el.contains(event.target))) {
                console.log(this.$el.contains(event.target));
                this.$emit('update', {
                    id: this.note.id,
                    title: this.title,
                    descr: this.descr
                });
            }
        });
    }
}
</script>

<style lang="scss">
    .note {
        width: 48%;
        padding: 18px 20px;
        margin-bottom: 20px;
        background-color: #fff;
        transition: all .25s cubic-bezier(.02,.01,.47,1);
        box-shadow: 0 30px 30px rgba(0,0,0,.02);
        &:hover {
            box-shadow: 0 30px 30px rgba(0,0,0,.04);
            transform: translate(0,-6px);
            transition-delay: 0s !important;
        }
        &.full {
            width: 100%;
        }
        &.middle {
            background-color: rgb(253, 253, 152);
        }
        &.high {
            background-color: tomato;
            .note-header {
                h1, p {
                    color: #fff;
                }
            }
            color: rgba(#fff, .8);
            .note-body {
                span {
                    color: rgba(#fff, .6)
                }
            }
        }
    }
    .note-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        h1 {
            font-size: 22px;
            color: #402caf;
        }
        p {
            font-size: 22px;
            margin-left: 10px;
        }
        svg {
            cursor: pointer;
            &:not(:last-child) {
               margin-right: 12px; 
            }
            &.active {
                color: blue;
            }
        }
    }
    .note-body {
        margin: 20px 0;
        span {
            font-size: 14px;
            color: #999;
        }
    }
    textarea, input {
        &.edit-control {
            flex-grow: 1;
            margin: 0;
            border: 0;
            border-radius: 0;
            background-color: rgba(#000, .05);
            width: 100%;
            height: inherit;
            line-height: inherit;
            font-family: 'Montserrat', Helvetica, Arial, sans-serif;
            padding: 0;
            .high & {
                .note-header {
                    h1, p {
                        color: #fff;
                    }
                }
                color: rgba(#fff, .8);
                .note-body {
                    span {
                        color: rgba(#fff, .6)
                    }
                }
            }
        }
    }
    input.edit-control {
        font-size: 22px;
        color: #402caf;
    }
</style>


