<template>
  <div>{{name}}</div>
</template>

<script>
import { getUserName } from '../helper'
export default {
  name: 'mainPageIndex',
  data() {
    return {
      name: ''
    }
  },
  onLoad() {
    this.name = getUserName()
  }
}
</script>

<style>

</style>