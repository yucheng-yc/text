# 骨架屏

1.在需要显示骨架的标签上，增加相应class 
  'skeleton-shadow' 阴影类 (比其他类颜色稍浅，可用于背景图，轮播，内容快等)
  'skeleton-rect'  矩形类
  'skeleton-rect-radius' 矩形圆角类
  'skeleton-round' 圆形类
 
2.基础用法
 	<ls-skeleton ref='skeleton' :show='loading'></ls-skeleton>

3.示例页面中所有数据，分别模拟不同时间异步调用。
  获得异步数据后调用 this.$refs.skeleton.draws() 渲染骨架


# props
参数名           |  说明                                              | 类型         |   默认值
-----------------|-------------------------------------------------- -|-------------|------------
show             |  是否显示                                          | Boolean      |  false
bgcolor          |  背景色                                            | String       |  #fff


  
