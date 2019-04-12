<template>
    <h1>{{ message }}</h1>
</template>
<script>

export default {
    name: 'message',
    props: {
        message: {
            type: String,
            required: true
        }
    }
}
</script>

