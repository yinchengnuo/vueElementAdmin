<template>
  <div class="NestedRootFunction">
    <div class="md">
      <span style="color: red;">*</span>
      部分后台可能会用到一些权重极高的功能，如设置后台可登陆时间、重大活动设置等，有时候这些权限不能分配，只有 root 用户才有。
      还有一种情况就是后台需要暴露一些配置项给前端用于开发调试，这些功能页面只能开发人员才有。
      因此，当需要一些不可配置给下级的权限时，可以考虑将页面放在这里。当然，具体情况也要看实际业务需求。
    </div>
  </div>
</template>

<script>
export default {
  name: 'NestedRootFunction',
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/public.scss';
  .NestedRootFunction {
    padding: 8px;
    overflow: auto;
    @include flex();
    box-sizing: border-box;
    height: calc(100vh - 84px);
    .md {
      width: 345px;
      line-height: 2;
    }
  }
</style>
