import {mount} from '@vue/test-utils'
import expect from 'expect'
import MailCompose from '../../resources/js/components/mail-compose.vue'

describe('MailCompose', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(MailCompose)
    })

    it('has inputs for email, subject, message body and submit button', async () => {
        // Make sure the form shows first
        await wrapper.setProps({showing: true})
        await wrapper.setData({showContent: true})

        expect(wrapper.find('.mail-to-input').exists()).toBe(true)
        expect(wrapper.find('.mail-subject').exists()).toBe(true)
        expect(wrapper.find('.mail-message').exists()).toBe(true)
        expect(wrapper.find('button.send-message').exists()).toBe(true)
    })

    it('is hidden by default', () => {
        expect(wrapper.find('.mail-compose-container').exists()).toBe(false)
    })

    it('emits hideMe event when the container is clicked outside .mail-compose-body', async () => {
        // make sure the form is showing
        await wrapper.setProps({showing: true})
        await wrapper.setData({showContent: true})
        await wrapper.find('.mail-compose-container').trigger('click')

        expect(wrapper.emitted().hideMe).toBeTruthy()
    })

    it('does not emit hideMe event if clicked inside the form', async () => {
        await wrapper.setProps({showing: true})
        await wrapper.setData({showContent: true})
        await wrapper.find('.mail-compose-body').trigger('click')
        expect(wrapper.emitted().hideMe).toBeFalsy()
    })
})
