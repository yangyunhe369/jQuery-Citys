<template>
<div id="app">
  <h1>{{h1_title[0]}}<br><br>{{h1_title[1]}}<br><br>{{h1_title[2]}}</h1>
  <div class="code">
    <p>调用省市区三级联动插件：</p>
    <p class="mb20">
      首先js文件夹里需包含json文件 — <b>jquery-citys.json</b>，<br>
      再引入插件js文件 — <b>jquery-citys.js</b>
    </p>
    <p>注意:由于本页面包含的AJAX方法涉及到 <b>跨域</b> 问题，在本地测试时，须通过服务器环境运行，类似这样：<br>  http://127.0.0.1:8888/index.html</p>
  </div>
  <div class="main">
    <div class="citys mb20" id="demo1">
      <select v-for="item in city_nameArr" class="city-select" :name="item"></select>
    </div>
    <div class="code">
      <p>默认参数初始化设置</p>
      <p>$('#demo1').citys();</p>
    </div>
    <div class="citys mb20" id="demo2">
      <select v-for="item in city_nameArr" class="city-select" :name="item"></select>
    </div>
    <div class="code">
      <p>通过地区编码初始化设置</p>
      <p>$('#demo2').citys({code: '510116'});</p>
    </div>
    <div class="citys mb20" id="demo3">
      <select v-for="item in city_nameArr" class="city-select" :name="item"></select>
    </div>
    <div class="code">
      <p>通过地区名称初始化设置，并且下拉框值为地区名称</p>
      <p>$('#demo3').citys({type: 'name',province: '四川省',city: '成都市',area: '武侯区'});</p>
    </div>
  </div>
  <div class="example">
    <div class="code">
      <p><b>常用参数调用示例</b></p><br>
      <pre>
  Html:
  &lt;div class="citys" id="citys"&gt;
    &lt;select class="city-select" name="province"&gt;&lt;/select&gt;
    &lt;select class="city-select" name="city"&gt;&lt;/select&gt;
    &lt;select class="city-select" name="area"&gt;&lt;/select&gt;
  &lt;/div&gt;

  Javascript:
  $('#citys').citys(options);</pre>
    </div>
    <h2> options参数</h2>
    <table class="options_table">
      <thead>
        <tr>
          <th style="width:150px">参数</th>
          <th style="width:200px">默认值</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>url</td>
          <td>"js/jquery-citys.json"</td>
          <td>省市区json数据地址，不可更改</td>
        </tr>
        <tr>
          <td>selProvince</td>
          <td>"province"</td>
          <td>省份、直辖市列表框的name</td>
        </tr>
        <tr>
          <td>selCity</td>
          <td>"city"</td>
          <td>城市列表框的name</td>
        </tr>
        <tr>
          <td>selArea</td>
          <td>"area"</td>
          <td>区、县列表框的name</td>
        </tr>     
        <tr>
          <td>type</td>
          <td>"code"</td>
          <td>下拉框值的类型,code行政区划代码,name地名</td>
        </tr>       
        <tr>
          <td>code</td>
          <td>0</td>
          <td>地区编码</td>
        </tr>      
        <tr>
          <td>province</td>
          <td>无</td>
          <td>省份(省级),可以为地区编码或者名称</td>
        </tr>      
        <tr>
          <td>city</td>
          <td>无</td>
          <td>城市(地级),可以为地区编码或者名称</td>
        </tr>      
        <tr>
          <td>area</td>
          <td>无</td>
          <td>地区(县区级),可以为地区编码或者名称</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      h1_title: [
        `基于jQuery的省市区三级联动插件，数据来源于国家统计局行政规划代码数据，真实有效。`,
        `作者：弦云孤赫(David Yang) Yang&nbsp;&nbsp;&nbsp;&nbsp;联系方式—QQ：314786482`,
        `温馨提示：作者开源不易，希望使用本插件时，能署名作者，感谢支持。`
      ],
      city_nameArr: ['province','city','area']
    }
  },
  mounted () {
    /*demo1
    ***默认设置
    */
    $('#demo1').citys();
    /*demo2
    ***根据区划代码初始化
    */
    $('#demo2').citys({
      code: '510116'
    });
    /*demo3
    ***根据地区名称进行初始化
    */
    $('#demo3').citys({
      type: 'name',
      province: '四川省',
      city: '成都市',
      area: '武侯区'
    });
  }
}

</script>
<style src="./css/common.css" lang="css"></style>
<style lang="scss">
.main{
  width: 960px;
  margin: 50px auto 0;
}
.citys .city-select{
  color: black;
  cursor: default;
  margin: 0 5px;
  width: auto;
  height: 100%;
  padding: 6px 12px;
  font-size: 14px;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  &:focus{ 
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
  }
}
</style>
