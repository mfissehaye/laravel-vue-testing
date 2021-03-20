<template>
    <transition name="fade" @after-enter="showContent = true">
        <div class="mail-compose-container" v-if="showing">
            <transition name="slide">
                <div v-if="showContent" class="bg-white mail-compose-body">
                    <label for="mail-addresses" class="d-none"></label>
                    <input type="text" id="mail-addresses" class="form-control mail-to-input"
                           placeholder="Enter email address(es)"/>

                    <hr class="my-0">

                    <label for="mail-subject" class="d-none"></label>
                    <input type="text" id="mail-subject" class="form-control mail-subject"
                           placeholder="Enter subject"/>

                    <hr class="my-0">

                    <label for="message" class="d-none">Message</label>
                    <textarea class="form-control mail-message" id="message" placeholder="Message"></textarea>
                    <button class="send-message btn btn-primary btn-block rounded-0 font-weight-bold">Send Message
                    </button>
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
            showContent: false
        }
    },

    methods: {
        hideMe(e) {
            const element = this.$el.getElementsByClassName('mail-compose-body')
            if (element !== null && e.target !== element[0] && !element[0].contains(e.target))
                this.$emit('hideMe')
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
    width: 550px;
    height: 100%;
}

.form-control, .form-control:focus, .form-control:active {
    border: none;
    outline: none;
    box-shadow: none;
    border-radius: 0;
    min-height: 50px;
}

textarea {
    resize: none;
    padding-top: 20px;
}

.send-message, .send-message:focus, .send-message:active {
    position: absolute;
    bottom: 0;
    box-shadow: none;
    outline: none;
}

.slide-enter-active,
.slide-leave-enter {
    transform: translateX(0);
    transition: all .1s linear;
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
