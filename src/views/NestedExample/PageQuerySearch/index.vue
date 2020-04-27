<template>
  <div class="PageQuerySearch">
    <div class="query-bar">
      <el-select v-model="query.pay" placeholder="请选择支付方式">
        <el-option label="支付方式-全部" value="0" />
        <el-option label="支付方式-借记卡" value="1" />
        <el-option label="支付方式-信用卡" value="2" />
        <el-option label="支付方式-会员积分" value="3" />
      </el-select>
      <el-select v-model="query.area" placeholder="请选择地区">
        <el-option label="地区-全部" value="0" />
        <el-option label="地区-大陆" value="1" />
        <el-option label="地区-港澳台" value="2" />
        <el-option label="地区-海外" value="3" />
      </el-select>
      <el-select v-model="query.sex" placeholder="请选择性别">
        <el-option label="性别-全部" value="0" />
        <el-option label="性别-男" value="1" />
        <el-option label="性别-女" value="2" />
      </el-select>
      <el-input v-model="search" placeholder="请输入手机号" />
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <el-tabs v-model="query.type" type="card">
      <el-tab-pane label="待付款">
        123
      </el-tab-pane>
      <el-tab-pane label="待发货">
        123
      </el-tab-pane>
      <el-tab-pane label="待收货">
        123
      </el-tab-pane>
      <el-tab-pane label="待评价">
        123
      </el-tab-pane>
      <el-tab-pane label="已评价">
        123
      </el-tab-pane>
      <el-tab-pane label="待退货">
        123
      </el-tab-pane>
      <el-tab-pane label="已退货">
        123
      </el-tab-pane>
      <el-tab-pane label="全部订单">
        123
      </el-tab-pane>
    </el-tabs>
    <el-pagination
      background
      :current-page="page"
      :page-sizes="[10, 15, 20]"
      :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="val => query.size = val"
      @current-change="val => page = val"
    />
  </div>
</template>

<script>
export default {
  name: 'PageQuerySearch',
  props: {},
  data() {
    return {
      search: '',
      page: 1,
      query: {
        type: '0',
        pay: '0',
        area: '0',
        sex: '0',
        size: 15
      }
    }
  },
  watch: {
    page() {
      console.log(this.page)
    }
  },
  mounted() {},
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .PageQuerySearch {
    padding: 8px;
    position: relative;
    box-sizing: border-box;
    .query-bar {
      top: 8px;
      right: 8px;
      z-index: 1;
      height: 40px;
      display: flex;
      position: absolute;
      align-items: center;
      .el-select, .el-input {
        width: 170px;
        margin-right: 8px;
      }
    }
    .el-pagination {
      text-align: center;
    }
  }
</style>
