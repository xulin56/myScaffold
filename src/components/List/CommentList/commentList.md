## API

```html
<CommentList
  url='/tradList'
  listData={[
    {
      listImg : require('../../components/images/test.jpg'),
      listTitle : '高圆圆',
      description : '楼主顶我上去，给你一百个赞',

    },
    {
      listImg : require('../../components/images/test.jpg'),
      listTitle : '校花',
      description : '楼主顶我上去，给你一百个赞',
      operate : [
        {
          label : '编辑',
          render(row,index){
              console.log(row,index)
          },
        },
        {
          label : '查看',
          render(row,index){
              console.log(row,index)
          },
        }
      ]

    },
    {
      listImg : require('../../components/images/test1.jpg'),
      listTitle : '懒女',
      description : '楼主顶我上去，给你一百个赞',
      operate : [
        {
          label : '编辑',
        },
        {
          label : '查看',
          render(row,index){
              console.log(row,index)
          },
        }
      ]

    },
  ]}>
</CommentList>
```

| 参数 | 说明 | 类型 | 默认值 | 必需 |
| --- | --- | --- | --- | --- |
| listData | list里的内容 operate选传 render(){}也是选传  | array | - | 是 |
| url | 加载更多的接口,不传则加载更多按钮不显示  | string | - | 否 |
