<template>
<div class="bottom-wrap">
  <div class="wrap wrap-left">
    <ImgTitle :text="'热站二次供温'">
      <div class="title" @click="handleEventCaptureLeft($event)">
        <span :class="{'title-cur': activeName}">超供</span>
        <span :class="{'title-cur': !activeName}">欠供</span>
      </div>
    </ImgTitle>
    <div class="table-head">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr class="table-title">
          <td style="width:60px;">序号</td>
          <td style="width:150px;">机组简称</td>
          <td style="width:95px;">实际值</td>
          <td style="width:95px;">理论值</td>
          <td style="width:100px;">理论差</td>
        </tr>
      </table>
    </div>
    <div class="table-body1">
      <table v-if="activeName" ref="text1" border="0" cellspacing="0" cellpadding="0" @mouseover="handleMouseOverOne" @mouseleave="handleMouseLeaveOne">
        <tr class="table-text" v-for="(item, index) in stationTableData1" :key="index + '1'">
          <td style="width:60px;">{{ index + 1 }}</td>
          <el-tooltip :disabled="!item.CONNAME" effect="dark" :content="item.CONNAME" placement="top">
            <td style="width:150px" class="td-icon">
              <div class="text-icon-box"
                :style="{
                  color:
                    item.ISONLINE === '离线'
                      ? 'red'
                      : item.ALARMSTATE == 0 || item.ALARMSTATE == 5
                      ? ''
                      : 'rgb(213, 161, 39)' }"
              >{{ !item.CONNAME ? '--' : item.CONNAME }}</div>
              <i class="text-icon iconfont iconyunhangtu fr" @click="handleOpenWindow(item)"></i>
            </td>
          </el-tooltip>
          <td style="width:95px;">{{ !item.TEMP_SECSUP ? '--' : item.TEMP_SECSUP}}</td>
          <td style="width:95px;">{{ !item.HEATLOAD ? '--' : item.HEATLOAD}}</td>
          <td style="width:100px;">{{ !item.DIFFER ? '--' : item.DIFFER }}</td>
        </tr>
      </table>
      <table v-if="!activeName" ref="text2" border="0" cellspacing="0" cellpadding="0" @mouseover="handleMouseOverTwo" @mouseleave="handleMouseLeaveTwo">
        <tr class="table-text" v-for="(item, index) in stationTableData2" :key="index + '2'">
          <td style="width:60px;">{{ index + 1 }}</td>
          <el-tooltip :disabled="!item.CONNAME" effect="dark" :content="item.CONNAME" placement="top">
            <td style="width:150px" class="td-icon">
              <div class="text-icon-box"
                :style="{
                  color:
                    item.ISONLINE === '离线'
                      ? 'red'
                      : item.ALARMSTATE == 0 || item.ALARMSTATE == 5
                      ? ''
                      : 'rgb(213, 161, 39)' }"
              >{{ !item.CONNAME ? '--' : item.CONNAME }}</div>
              <i class="text-icon iconfont iconyunhangtu fr" @click="handleOpenWindow(item)"></i>
            </td>
          </el-tooltip>
          <td style="width:95px;">{{ !item.TEMP_SECSUP ? '--' : item.TEMP_SECSUP}}</td>
          <td style="width:95px;">{{ !item.HEATLOAD ? '--' : item.HEATLOAD}}</td>
          <td style="width:100px;">{{ !item.DIFFER ? '--' : item.DIFFER }}</td>
        </tr>
      </table>
    </div>
  </div>
  <div class="wrap wrap-right">
    <ImgTitle :text="'用户室温'">
      <div class="title" @click="handleEventCaptureRight($event)">
        <span :class="{'title-cur': activeName2}">超温</span>
        <span :class="{'title-cur': !activeName2}">低温</span>
      </div>
    </ImgTitle>
    <div class="table-head">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr class="table-title">
          <td style="width:60px;">序号</td>
          <td style="width:100px;">小区</td>
          <td style="width:95px;">住户</td>
          <td>位置</td>
          <td>室温</td>
          <td>小区均温</td>
        </tr>
      </table>
    </div>
    <div class="table-body2">
      <table v-if="activeName2" ref="text3" border="0" cellspacing="0" cellpadding="0" @mouseover="handleMouseOverThree" @mouseleave="handleMouseLeaveThree">
        <tr class="table-text" v-for="(item, index) in roomTableData1" :key="index + '3'">
          <td style="width:60px;">{{ index + 1 }}</td>
          <el-tooltip :disabled="!item.COMMUNITYNAME" effect="dark" :content="item.COMMUNITYNAME" placement="top">
            <td style="width:100px;">{{ !item.COMMUNITYNAME ? '--' : item.COMMUNITYNAME }}</td>
          </el-tooltip>
          <el-tooltip :disabled="!item.COMMUNITYNAME" effect="dark" :content="item.HOUSEHOLD" placement="top">
            <td style="width:86px;">{{ !item.HOUSEHOLD ? '--' : item.HOUSEHOLD}}</td>
          </el-tooltip>
          <td>{{ !item.ROOMLOCATIONNAME ? '--' : item.ROOMLOCATIONNAME}}</td>
          <td>{{ !item.ROOMTEMP ? '--' : item.ROOMTEMP }}</td>
          <td>{{ !item.AVGINDTEMP ? '--' : item.AVGINDTEMP }}</td>
        </tr>
      </table>
      <table v-if="!activeName2" ref="text4" border="0" cellspacing="0" cellpadding="0" @mouseover="handleMouseOverFour" @mouseleave="handleMouseLeaveFour">
        <tr class="table-text" v-for="(item, index) in roomTableData2" :key="index + '4'">
          <td style="width:60px;">{{ index + 1 }}</td>
          <el-tooltip :disabled="!item.COMMUNITYNAME" effect="dark" :content="item.COMMUNITYNAME" placement="top">
            <td style="width:100px;">{{ !item.COMMUNITYNAME ? '--' : item.COMMUNITYNAME }}</td>
          </el-tooltip>
          <el-tooltip :disabled="!item.COMMUNITYNAME" effect="dark" :content="item.HOUSEHOLD" placement="top">
            <td style="width:86px;">{{ !item.HOUSEHOLD ? '--' : item.HOUSEHOLD}}</td>
          </el-tooltip>
          <td>{{ !item.ROOMLOCATIONNAME ? '--' : item.ROOMLOCATIONNAME}}</td>
          <td>{{ !item.ROOMTEMP ? '--' : item.ROOMTEMP }}</td>
          <td>{{ !item.AVGINDTEMP ? '--' : item.AVGINDTEMP }}</td>
        </tr>
      </table>
    </div>
  </div>
