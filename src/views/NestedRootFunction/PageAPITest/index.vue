<template>
  <div class="PageAPITest">
    <div @click="click">PageAPITest</div>
    <TestSlot>
      <template #header="{ num }">
        <h1>获取到了子组件的数据：{{ num }}</h1>
      </template>
    </TestSlot>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="id" />
      <el-table-column label="商品名称" prop="name" />
      <el-table-column label="描述" prop="desc" />
    </el-table>
  </div>
</template>

<script>
import TestSlot from './components/TestSlot'
export default {
  name: 'PageAPITest',
  components: { TestSlot },
  props: {},
  data() {
    return {
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }]
    }
  },
  created() {},
  mounted() {
    const promise = new Promise(resolve => setTimeout(() => resolve('3秒到了'), 3000))
    promise.then = Promise.prototype.then
    const proxy = new Proxy(promise, {
      get(target, key) {
        return Reflect.get(target, key).bind(promise)
      }
    })
    proxy.then(res => console.log(res))
    // console.log(proxy.then)
    // const a = proxy.then
    // a()
  },
  methods: {
    click() {
      this.tableData[0].id += '+'
      console.log(this.tableData[0])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/public.scss';
  .PageAPITest {
    padding: 8px;
    box-sizing: border-box;
    height: calc(100vh - 84px);
  }
</style>
