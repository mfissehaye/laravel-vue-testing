<template>
    <div class="border">
        <a href="#"
           v-for="(mail, i) in mails"
           :key="mail.id"
           class="p-2 d-flex justify-content-between"
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
            mails: [{
                id: '1',
                subject: 'This is the email subject',
                date: 'Thu Mar 1, 2021'
            }, {
                id: '1',
                subject: 'This is the email subject',
                date: 'Thu Mar 1, 2021'
            }, {
                id: '1',
                subject: 'This is the email subject',
                date: 'Thu Mar 1, 2021'
            }, {
                id: '1',
                subject: 'This is the email subject',
                date: 'Thu Mar 1, 2021'
            }, {
                id: '1',
                subject: 'This is the email subject',
                date: 'Thu Mar 1, 2021'
            }]
        }
    }
}
</script>
