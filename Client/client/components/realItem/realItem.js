// components/realtem/realItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '我发布的'
    },
    icon: {
      type: String,
      value: ''
    },
    name: {
      type: String,
      value: 'realName'
    },
    value: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: '请输入...'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    collegeArray: ['东校区', '南校区', '北校区', '珠海校区','深圳校区']
  },
  /**
   * 组件的方法列表
   */
  methods: {
    chooseCollege(e) {
      this.setData({
        value: e.detail.value
      })
      var detail = {
        name: this.data.name,
        value: e.detail.value
      }
      this.triggerEvent('pickerChange', detail)
    },
    input(e) {
      var detail = {
        name: this.data.name,
        value: e.detail.value
      }
      console.log('input输入时，得到的值', detail)
      this.triggerEvent('valueChange', detail)
    }
  }
})
