<template>
    <div class="wrapper-content wrapper-content--fixed">
        <section>
            <div class="container">
                <!-- first modal -->
                <button class="btn btnPrimary mr-20" @click="modalFirst = true">Show first modal</button>
                <modal
                    v-show="modalFirst"
                    title="First modal"
                    @close="modalFirst = false"
                >
                    <div slot="body">
                        <p>Text Text Text text text</p>
                        <button class="btn btnPrimary" @click="modalFirst = false">Well Done!</button>
                    </div>
                </modal>

                <!-- second modal -->
                <button class="btn btnPrimary mr-20" @click="modalSecond.show = true">Show Second modal</button>
                <modal
                    v-show="modalSecond.show"
                    title="Second modal width form"
                    @close="modalSecond.show = false"
                >
                    <div slot="body">
                        <form @submit.prevent="submitSecondForm">
                        <label>Name:</label>
                        <input type="text" v-model="modalSecond.name" required>
                        <label>Email:</label>
                        <input type="email" v-model="modalSecond.email" required>
                        <button class="btn btnPrimary">Submit!</button>
                        </form>
                    </div>
                </modal>

                <!-- modal validate -->
                <button class="btn btnPrimary" @click="modalValidate = true">Show Modal Validate</button>
                <modal-validate
                    v-show="modalValidate"
                    @close="modalValidate = false"
                />
            </div>
        </section>
    </div>
</template>

<script>
import Modal from '@/components/UI/Modal.vue'
import ModalValidate from '@/components/ModalValidate.vue'

export default {
  name: 'Home',
  components: {
    Modal,
    ModalValidate
  },
  data() {
    return {
      modalFirst: false,
      modalSecond: {
        show: false,
        name: '',
        email: ''
      },
      modalValidate: false
    }
  },
  computed: {
  },
  methods: {
    submitSecondForm () {
      console.log({
        name: this.modalSecond.name,
        email: this.modalSecond.email
      });
      this.modalSecond.name = '';
      this.modalSecond.email = '';
      this.modalSecond.show = false;
    }
  }
}
</script>

<style lang="scss" scoped>
    .mr-20 {
        margin-right: 20px;
    }
</style>
