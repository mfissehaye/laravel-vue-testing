import {mount, createLocalVue} from '@vue/test-utils'
import expect from 'expect'
import MailCompose from '../../resources/js/components/mail-compose.vue'
import {register as registerValidator} from '../../resources/js/validator'
import flushPromises from "flush-promises";
import moxios from 'moxios'
import http from "../../resources/js/http";

const localVue = createLocalVue()
localVue.prototype.$http = http
registerValidator(localVue)

describe('MailCompose', () => {
    let wrapper

    beforeEach(() => {
        moxios.install()
        wrapper = mount(MailCompose, {
            localVue
        })
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it('has inputs for email, subject, message body and submit button', async () => {
        // Make sure the form shows first
        await showForm()

        expect(wrapper.find('.mail-addresses').exists()).toBe(true)
        expect(wrapper.find('.mail-subject').exists()).toBe(true)
        expect(wrapper.find('.mail-message').exists()).toBe(true)
        expect(wrapper.find('button.send-message').exists()).toBe(true)
    })

    it('is hidden by default', () => {
        expect(wrapper.find('.mail-compose-container').exists()).toBe(false)
    })

    it('emits hideMe event when the container is clicked outside .mail-compose-body', async () => {
        // make sure the form is showing
        await showForm()
        await wrapper.find('.mail-compose-container').trigger('click')

        expect(wrapper.emitted().hideMe).toBeTruthy()
    })

    it('emits hideMe event when the cancel button is clicked', async () => {
        await showForm()
        expect(wrapper.find('.cancel-form').exists()).toBe(true)

        await wrapper.find('.cancel-form').trigger('click')
        expect(wrapper.emitted().hideMe).toBeTruthy()
    })

    it('does not emit hideMe event if clicked inside the form', async () => {
        await showForm()
        await wrapper.find('.mail-compose-body').trigger('click')
        expect(wrapper.emitted().hideMe).toBeFalsy()
    })

    it('sends email when the .send-message button is clicked', async () => {
        await showForm()
        await fillForm()
        await sendMail()

        await flushPromises()
        expect(wrapper.find('.success').exists()).toBe(true)
    })

    it('resets form if sending message was successful', async () => {
        await showForm()
        await fillForm()
        await sendMail()

        await flushPromises()
        expect(wrapper.find('.mail-addresses').element.value).toBe('')
        expect(wrapper.find('.mail-subject').element.value).toBe('')
        expect(wrapper.find('.mail-message').element.value).toBe('')
    })

    const showForm = async () => {
        await wrapper.setProps({showing: true})
        await wrapper.setData({showContent: true})
    }

    const fillForm = async ({email, message, subject} = {}) => {
        await Promise.all([
            wrapper.find('.mail-addresses').setValue(email || 'email@provider.com'),
            wrapper.find('.mail-subject').setValue(subject || 'Subject of the email'),
            wrapper.find('.mail-message').setValue(message || 'Content of the email')
        ])
    }

    const sendMail = async () => {
        moxios.stubRequest('/api/v1/mails', {status: 201})
        await wrapper.find('.send-message').trigger('click')
    }
})
