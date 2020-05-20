<template>
  <div>
    <h1 class="title">数胎动</h1>
    <div>
      <div class="center_content">
        <div class="center_content_left">
          倒计时：{{ showTime }}
        </div>
        <div class="center_content_right">
          胎动总数：<div class="total_number">{{ totalCount }}</div>
        </div>
      </div>
      <el-button type="primary"
                 class="record"
                 @click="addRecord">
        <div v-if="startEnabled">
          {{ validCount }} <span class="count_unit">次</span>
        </div>
        <div v-else>开始</div>
      </el-button>
      <div class="stop">
        <el-button @click="stopVisible = true"
                   size="mini"
                   round
                   type="danger">取消</el-button>
      </div>
      <el-tooltip placement="top"
                  effect="light"
                  popper-class="instruction_tip">
        <div slot="content">
          <span
                class="tip_title">1小时计数法：</span>孕28-30周开始，每天计数1小时。从自觉胎动开始，在1小时内，胎动1次记一次，连续胎动记一次，1小时胎动总数大于3-4次为正常，如1小时不足3次，则继续计数1小时，2小时胎动总数大于6次为正常。<br />
          <span class="tip_title">就诊提醒：</span>如果胎动计算异常，或自觉胎动数较平时的平均数明显减少，应<span class="warning">立即就诊！</span>
        </div>
        <i class=" instruction el-icon-question"></i>
      </el-tooltip>
    </div>

    <el-dialog title="本次结果"
               :visible.sync="successVisible"
               :before-close="countSuccess"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               center
               :show-close="false"
               custom-class="tip_dialog">
      <span>有效胎动数：<span class="valied_count">{{ validCount }}</span></span>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="danger"
                   size="mini"
                   round
                   @click="countSuccess">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示"
               :visible.sync="stopVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
               center
               custom-class="tip_dialog">
      <span>确定取消本次记录吗？</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   class="cancel_btn"
                   size="mini"
                   @click="stopVisible = false"
                   round>取 消</el-button>
        <el-button type="danger"
                   size="mini"
                   @click="stop"
                   round>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Moment from "moment";

export default {
  data() {
    return {
      startEnabled: false,
      totalCount: 0,
      validCount: 0,
      lastClickTime: null,
      stopTime: 0,
      timeInterval: null,
      showTime: "00:00",
      successVisible: false,
      stopVisible: false,
      startTime: 0
    };
  },
  components: {},
  mounted() {
    const rec = document.getElementsByClassName("record")[0];
    // 动画结束时事件
    rec.addEventListener("webkitAnimationEnd", function () {
      this.className = "record";
    });
  },
  methods: {
    countSuccess() {
      this.successVisible = false;
      this.totalCount = 0;
      this.validCount = 0;
      this.lastClickTime = null;
      this.stopTime = 0;
      this.startTime = 0;
      this.startEnabled = false;
      this.showTime = "00:00";
    },
    stop() {
      clearInterval(this.timeInterval);
      this.totalCount = 0;
      this.validCount = 0;
      this.lastClickTime = null;
      this.stopTime = 0;
      this.startTime = 0;
      this.startEnabled = false;
      this.showTime = "00:00";
      this.stopVisible = false;
    },
    start() {
      this.totalCount = 0;
      this.validCount = 0;
      this.lastClickTime = null;
      this.stopTime = Moment()
        .add(1, "hour")
        .valueOf();
      this.startTime = Moment().valueOf();
      this.startEnabled = true;
      clearInterval(this.timeInterval);
      this.getSurplusTime();
      this.timeInterval = setInterval(this.getSurplusTime, 1000);
    },
    timesUp() {
      this.startEnabled = false;
    },
    getSurplusTime() {
      const nowTime = Moment();
      const surplusTime = parseInt((this.stopTime - nowTime) / 1000);
      if (surplusTime !== 0) {
        let m = parseInt(surplusTime / 60);
        let s = surplusTime - m * 60;
        if (s < 10) {
          s = "0" + s;
        }
        if (m < 10) {
          m = "0" + m;
        }
        this.showTime = m + ":" + s;
      } else {
        this.showTime = "00:00";
        this.successVisible = true;
        clearInterval(this.timeInterval);
      }
    },
    addRecord() {
      const rec = document.getElementsByClassName("record")[0];
      if (!this.startEnabled) {
        this.start();
      } else {
        const nowTime = Moment();
        this.totalCount += 1;
        if (this.lastClickTime == null) {
          rec.className = "record record_animation";
          this.validCount += 1;
        } else {
          const interTime = nowTime - this.lastClickTime;
          if (interTime >= 4 * 60 * 1000) {
            rec.className = "record record_animation";
            this.validCount += 1;
          }
        }
        this.lastClickTime = nowTime;
      }
    }
  }
};
</script>

<style>
.el-tooltip__popper {
  max-width: 61.8% !important;
}
.el-dialog__body {
  color: #ff8a65 !important;
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
.tip_title {
  color: #ff8a65;
}
.warning {
  color: red;
  font-size: 1rem;
}
.instruction {
  position: fixed;
  bottom: 20px;
  left: 20px;
  color: #9e9e9e;
  font-size: 1.5rem;
}
.valied_count {
  color: #a4d465;
  font-size: 2rem;
}
.cancel_btn {
  background: #ffffff;
  color: #ff8a65;
  border-color: #ff8a65;
}
.title {
  color: violet;
}
.stop {
  margin-top: 70px;
}
.show_time {
  margin-right: 50px;
}
.center_content {
  display: flex;
  align-items: center;
  margin: 50px 0;
  font-size: 1rem;
  color: rgb(126, 34, 80);
}
.center_content_left {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.center_content_right {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.total_number {
  font-size: 2rem;
  color: rgb(16, 228, 243);
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
.record_animation {
  animation: free_download 1s linear alternate 1;
}
@keyframes free_download {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
