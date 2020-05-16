<template>
  <div class="PageIpWhitelist">
    <el-table :data="ipList" border stripe>
      <el-table-column label="IP" prop="ip" align="center">
        <template slot-scope="{ row: { ip } }">
          <el-tag type="success">{{ ip }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" align="center" />
      <el-table-column label="IP" prop="ip" align="center" width="88">
        <template slot="header">
          <el-button type="primary" size="mini">新建</el-button>
        </template>
        <template>
          <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'PageIpWhitelist',
  props: {},
  data() {
    return {
      ipList: [
        {
          ip: 'XXX.XX.XXX.XXX',
          remark: '公司内网'
        },
        {
          ip: 'XXX.XX.XXX.XXX',
          remark: '值班人员A'
        },
        {
          ip: 'XXX.XX.XXX.XXX',
          remark: '值班人员B'
        },
        {
          ip: 'XXX.XX.XXX.XXX',
          remark: '值班人员C'
        }
      ]
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/public.scss';
  .PageIpWhitelist {
    padding: 8px;
    overflow: auto;
    @include flex(column);
    box-sizing: border-box;
    height: calc(100vh - 84px);
    .el-table {
      width: 370px;
      flex: 0 0 auto;
    }
  }
</style>
