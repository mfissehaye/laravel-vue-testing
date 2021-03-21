<template>
    <div :class="{border: mails.length > 0}">
        <a :href="`/mails/${mail.id}`"
           v-for="(mail, i) in mails"
           :key="mail.id"
           class="p-2 d-flex justify-content-between text-decoration-none single-mail"
           :class="{'border-bottom' : i < mails.length - 1}">
            <span class="font-weight-bold">{{ mail.subject }}</span>
            <span>{{ mail.date }}</span>
        </a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mails: []
        }
    },

    async mounted() {
        try {
            this.mails = await this.$http.inbox.all()
        } catch (ex) {
        }
    },
}
</script>
