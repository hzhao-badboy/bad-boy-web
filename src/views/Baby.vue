<template>
  <div>
      <el-button @click="start">开始</el-button>
      <hr>
      <div>
        <p class="leaveTime">倒计时</p>
        <count-down class="count_down" :endDate="stopTime" @timeUp="timesUp"/>
        <el-button :disabled="!startEnabled" type="primary" class="record" @click="addRecord">记录</el-button>
      </div>
      <div class="record_text">点击总数：<span class="total_number">{{ totalCount }}</span> 有效数：<span class="valid_number">{{ validCount }}</span></div>
  </div>
</template>

<script>
import Moment from 'moment'
import CountDown from './../components/CountDown'

export default {
  data () {
    return {
      startEnabled: false,
      totalCount: 0,
      validCount: 0,
      lastClickTime: null,
      stopTime: 0,
      timeInterval: null,
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
      this.stopTime = Moment().add(10, 'second').valueOf()
      this.startTime = Moment().valueOf()
      this.startEnabled = true
    },
    timesUp () {
      this.startEnabled = false
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
  .count_down {
    width: 150px;
    margin: 10px auto;
    font-size: 20px;
  }
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
