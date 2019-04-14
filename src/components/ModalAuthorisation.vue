<template>
    <modal
        title="Авторизация"
        @close="onClose"
        >
        <div slot="body">
            <form @submit.prevent="onSubmit">
                <div class="form-item" :class="{ errorInput: $v.form.email.$error }">
                    <label>Email:</label>
                    <p class="errorText" v-if="!$v.form.email.required">Filed is required!</p>
                    <p class="errorText" v-if="!$v.form.email.email">Email is not correct!</p>
                    <input
                        name="email"
                        :class="{ error: $v.form.email.$error }"
                        type="text"
                        v-model="form.email"
                        @change="$v.form.email.$touch()"
                    >
                </div>
                <div class="form-item" :class="{ errorInput: $v.form.password.$error }">
                    <label>Password:</label>
                    <p class="errorText" v-if="!$v.form.password.required">Filed is required!</p>
                    <p class="errorText" v-if="!$v.form.password.minLength">Password must have at least {{ $v.form.password.$params.minLength.min }} !</p>
                    <input
                        :class="{ error: $v.form.password.$error }"
                        type="password"
                        v-model.trim="form.password"
                        @change="$v.form.password.$touch()"
                    >
                </div>
                <!-- button -->
                <button class="btn btnPrimary">Submit!</button>
            </form>

            <!-- footer -->
            <div class="modal-footer">
                <span class="modal-footer__link" @click="toReg">Мне нужен аккаунт</span>
            </div>
        </div>
    </modal>
</template>

<script>
import Modal from '@/components/UI/Modal.vue'

import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
    name: 'modal-authorisation',
    components: {
        Modal
    },
    data () {
        return {
            form: {
                email: '',
                password: '',
            }
        }
    },
    validations: {
        form: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(6)
            }
        }
    },
    methods: {
        onSubmit () {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                const user = {
                    email: this.form.email,
                    password: this.form.password
                }

                // Done
                console.log(user);
                for (let field in this.form) {
                    this.form[field] = ''
                }
                this.$v.$reset();
                this.$emit('close');
            }
        },
        onClose () {
            for (let field in this.form) {
                this.form[field] = ''
            }
            this.$v.$reset();
            return this.$emit('close');
        },
        toReg () {
            this.$emit('toReg')
        }
    }
}
</script>

<style lang="scss">
    form {
        display: flex;
        flex-direction: column;
    }
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
    .modal-footer {
        padding: 20px 18px;
        margin: 20px -18px -20px -18px;
        background-color: #fafafa;
        text-align: center;
        font-size: .8em;
        color: #666666;
        text-decoration: underline;
        cursor: pointer;
    }
</style>