</div>

</template>
 
<script>
import ImgTitle from './ImgTitle.vue'
export default {
  components: {
    ImgTitle
  },
  data() {
    return {
      activeName: true,
      activeName2: true,
      stationTableData1: [],
      stationTableData2: [],
      roomTableData1: [],
      roomTableData2: [],
      dataInterval: null,
      time1: null,
      time2: null,
      time3: null,
      time4: null
    }
  },
  mounted () {
    this.initRefreshTime()
  },
  beforeDestroy() {
    window.clearInterval(this.dataInterval)
  },
  methods: {
    handleMouseOverOne(){
      window.clearInterval(this.time1)
    },
    handleMouseLeaveOne(){
      this.scroll1()
    },
    handleMouseOverTwo(){
      window.clearInterval(this.time2)
    },
    handleMouseLeaveTwo(){
      this.scroll2()
    },
    handleMouseOverThree(){
      window.clearInterval(this.time3)
    },
    handleMouseLeaveThree(){
      this.scroll3()
    },
    handleMouseOverFour(){
      window.clearInterval(this.time4)
    },
    handleMouseLeaveFour(){
      this.scroll4()
    },        
    handleOpenWindow(item){
      if (window.JsObj) {
          JsObj.DisplayRunMapWinform(6, item.CONID);
      }
    },
    handleEventCaptureLeft(event) {
      if (event.target.textContent === '超供') {
        if (this.activeName) return // 防止重复点击
        if ( this.stationTableData1.length === 0 ) {
          this.$message.warning('暂无数据');
          return;
        }
        this.activeName = true
        this.$nextTick(() => {
          this.$refs.text1.style.top = '0px'
          this.scroll1();
        })
      } else if (event.target.textContent === '欠供') {
        if (!this.activeName) return // 防止重复点击
        if ( this.stationTableData2.length === 0 ) {
          this.$message.warning('暂无数据');
          return;
        }
        this.activeName = false
        this.$nextTick(() => {
          this.$refs.text2.style.top = '0px'
          this.scroll2();
        })
      }
    },
    handleEventCaptureRight(event) {
      if (event.target.textContent === '超温') {
        if (this.activeName2) return // 防止重复点击
        if ( this.roomTableData1.length === 0 ) {
          this.$message.warning('暂无数据');
          return;
        }
        this.activeName2 = true
        this.$nextTick(() => {
          this.$refs.text3.style.top = '0px'
          this.scroll3();
        })
      } else if (event.target.textContent === '低温') {
        if (!this.activeName2) return
        if ( this.roomTableData2.length === 0 ) {
          this.$message.warning('暂无数据');
          return;
        }
        this.activeName2 = false
        this.$nextTick(() => {
          this.$refs.text4.style.top = '0px'
          this.scroll4();
        })
      }
    },
    scroll1() {
      window.clearInterval(this.time1)
      window.clearInterval(this.time2)
      this.$nextTick(() => {
        let top = this.$refs.text1.offsetTop || 0
        let tdHeight = this.$refs.text1.getBoundingClientRect().height
        console.log(top, tdHeight)
        this.time1 = setInterval(() => {
          if (  Math.abs(top) > tdHeight - 120 ) { // 120为三个td行高度和
            top = 0
            if ( this.stationTableData2.length === 0 ) return
            this.activeName = false
            this.scroll2();
          }
          top -= 1
          this.$refs.text1.style.top = top + 'px'
        }, 50)
        this.$once('hook:beforeDestroy', function () {
          window.clearInterval(this.time1)
        })
      })
    },
    scroll2() {
      window.clearInterval(this.time1)
      window.clearInterval(this.time2)
      this.$nextTick(() => {
        let top = this.$refs.text2.offsetTop || 0
        let tdHeight = this.$refs.text2.getBoundingClientRect().height
        this.time2 = setInterval(() => {
          if (  Math.abs(top) > tdHeight - 120 ) {
            top = 0
            if ( this.stationTableData1.length === 0 ) return
            this.activeName = true
            this.scroll1();
          }
          top -= 1
          this.$refs.text2.style.top = top + 'px'
        }, 50)
        this.$once('hook:beforeDestroy', function () {
          window.clearInterval(this.time2)
        })
      })
    },
    scroll3() {
      window.clearInterval(this.time3)
      window.clearInterval(this.time4)
      this.$nextTick(() => {
        let top = this.$refs.text3.offsetTop || 0
        let tdHeight = this.$refs.text3.getBoundingClientRect().height
        this.time3 = setInterval(() => {
          if (  Math.abs(top) > tdHeight - 120 ) { // 120为三个td行高度和
            top = 0
            if ( this.roomTableData2.length === 0 ) return
            this.activeName2 = false
            this.scroll4();
          }
          top -= 1
          this.$refs.text3.style.top = top + 'px'
        }, 50)
        this.$once('hook:beforeDestroy', function () {
          window.clearInterval(this.time3)
        })
      })
    },
    scroll4() {
      window.clearInterval(this.time3)
      window.clearInterval(this.time4)
      this.$nextTick(() => {
        let top = this.$refs.text4.offsetTop || 0
        let tdHeight = this.$refs.text4.getBoundingClientRect().height
        this.time4 = setInterval(() => {
          if (  Math.abs(top) > tdHeight - 120 ) {
            top = 0
            if ( this.roomTableData1.length === 0 ) return
            this.activeName2 = true
            this.scroll3();
          }
          top -= 1
          this.$refs.text4.style.top = top + 'px'
        }, 50)
        this.$once('hook:beforeDestroy', function () {
          window.clearInterval(this.time4)
        })
      })
    },
    getTableData() {
      window.clearInterval(this.time1) // 请求接口时停止上一次计时
      window.clearInterval(this.time2)
      window.clearInterval(this.time3)
      window.clearInterval(this.time4)
      this.$get("Cockpit/GetStationRunStateData").then((res) => {
        if (!res.isError && res.data) {
          this.stationTableData1 = res.data.Exceed
          this.stationTableData2 = res.data.Messing
          if (this.stationTableData1.length === 0 && this.stationTableData2.length !== 0 ) { // 判断初始化时有无数据来滚动哪一个table
            this.activeName = false
            this.$nextTick(() => {
              this.scroll2()
            })
            return
          }
          if (this.activeName) {
            this.$nextTick(() => {
              this.scroll1()
            })
          } else {
            this.$nextTick(() => {
              this.scroll2()
            })
          }
        } else {
          console.log("没有获取到数据");
        }
      });
      this.$get("Cockpit/GetCommunityTempTuple").then((res) => {
        if (!res.isError && res.data) {
          this.roomTableData1 = res.data.Exceed
          this.roomTableData2 = res.data.Messing
          if (this.roomTableData1.length === 0 && this.roomTableData2.length !== 0 ) {
            this.activeName2 = false
            this.$nextTick(() => {
              this.scroll4()
            })
            return
          }
          if (this.activeName2) {
            this.$nextTick(() => {
              this.scroll3()
            })
          } else {
            this.$nextTick(() => {
              this.scroll4()
            })
          }
        } else {
          console.log("没有获取到数据");
        }
      });
    },
    initRefreshTime() {
      this.getTableData()
      this.$get("RunMap/GetMapRefreshTime", {}).then((r) => {
        if (r && !r.isError && r.data) {
          this.dataInterval = setInterval(
            this.getTableData,
            parseInt(r.data) * 1000
          );
        }
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.td-icon {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text-icon-box {
  max-width: 120px;
  text-align: center;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
  display: inline;
  line-height: 40px;
  text-align: center;
}
.iconyunhangtu:hover{
  cursor:pointer;
  color:red;
}
td {
  height: 40px;
  width: 86px;
  text-align: center;
  white-space:nowrap;
	text-overflow:ellipsis;
	overflow:hidden;
  box-sizing: border-box;
  border-right: 1px solid black;
  padding:0 5px;
}
.bottom-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .wrap {
    position: relative;
    height: 100%;
    width: 60%;
    display:flex;
    flex-direction: column;
    .table-body1 {
      position: relative;
      overflow: hidden;
      table {
        position: relative;
        top: 0;
        font-size:12px;
      }
      .table-text:nth-child(odd) {
        background-color: rgb(16, 53, 129);
      }
      .table-text:nth-child(even) {
        background-color: rgb(10, 45, 114);
      }
    }
    .table-body2 {
      position: relative;
      overflow: hidden;
      table {
        position: relative;
        top: 0;
        font-size:12px;
      }
      .table-text:nth-child(odd) {
        background-color: rgb(16, 53, 129);
      }
      .table-text:nth-child(even) {
        background-color: rgb(10, 45, 114);
      }
    }
  }
  .table-head {
    position: relative;
    z-index: 10;
    .table-title {
      td {
        border: none;
        background-color: rgb(5, 66, 156);
        font-size:12px;
      }
    }
  }
  .wrap-left {
    margin-left: 10px;
    margin-right: 10px;
    .title {
      user-select:none;
      .title-cur {
        color: rgb(30, 174, 218);
        border-bottom: 2px solid rgb(30, 174, 218);
      }
      span {
        cursor: pointer;
      }
      span:nth-of-type(1){
        margin-right: 15px;
      }
      height: 30px;
      width: 100%;
      line-height: 30px;
      font-size: 12px;
      padding-bottom: 10px;
      display: flex;
      justify-content: center;
    }
  }
  .wrap-right {
    margin-right: 10px;
    .title {
      user-select:none;
      .title-cur {
        color: rgb(30, 174, 218);
        border-bottom: 2px solid rgb(30, 174, 218);
      }
      span {
        cursor: pointer;
      }
      span:nth-of-type(1){
        margin-right: 15px;
      }
      height: 30px;
      width: 100%;
      line-height: 30px;
      font-size: 12px;
      padding-bottom: 10px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>