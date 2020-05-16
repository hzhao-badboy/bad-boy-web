<template>
  <div>
      <h1 class="title">数胎动</h1>
      <div>
        <div class='center_content'>
          <div class="show_time">倒计时：{{ showTime }}</div>
          <div class="">胎动总数：<span class="">{{ totalCount }}</span></div>
        </div>
        <el-button type="primary" class="record" @click="addRecord">
          <div v-if='startEnabled'>
            {{ validCount }} <span class="count_unit">次</span>
          </div>
          <div v-else>开始</div>
        </el-button>
        <div class="stop"><el-button @click="stopVisible = true" size="mini" round type="danger">取消</el-button></div>
      </div>

      <el-dialog
        title="本次结果"
        :visible.sync="successVisible"
        :before-close="countSuccess"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        center
        :show-close="false"
        custom-class="tip_dialog">
        <span>有效胎动数：<span class="valied_count">{{ validCount }}</span></span>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" size="mini" round @click="countSuccess">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="stopVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        center
        custom-class="tip_dialog">
        <span>确定取消本次记录吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" class="cancel_btn" size="mini" @click="stopVisible = false" round>取 消</el-button>
          <el-button type="danger" size="mini" @click="stop" round>确 定</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>
import Moment from 'moment'

export default {
  data () {
    return {
      startEnabled: false,
      totalCount: 0,
      validCount: 0,
      lastClickTime: null,
      stopTime: 0,
      timeInterval: null,
      showTime: '00:00',
      successVisible: false,
      stopVisible: false,
      startTime: 0
    }
  },
  components: {
  },
  mounted () {
    const rec = document.getElementsByClassName('record')[0]
    // 动画结束时事件
    rec.addEventListener('webkitAnimationEnd', function () {
      this.className = 'record'
    })
  },
  methods: {
    countSuccess () {
      this.successVisible = false
      this.totalCount = 0
      this.validCount = 0
      this.lastClickTime = null
      this.stopTime = 0
      this.startTime = 0
      this.startEnabled = false
      this.showTime = '00:00'
    },
    stop () {
      clearInterval(this.timeInterval)
      this.totalCount = 0
      this.validCount = 0
      this.lastClickTime = null
      this.stopTime = 0
      this.startTime = 0
      this.startEnabled = false
      this.showTime = '00:00'
      this.stopVisible = false
    },
    start () {
      this.totalCount = 0
      this.validCount = 0
      this.lastClickTime = null
      this.stopTime = Moment().add(1, 'hour').valueOf()
      this.startTime = Moment().valueOf()
      this.startEnabled = true
      clearInterval(this.timeInterval)
      this.getSurplusTime()
      this.timeInterval = setInterval(this.getSurplusTime, 1000)
    },
    timesUp () {
      this.startEnabled = false
    },
    getSurplusTime () {
      const nowTime = Moment()
      const surplusTime = parseInt((this.stopTime - nowTime) / 1000)
      if (surplusTime !== 0) {
        let m = parseInt(surplusTime / 60)
        let s = surplusTime - m * 60
        if (s < 10) {
          s = '0' + s
        }
        if (m < 10) {
          m = '0' + m
        }
        this.showTime = m + ':' + s
      } else {
        this.showTime = '00:00'
        this.successVisible = true
        clearInterval(this.timeInterval)
      }
    },
    addRecord () {
      const rec = document.getElementsByClassName('record')[0]
      if (!this.startEnabled) {
        this.start()
      } else {
        const nowTime = Moment()
        this.totalCount += 1
        if (this.lastClickTime == null) {
          rec.className = 'record record_animation'
          this.validCount += 1
        } else {
          const interTime = nowTime - this.lastClickTime
          if (interTime >= 3 * 60 * 1000) {
            rec.className = 'record record_animation'
            this.validCount += 1
          }
        }
        this.lastClickTime = nowTime
      }
    }
  }
}
</script>

<style>
  .el-dialog__body {
    color:#ff8a65 !important;
    text-align: center !important;
  }
  .el-dialog__title {
    color: #ff8a65 !important;
  }
  .tip_dialog {
    background-color: antiquewhite !important;
    font-size: 1rem;
    border-radius: 10px !important;
  }
</style>
<style scoped>
  .valied_count {
    color: #a4d465;
    font-size: 2rem;
  }
  .cancel_btn{
    background: #ffffff;
    color:#ff8a65;
    border-color: #ff8a65;
  }
  .title {
    color:violet;
  }
  .stop {
    margin-top: 70px;
  }
  .show_time {
    margin-right: 50px;
  }
  .center_content {
    display: flex;
    justify-content: center;
    margin: 50px;
    font-size: 1rem;
    color: rgb(126, 34, 80);
  }
  .count_unit {
    font-size: 1rem;
  }
  .record {
    color: #fff;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    font-size: 3rem;
    background-color: rgb(243, 137, 199);
    border: 1px solid rgb(243, 137, 199);
  }
  .record:focus {
    background-color: rgb(243, 137, 199);
    border-color: rgb(243, 137, 199);
  }
  .record:hover {
    background-color: rgb(243, 137, 199);
    border-color: rgb(243, 137, 199);
  }
  .record_text {
    margin-top: 50px;
    font-size: 20px;
  }
  .record_animation{
    animation: free_download 1s linear alternate 1;
  }
  @keyframes free_download{
      0%{transform:scale(1);}
      50%{transform:scale(1.2);}
      100%{transform:scale(1);}
  }
</style>
