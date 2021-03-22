<template>
    <transition name="fade" @after-enter="showContent = true">
        <div class="mail-compose-container" v-if="showing">
            <transition name="slide">
                <div v-if="showContent" class="bg-white mail-compose-body">
                    <validation-observer ref="observer" v-slot="{ invalid: invalidForm }">
                        <div class="m-2" v-if="success || error">
                            <p v-if="success" class="success h6 font-weight-bold alert alert-success">{{ success }}</p>
                            <p v-else-if="error" class="h6 font-weight-bold alert alert-danger">{{ error }}</p>
                        </div>
                        <label for="mail-addresses" class="d-none"></label>
                        <validation-provider rules="required" name="Email" v-slot="emailsSlot">
                            <input
                                type="text"
                                :class="{ invalid: emailsSlot.touched && emailsSlot.invalid }"
                                id="mail-addresses"
                                v-model="emails"
                                class="form-control mail-addresses"
                                placeholder="Enter email address(es)"/>
                        </validation-provider>

                        <hr class="my-0">

                        <validation-provider rules="required" name="Subject" v-slot="subjectSlot">
                            <label for="mail-subject" class="d-none"></label>
                            <input
                                type="text"
                                id="mail-subject"
                                :class="{ invalid: subjectSlot.touched && subjectSlot.invalid }"
                                v-model="subject"
                                class="form-control mail-subject"
                                placeholder="Enter subject"/>
                        </validation-provider>

                        <hr class="my-0">

                        <validation-provider rules="required" name="Message" v-slot="messageSlot">
                            <label for="message" class="d-none">Message</label>
                            <textarea
                                :class="{ invalid: messageSlot.touched && messageSlot.invalid }"
                                class="form-control mail-message"
                                id="message"
                                v-model="message"
                                placeholder="Message"></textarea>
                        </validation-provider>

                        <div class="mail-actions w-100">
                            <div class="m-3">
                                <a href="#" class="text-muted cancel-form" @click.prevent="emitHideMe">Cancel</a>
                            </div>
                            <button :class="{ disabled: invalidForm || sending }"
                                    :disabled="invalidForm || sending"
                                    @click.prevent="sendMessage"
                                    class="send-message btn btn-primary btn-block rounded-0 font-weight-bold">Send
                                Message
                            </button>
                        </div>
                    </validation-observer>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        showing: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            sending: false,
            success: null,
            error: null,
            emails: '',
            message: '',
            subject: '',
            showContent: false
        }
    },

    methods: {
        hideMe(e) {
            const element = this.$el && this.$el.getElementsByClassName('mail-compose-body')
            if (element !== null && e.target !== element[0] && !element[0].contains(e.target))
                this.emitHideMe()
        },

        resetForm() {
            this.emails = ''
            this.subject = ''
            this.message = ''
        },

        emitHideMe() {
            this.$emit('hideMe')
            this.resetForm()
            this.success = null
            this.error = null
        },

        async sendMessage() {
            try {
                this.sending = true
                await this.$http.inbox.create({to: this.emails, subject: this.subject, message: this.message})
                this.success = 'Your message has been sent'
                this.$refs.observer.reset()
                this.resetForm()
            } catch (ex) {
                this.error = ex.message || ex
            } finally {
                this.sending = false
            }
        }
    },

    watch: {
        showing() {
            this.$nextTick(() => {
                if (this.showing)
                    this.$el.addEventListener('click', this.hideMe)
                else {
                    this.$el && this.$el.removeEventListener('click', this.hideMe)
                    this.showContent = false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.mail-compose-container {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
}

.mail-compose-body {
    position: absolute;
    right: 0;
    width: min(100%, 550px);
    height: 100%;
}

.form-control, .form-control:focus, .form-control:active {
    border: none;
    outline: none;
    box-shadow: none;
    border-radius: 0;
    min-height: 50px;

    &.invalid {
        background: rgba(indianred, 0.1);
    }
}

textarea {
    resize: none;
    padding-top: 20px;
}

.mail-actions {
    position: absolute;
    bottom: 0;

    .send-message, .send-message:focus, .send-message:active {
        box-shadow: none;
        outline: none;
    }
}

.slide-enter-active,
.slide-leave-enter {
    transform: translateX(0);
    transition: all .1s ease-in-out;
}

.slide-enter,
.slide-leave-to {
    transform: translateX(100%);
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
