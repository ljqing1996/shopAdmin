<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="logo"></div>
        <div class="logout">
          欢迎光临
          <a href="javascript:;" @click="logout">退出</a>
        </div>
        <div class="title">
          <h3>电商后台管理系统</h3>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- el-menu: 导航菜单的组件 -->
          <!-- default-active：默认高亮的菜单 -->
          <!-- open close 展开和关闭的事件 -->

          <!-- el-submenu: 子菜单 -->
          <!-- el-menu-item-group: 子菜单中分组 -->
          <!-- el-menu-item：子菜单中的每一项 -->
          <!-- unique-opened: 保证只能打开一个子菜单 -->
          <!-- router: 如果router为true，那么index就会作为路由的连接 -->
          <el-menu
            unique-opened
            router
            :default-active="$route.path.split('-')[0]"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu :index="'/'+l1.path" v-for="l1 in menusList" :key="l1.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{l1.authName}}</span>
              </template>
              <!-- 当给el-menu指定了router -->
              <el-menu-item :index="'/'+l2.path" v-for="l2 in l1.children" :key="l2.id">
                <i class="el-icon-menu"></i>
                <span slot="title">{{l2.authName}}</span>
              </el-menu-item>
            </el-submenu>

          </el-menu>
        </el-aside>
        <el-main>
          <!-- 显示home组件的子组件， 子组件的出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menusList: []
    }
  },
  methods: {
    // 退出功能
    async logout () {
      try {
        await this.$confirm('你确定要退出系统吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 1. 删除localStorage中的myToken
        localStorage.removeItem('myToken')
        // 2. 跳转到登录组件
        this.$router.push('login')
        // 3. 给一个退出的提示
        this.$message.success('退出成功了')
      } catch (e) {
        this.$message({
          type: 'info',
          message: '退出取消了'
        })
      }
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 左侧菜单
    async getMenus () {
      // 获取菜单
      const res = await this.axios.get('menus')
      console.log(res)
      if (res.data.meta.status === 200) {
        this.menusList = res.data.data
      }
    }
  },
  created () {
    this.getMenus()
  }

}
</script>

<style lang="less">
.home {
  height: 100%;
  > .el-container {
    height: 100%;
  }
  .el-header {
    background-color: #b3c1cd;
    .logo {
      float: left;
      width: 180px;
      height: 60px;
      background: url(../assets/logo.png) no-repeat center center;
      background-size: contain;
    }

    .logout {
      float: right;
      width: 180px;
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      font-weight: 700;
      text-align: right;

      a {
        color: darkorange;
      }
    }

    .title {
      overflow: hidden;
      height: 60px;
      line-height: 60px;
      color: #fff;
      text-align: center;
      font-size: 24px;
    }
  }

  .el-aside {
    background-color: #545C64;
    .el-submenu {
      width: 200px;
    }
  }

  .el-main {
    background-color: #EAEEF1;
  }
}
</style>
