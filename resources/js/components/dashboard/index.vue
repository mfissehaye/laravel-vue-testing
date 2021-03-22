<template>
    <div>
        <mail-compose
            :showing="showingComposeForm"
            @showMe="showingComposeForm = true"
            @hideMe="showingComposeForm = false"></mail-compose>
        <div class="row mb-3">
            <div class="col-12 col-lg-4 mt-3 mt-lg-0">
                <dashboard-status-card text="Processed" icon-name="telegram"></dashboard-status-card>
            </div>
            <div class="col-12 col-lg-4 mt-3 mt-lg-0">
                <dashboard-status-card text="Delivered" icon-name="mailbox"></dashboard-status-card>
            </div>
            <div class="col-12 col-lg-4 mt-3 mt-lg-0">
                <dashboard-status-card text="Rejected" icon-name="envelope-block"></dashboard-status-card>
            </div>
        </div>

        <div class="my-3">
            <button class="compose-button btn btn-primary" @click="openComposeForm">
                <span class="font-weight-bold">Compose New Email</span>
                <unicon name="plus" fill="white" width="18" height="18"></unicon>
            </button>
        </div>

        <dashboard-inbox></dashboard-inbox>
    </div>
</template>

<script>
import DashboardInbox from './inbox.vue'
import DashboardStatusCard from './status-card.vue'
import MailCompose from '../mail-compose.vue'

export default {
    components: {
        DashboardInbox,
        DashboardStatusCard,
        MailCompose
    },

    data() {
        return {
            showingComposeForm: false
        }
    },

    methods: {
        openComposeForm() {
            this.showingComposeForm = true
        }
    }
}
</script>
