<template>
    <div class="container">
        <el-card>
            <div slot="header">
                <my-bread>粉丝管理</my-bread>
            </div>
            <!-- tab组件 -->
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="粉丝列表" name="list">
                  <div class="fans-list">
                    <div class="fans-item" v-for="item in fansList" :key="item.id.toString()">
                      <el-avatar style="width:80px;height:80px" :src="item.photo"></el-avatar>
                      <p style="font-size:12px">{{item.name}}</p>
                      <el-button size="mini" plain type="primary">+关注</el-button>
                    </div>
                  </div>
                  <!-- 分页 -->
                  <el-pagination
                      style="margin-top:20px"
                      v-if="total > reqParams.per_page"
                      background
                      layout="prev, pager, next"
                      :total="total"
                      :page-size="reqParams.per_page"
                      :current-page="reqParams.page"
                      @current-change="changePager"
                 ></el-pagination>
                </el-tab-pane>
                <el-tab-pane label="粉丝画像" name="photo">
                  柱状图
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'list',
      reqParams: {
        page: 1,
        per_page: 24
      },
      fansList: [],
      total: 0
    }
  },
  created () {
    this.getFansList()
  },
  methods: {
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getFansList()
    },
    async getFansList () {
      const {
        data: { data }
      } = await this.$http.get('followers', { params: this.reqParams })
      this.fansList = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
    .fans-item{
        text-align: center;
        width: 180px;
        height: 180px;
        border:1px dashed #ddd;
        display: inline-block;
        margin-right: 50px;
        margin-bottom: 20px;
        padding-top: 15px;
    }
</style>
