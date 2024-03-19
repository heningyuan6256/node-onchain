require('@babel/register')({
    ignore: [
        // Ignore everything in node_modules except node_modules/three
    //   node_modules\/(?!(three|@flatten-js|two.js|@turf|element-resize-detector|es6-tween))/
    ]
  })
  require('./index.js') // 引入之前入口js文件
  