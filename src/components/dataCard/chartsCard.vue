<template>
  <Card style="border-radius: 0;">
    <p slot="title">{{ title }}</p>
    <div slot="extra">
      <Icon type="md-refresh" :size="18" style="margin-left: 6px;"
            @click="refresh"/>
    </div>
    <slot name="charts"></slot>
  </Card>
</template>

<script>
export default {
  name: 'ChartsCard',
  props: {
    title: String,
  },
  methods: {
    refresh() {
      this.$emit('refresh');
    }
  },
}
</script>

<style scoped>

</style>
