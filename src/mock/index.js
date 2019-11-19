import Mock from 'mockjs2'

// 判断环境不是 prod 是 true 时，加载 mock 服务
if (process.env.NODE_ENV !== 'production') {
  require('./services/ItemEol')
  require('./services/tapePublishSchedule')
  require('./services/login')

  Mock.setup({
    timeout: 800 // setter delay time
  })
}
