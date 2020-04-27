<template>
  <div class="PageQuerySearch">
    <div class="query-bar">
      <el-select v-model="mixin_query.channel" placeholder="请选择下单渠道">
        <el-option label="下单渠道-全部" value="0" />
        <el-option label="下单渠道-客户端" value="1" />
        <el-option label="下单渠道-PC网站" value="2" />
        <el-option label="下单渠道-微信小程序" value="3" />
        <el-option label="下单渠道-微信网页" value="4" />
      </el-select>
      <el-select v-model="mixin_query.pay" placeholder="请选择支付方式">
        <el-option label="支付方式-全部" value="0" />
        <el-option label="支付方式-借记卡" value="1" />
        <el-option label="支付方式-信用卡" value="2" />
        <el-option label="支付方式-会员积分" value="3" />
      </el-select>
      <el-select v-model="mixin_query.area" placeholder="请选择地区">
        <el-option label="地区-全部" value="0" />
        <el-option label="地区-大陆" value="1" />
        <el-option label="地区-港澳台" value="2" />
        <el-option label="地区-海外" value="3" />
      </el-select>
      <el-select v-model="mixin_query.sex" placeholder="请选择性别">
        <el-option label="性别-全部" value="0" />
        <el-option label="性别-男" value="1" />
        <el-option label="性别-女" value="2" />
      </el-select>
      <el-input v-model="search" placeholder="请输入手机号" />
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <el-tabs v-model="mixin_query.type" type="card">
      <el-tab-pane label="待付款">
        <el-table :data="list" border stripe>
          <el-table-column type="index" prop="order_num" label="序号" align="center" width="88px" :index="index => mixin_query.size * (mixin_query.page - 1) + index + 1" />
          <el-table-column prop="order_num" label="订单号" align="center" />
          <el-table-column prop="time" label="下单时间" align="center" />
          <el-table-column prop="nickname" label="用户昵称" align="center" />
          <el-table-column prop="shop" label="商家名称" align="center" />
          <el-table-column prop="name" label="商品名称" align="center" />
          <el-table-column prop="num" label="数量/单位" align="center" />
          <el-table-column prop="price" label="订单价值/元" align="center" />
          <el-table-column prop="address" label="收货地址" align="center" />
          <el-table-column prop="remark" label="订单备注" align="center" />
        </el-table>
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
      :current-page="mixin_query.page"
      :page-sizes="[10, 15, 20]"
      :page-size="mixin_query.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="val => mixin_query.size = val"
      @current-change="val => mixin_query.page = val"
    />
  </div>
</template>

<script>
import { api_getList } from '@/api/query'
import queryMixin from '@/mixin/query'
export default {
  name: 'PageQuerySearch',
  mixins: [queryMixin],
  props: {},
  data() {
    return {
      list: [],
      total: 0,
      search: '',
      mixin_func: api_getList,
      mixin_query: {
        page: 1,
        size: 15,
        type: '0',
        pay: '0',
        area: '0',
        sex: '0',
        channel: '0'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/public.scss';
  .PageQuerySearch {
    padding: 2px;
    position: relative;
    box-sizing: border-box;
    .query-bar {
      top: 2px;
      right: 2px;
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
    .el-tabs {
      >>> .el-tabs__header {
        margin-bottom: 2px;
      }
    }
  }
</style>
