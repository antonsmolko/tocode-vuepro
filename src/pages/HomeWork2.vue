<template>
    <div class="wrapper-content wrapper-content--fixed">
        <section>
            <div class="container">
                <!-- modal validate -->
                <button class="btn btnPrimary m-auto" @click="modalValidate = true">Show Modal Validate</button>
                <modal-validate
                    v-show="modalValidate"
                    @close="modalValidate = false"
                />
            </div>
        </section>
    </div>
</template>

<script>
import ModalValidate from '@/components/ModalValidate.vue'

export default {
  name: 'HomeWork2',
  components: {
    ModalValidate
  },
  data() {
    return {
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
    .container {
        display: flex;
    }
    .m-auto {
        margin: auto;
    }
</style>
