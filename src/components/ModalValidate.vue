<template>
    <modal
        title="Second modal width form"
        @close="$emit('close')"
        >
        <div slot="body">
            <form @submit.prevent="onSubmit">
                <div class="form-item" :class="{ errorInput: $v.name.$error }">
                    <label>Name:</label>
                    <p class="errorText" v-if="!$v.name.required">Filed is required!</p>
                    <p class="errorText" v-if="!$v.name.minLength">Name must have at least {{ $v.name.$params.minLength.min }} !</p>
                    <input
                        :class="{ error: $v.name.$error }"
                        type="text"
                        v-model="name"
                        @change="$v.name.$touch()"
                    >
                </div>
                <div class="form-item" :class="{ errorInput: $v.email.$error }">
                    <label>Email:</label>
                    <p class="errorText" v-if="!$v.email.required">Filed is required!</p>
                    <p class="errorText" v-if="!$v.email.email">Email is not correct!</p>
                    <input
                        :class="{ error: $v.email.$error }"
                        type="text"
                        v-model="email"
                        @change="$v.email.$touch()"
                    >
                </div>
                <!-- button -->
                <button class="btn btnPrimary">Submit!</button>
            </form>
        </div>
    </modal>
</template>

<script>
import Modal from '@/components/UI/Modal.vue'

import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
    name: 'modal-validate',
    components: {
        Modal
    },
    data () {
        return {
            name: '',
            email: '',

        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(4)
        },
        email: {
            required,
            email
        }
    },
    methods: {
        onSubmit () {
            this.$v.$touch();
            if (!this.$v.invalid) {
                const user = {
                    name: this.name,
                    email: this.email
                }
                console.log(user);
                this.name = '';
                this.email = '';
                this.$v.$reset();
                this.$emit('close');
            }
        }
    }
}
</script>

<style lang="scss">
    .form-item {
        .errorText {
            display: none;
            margin-bottom: 8px;
            font-size: 13.4px;
            color: tomato;
        }
        &.errorInput .errorText {
            display: block;
        }
    }
    input.error {
        border-color: tomato;
    }
</style>


