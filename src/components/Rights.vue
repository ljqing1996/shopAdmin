<template>
<div class="rights">
  <!-- 面包屑导航 -->
  <el-breadcrumb>
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 权限列表 -->
  <el-table
    :data="rightList"
    style="width: 100%">
    <!-- 显示索引号 type="index" -->
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径">
    </el-table-column>
    <el-table-column
      label="层级">
      <template slot-scope="scope">
        <span v-if="scope.row.level == 0">一级</span>
        <span v-else-if="scope.row.level == 1">二级</span>
        <span v-else>三级</span>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  data () {
    return {
      rightList: []
    }
  },
  methods: {
    async getRightList () {
      const res = await this.axios.get('rights/list')
      const {meta, data} = res.data
      if (meta.status === 200) {
        this.rightList = data
      }
    }
  },
  created () {
    this.getRightList()
  }
}
</script>

<style>
.el-breadcrumb{
  height: 30px;
  line-height: 30px;
  font-size: 16px;
}
</style>
