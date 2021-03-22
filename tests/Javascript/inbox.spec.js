import {mount, createWrapper, createLocalVue} from '@vue/test-utils'
import expect from 'expect'
import moment from 'moment'
import moxios from 'moxios'
import Inbox from '../../resources/js/components/dashboard/inbox.vue'
import http from '../../resources/js/http'
import flushPromises from "flush-promises";

const localVue = createLocalVue()
localVue.prototype.$http = http

describe('Inbox', () => {
    let wrapper
    let timestamp1, timestamp2

    beforeEach(async () => {
        moxios.install()
        // Fetch the emails and mount the component here
        timestamp1 = moment().valueOf()
        timestamp2 = moment().subtract(1, 'week').valueOf()
        moxios.stubRequest('/api/v1/mails', {
            status: 200,
            response: [{
                id: '1',
                subject: 'First email subject',
                date: timestamp1
            }, {
                id: '2',
                subject: 'Second email subject',
                date: timestamp2
            }]
        })

        wrapper = mount(Inbox, {
            localVue
        })

        await flushPromises()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it('shows the list of emails', async () => {
        see('First email subject')
        see(timestamp1)
        see(timestamp2)
    })

    it('has each email linked to single mail route', async () => {
        expect(wrapper.find('.single-mail:first-child').attributes().href).toBe('/mails/1')
        expect(wrapper.find('.single-mail:last-child').attributes().href).toBe('/mails/2')
    })

    const see = (text, selector) => {
        const wrap = selector ? wrapper.find(selector) : wrapper
        expect(wrap.html()).toContain(text)
    }
})
