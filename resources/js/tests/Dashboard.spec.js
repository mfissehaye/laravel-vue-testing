import { mount } from '@vue/test-utils'
import Dashboard from '../components/Dashboard.vue';
import expect from 'expect'

describe('Dashboard', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Dashboard)
    })

    it('defaults to count of 0', () => {
        expect(wrapper.vm.count).toBe(0)
    })

    it('increments the count when the button is clicked', () => {
        expect(wrapper.vm.count).toBe(0)

        wrapper.find('button').trigger('click')
        
        expect(wrapper.vm.count).toBe(1)
    })

    it('presents the current count', async () => {
        expect(wrapper.find('.count').html()).toContain(0)
        
        wrapper.find('button').trigger('click')

        await wrapper.vm.$nextTick()

        expect(wrapper.find('.count').html()).toContain(1)
    })
})