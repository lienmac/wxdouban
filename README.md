# wxdouban
微信小程序，豆瓣demo，持续更新

# 准备工具
1.微信开发者工具：https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=1476197490095

2.微信开发文档：https://mp.weixin.qq.com/debug/wxadoc/dev/?t=1476434677599

3.豆瓣接口（测试版）：https://developers.douban.com/wiki/?title=api_v2

# 开发目的
熟悉微信小程序组件，接口，开发流程

# 项目需求

小程序用于浏览豆瓣电影，搜索电影，其中正在上映与即将上映为主要页面，经典电影查看豆瓣中评分靠前的电影，
列表点击可以查看电影详情

# 接口

### 首页使用接口

正在上映


```
/v2/movie/in_theaters
```


Request Properties:

Name | Type | Optional | Note
---|---|---|---
city | string  |  yes(default: 北京)  |  中文，如: “北京” 或者数字ID: 108288

Resources Properties:

Property | Description | Type | Basic | Advance | Premium | Default
---|---|---|---|---|---|---
start | start | int | N/A | Y | Y | 0
count | count | int | N/A | Y | Y | 20
total | 总数 | int | /A | Y | Y | 0
subject | 电影条目，见附录 | dict | N/A | Y | Y | -
title | 标题 | str | N/A | Y | Y | 正在上映的电影-北京

即将上映


```
/v2/movie/coming_soon
```


Request Properties:

Property | Description | Type | Basic | Advance | Premium | Default
---|---|---|---|---|---|---
start | start | int | Y | Y | N/A | 0
count | count | int | Y | Y | N/A | 20


Simple Subject Properties

Property | Description | Type | Basic | Advance | Premium | Default
---|---|---|---|---|---|---
id | 条目id | str | Y | Y | Y | -
title | 中文名 | str | Y | Y | Y | -
original_title | 原名 | str | Y | Y | Y | ''
alt | 条目URL | float(1) | Y | Y | Y | -
images | 电影海报图，分别提供288px x 465px(大)，96px x 155px(中) 64px x 103px(小)尺寸 | dict | Y | Y | 	Y | 	-
rating | 	评分，见附录|	dict|	Y|	Y|	Y|	-
pubdates|	如果条目类型是电影则为上映日期，如果是电视剧则为首播日期|	array|	N|	Y|	Y|	[]
year|	年代|	str|	Y|	Y|	Y|	''
subtype	|条目分类, movie或者tv|	str|	Y|	Y|	Y|	movie


### Top250页面使用接口


```
/v2/movie/top250
```


Request Properties:

Property|	Description	|Type|	Basic|	Advance	|Premium|	Default
---|---|---|---|---|---|---
start|	start|	int	|Y|	Y|	N/A|	0
count|	count|	int|	Y|	Y|	N/A	|10


Resources Properties:

Property|	Description|	Type|	Basic|	Advance|	Premium|	Default
---|---|---|---|---|---|---
start|	start|	int|	Y|	Y|	N/A|	0
count|	count|	int|	Y|	Y|	N/A|	10
total|	总数|	int|	Y|	Y|	N/A|	0
title|	排行榜名称|	str|	Y|	Y|	N/A|	-
subjects|	条目列表，见附录|	array|	Y|	Y|	N/A|	-

搜索页接口

```
/v2/movie/search
```

Request Properties:

Property|	Description|	Type|	Basic|	Advance|	Premium|	Default
---|---|---|---|---|---|---
q|	query| string|	str|	Y|	Y|	Y|	-
tag	|tag| query |string|	str|	Y|	Y|	Y|	-
start|	start|	int|	Y|	Y|	Y|	0
count|	count|	int|	Y|	Y|	Y|	20

Resources Properties:

Property|	Description|	Type|	Basic|	Advance|	Premium|	Default
---|---|---|---|---|---|---
start|	start|	int|	Y|	Y|	Y|	0
count|	count|	int|	Y|	Y|	Y|	20
total|	总数, Basic最多只返回20条记录|	int|Y|	Y|	Y|	0
query|	搜索字符串|	str|	Y|	Y|	Y|	-
tag|	搜索标签|	str|	Y|	Y|	Y|	-
subjects|	搜索结果列表，见附录|	array|	Y|	Y|	Y|	-
