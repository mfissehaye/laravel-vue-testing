<template>
    <nav>
        <span class="count" v-text="count"></span>
        <button @click="count++">Increment</button>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            count: 0
        }
    }
}
</script>
