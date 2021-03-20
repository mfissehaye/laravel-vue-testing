import {mount, createLocalVue, shallowMount} from '@vue/test-utils'
import expect from 'expect'
import Dashboard from '../../resources/js/components/dashboard/index.vue'
import MailCompose from '../../resources/js/components/mail-compose.vue'

const localVue = createLocalVue()
localVue.component('mail-compose', MailCompose)

describe('Dashboard', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Dashboard, {
            localVue,
            stubs: ['dashboard-status-card', 'unicon']
        })
    })

    it('has compose email button', () => {
        expect(wrapper.find('.compose-button').exists()).toBe(true)
    })

    it('hears event showMe from compose form and shows it', async () => {
        const composeComponent = wrapper.findComponent(MailCompose)
        await composeComponent.vm.$emit('showMe')

        expect(composeComponent.props().showing).toBe(true)
    })

    it('hears event hideMe from compose form and hides it', async () => {
        const composeComponent = wrapper.findComponent(MailCompose)
        await composeComponent.vm.$emit('hideMe')

        expect(composeComponent.props().showing).toBe(false)
    })
})
