
export default {
  install(Vue) {
    Vue.mixin({
      methods: {
        // 神策埋点
        track(eventName, data, fn) {
          const commonData = {
            productName: '优税专家',
            platformType: 'web',
            version: window.COMMON_ENV.version,
          };
          let params = Object.assign(commonData, data);
          if (!eventName) {
            return;
          }
          // this.track('frompath',{'frompath':'/'})
          // eventName 埋点事件名称，data埋点数据 必须对象, fn回调函数
          window.sensors.track(eventName, params, () => {
            /*eslint-disable*/
            fn && fn();
            /* eslint-enable */
          });
        },

        // 发送图片
        yszj_sendPicture() {
          this.track('yszj_sendPicture', { Affiliated: '用户端im' });
        },

        // 客服转单
        yszj_customerServiceChangeOrder(params) {
          this.track('yszj_customerServiceChangeOrder', params);
        },

        // 发送文件
        yszj_sendFile() {
          this.track('yszj_sendFile', { Affiliated: '用户端im' });
        },

        // 快捷回复
        yszj_quickResponse(params) {
          this.track('yszj_quickResponse', params);
        },

      },
    });
  },
};
