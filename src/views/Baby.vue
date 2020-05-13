<template>
  <div>
      <el-button @click="start">开始</el-button>
      <hr>
      <div>
        <p class="leaveTime">倒计时：{{ showTime }}</p>
        <count-down :startTime='startTime' :endTime='stopTime'></count-down>
        <el-button :disabled="!startEnabled" type="primary" class="record" @click="addRecord">记录</el-button>
      </div>
      <div class="record_text">点击总数：<span class="total_number">{{ totalCount }}</span> 有效数：<span class="valid_number">{{ validCount }}</span></div>
  </div>
</template>

<script>
import Moment from 'moment'
import CountDown from 'vue2-countdown'

export default {
  data () {
    return {
      startEnabled: false,
      totalCount: 0,
      validCount: 0,
      lastClickTime: null,
      stopTime: 0,
      timeInterval: null,
      showTime: '0:0',
      startTime: 0
    }
  },
  components: {
    CountDown
  },
  methods: {
    start () {
      console.log('start')
      this.totalCount = 0
      this.validCount = 0
      this.lastClickTime = null
      this.stopTime = Moment().add(1, 'hours').valueOf()
      this.startTime = Moment().valueOf()
      console.log('start:', this.startTime)
      clearInterval(this.timeInterval)
      this.timeInterval = setInterval(this.getSurplusTime, 1000)
      this.startEnabled = true
    },
    getSurplusTime () {
      const nowTime = Moment()
      const surplusTime = parseInt((this.stopTime - nowTime) / 1000)
      if (surplusTime !== 0) {
        const m = parseInt(surplusTime / 60)
        const s = surplusTime - m * 60
        this.showTime = m + ':' + s
      } else {
        clearInterval(this.timeInterval)
      }
    },
    addRecord () {
      console.log('add click')
      const nowTime = Moment()
      this.totalCount += 1
      if (this.lastClickTime == null) {
        this.validCount += 1
      } else {
        const interTime = nowTime - this.lastClickTime
        if (interTime >= 3 * 60 * 1000) {
          this.validCount += 1
        }
      }
      this.lastClickTime = nowTime
    }
  }
}
</script>

<style scoped>
  .record {
    width: 200px;
    height: 200px;
    border-radius: 100px;
  }
  .record_text {
    margin-top: 50px;
    font-size: 20px;
  }
  .total_number {
    font-size: 50px;
    margin: 0 10px;
    color: #f00;
  }
  .valid_number {
    font-size: 50px;
    margin: 0 10px;
    color: #0f0
  }
  .leaveTime {
    font-size: 20px;
  }

</style>
