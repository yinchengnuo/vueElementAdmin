<template>
  <div class="PageQuerySearch">
    <div class="query-bar">
      <el-select v-model="mixin_query.channel" placeholder="请选择下单渠道">
        <el-option v-for="item in channel" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="mixin_query.pay" placeholder="请选择支付方式">
        <el-option v-for="item in pay" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="mixin_query.area" placeholder="请选择地区">
        <el-option v-for="item in area" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="mixin_query.sex" placeholder="请选择性别">
        <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="search" placeholder="请输入手机号" />
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <el-tabs v-model="mixin_query.type" type="card">
      <el-tab-pane v-for="item in type" :key="item" :label="item">
        <el-table :data="list" border stripe>
          <el-table-column type="index" prop="order_num" label="序号" align="center" width="82px" :index="index => mixin_query.size * (page - 1) + index + 1" />
          <el-table-column prop="order_num" label="订单号" align="center" width="140" />
          <el-table-column prop="time" label="下单时间" align="center" width="160" />
          <el-table-column label="下单渠道" align="center" width="98">
            <template slot-scope="scope">{{ channel[scope.row.channel].label.split('-')[1] }}</template>
          </el-table-column>
          <el-table-column label="支付方式" align="center" width="98">
            <template slot-scope="scope">{{ pay[scope.row.pay].label.split('-')[1] }}</template>
          </el-table-column>
          <el-table-column label="地区" align="center" width="98">
            <template slot-scope="scope">{{ area[scope.row.area].label.split('-')[1] }}</template>
          </el-table-column>
          <el-table-column label="性别" align="center" width="98">
            <template slot-scope="scope">{{ sex[scope.row.sex].label.split('-')[1] }}</template>
          </el-table-column>
          <el-table-column prop="nickname" label="用户昵称" align="center" width="120" />
          <el-table-column label="用户头像" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.avatar" :alt="scope.row.nickname">
            </template>
          </el-table-column>
          <el-table-column prop="shop" label="商家名称" align="center" width="160" />
          <el-table-column prop="name" label="商品名称" align="center" width="140" />
          <el-table-column prop="num" label="数量/单位" align="center" width="98" />
          <el-table-column prop="price" label="订单价值/元" align="center" width="98" />
          <el-table-column prop="address" label="收货地址" align="center" width="240" />
          <el-table-column prop="remark" label="订单备注" align="center" width="240" />
          <el-table-column fixed="right" align="center" width="60">
            <template slot="header">
              <i class="el-icon-s-operation" style="transform:rotate(90deg)" />
            </template>
            <template>
              <el-popover placement="left" width="60" trigger="hover">
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text">取消</el-button>
                  <el-button type="primary" size="mini">确定</el-button>
                </div>
                <i slot="reference" class="el-icon-more cursor" />
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-pagination
      background
      :total="total"
      :current-page="page"
      :page-sizes="[10, 15, 20]"
      :page-size="mixin_query.size"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="val => page = val"
      @size-change="val => mixin_query.size = val"
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
      type: ['待付款', '待发货', '待收货', '待评价', '已评价', '待退货', '已退货', '全部订单'],
      channel: [
        { label: '下单渠道-全部', value: '0' },
        { label: '下单渠道-客户端', value: '1' },
        { label: '下单渠道-PC网站', value: '2' },
        { label: '下单渠道-微信小程序', value: '3' },
        { label: '下单渠道-微信网页', value: '4' }
      ],
      pay: [
        { label: '支付方式-全部', value: '0' },
        { label: '支付方式-借记卡', value: '1' },
        { label: '支付方式-信用卡', value: '2' },
        { label: '支付方式-会员积分', value: '3' }
      ],
      area: [
        { label: '地区-全部', value: '0' },
        { label: '地区-大陆', value: '1' },
        { label: '地区-港澳台', value: '2' },
        { label: '地区-海外', value: '3' }
      ],
      sex: [
        { label: '性别-全部', value: '0' },
        { label: '性别-男', value: '1' },
        { label: '性别-女', value: '2' }
      ],
      list: [],
      total: 0,
      search: '',
      page: 1,
      mixin_func: api_getList,
      mixin_query: {
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
    .el-table {
      >>> .cell {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
</style>
