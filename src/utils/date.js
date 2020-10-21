import Vue from 'vue'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

// .to(compared: Dayjs, withoutSuffix?: boolean)

Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})

Vue.filter('dateTime', value => {
  return dayjs(value).format('MM-DD HH:mm')
})