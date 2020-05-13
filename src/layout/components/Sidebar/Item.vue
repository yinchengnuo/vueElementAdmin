<template>
  <div class="MenuItem">
    <svg-icon v-if="icon" :icon-class="icon" />
    <span v-if="title" slot="title">{{ title }}</span>
    <div v-if="unreadMessageNum" class="unread-message-number">{{ unreadMessageNum > 99 ? '99+' : unreadMessageNum }}</div>
  </div>
</template>
<script>
export default {
  name: 'MenuItem',
  props: {
    icon: { type: String, default: '' },
    title: { type: String, default: '' },
    page: { type: Boolean, default: true },
    item: { type: Object, default: () => {} }
  },
  computed: {
    unreadMessageNum() {
      const childrenPage = []
      const getPages = children => {
        children.forEach(e => {
          if (e.children) {
            getPages(e.children)
          } else {
            if (e.name) {
              childrenPage.push(e.name)
            }
          }
        })
      }
      if (this.item.children) {
        getPages(this.item.children)
      } else {
        if (this.item.name) {
          childrenPage.push(this.item.name)
        }
      }
      return childrenPage.reduce((t, e) => t + (this.$store.state.unreadMessage.find(item => item.name === e) ? this.$store.state.unreadMessage.find(item => item.name === e).num : 0), 0)
    }
  },
  created() {
    if (this.page && !this.$store.state.unreadMessage.find(e => e.name === this.item.name)) {
      this.$store.commit('unreadMessage/INIT_ADD', {
        num: 0,
        title: this.title,
        name: this.item.name
      })
    }
  }
}
</script>
<style lang="scss" scpoed>
@import '@/styles/public.scss';
.MenuItem {
  .unread-message-number {
    position: absolute;
    top: 50%;
    right: 32px;
    height: 16px;
    padding: 0 4px;
    font-size: 12px;
    min-width: 16px;
    color: #FFFFFF;
    line-height: 13.5px;
    text-align: center;
    background: red;
    font-weight: bold;
    border-radius: 16px;
    transform: translateY(-50%);
  }
}
</style>
