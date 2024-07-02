<script setup>
import { ref } from 'vue'

const score = ref(2)

const customColors = [
  { color: '#FFAD0E' },
]
</script>


<template>
    <div class="lesson">
        <div class="title">已学课程</div>
        <div class="icon-lesson"></div>
        <div class="container">
            <ul>
                <li>
                    <img src="../../../assets/images/Rectangle 58.png" alt="">
                    <h3>Java从入门到精通</h3>
                    <div class="difficulty">中等</div>
                    <div class="subject">理工科</div>
                    <div class="score"><el-rate v-model="score" :max="3" disabled/></div>
                    <div class="progress">
                        <div class="demo-progress">
                          <el-progress 
                          :text-inside="true" 
                          :stroke-width="16" 
                          :percentage="60"
                          :color="customColors"
                          class="text-left"
                          />
                        </div>
                    </div>
                </li>
                <li>
                    <img src="../../../assets/images/Rectangle 58.png" alt="">
                    <h3>Java从入门到精通</h3>
                    <div class="difficulty">中等</div>
                    <div class="subject">理工科</div>
                    <div class="score"><el-rate v-model="score" :max="3" disabled/></div>
                    <div class="progress">
                        <div class="demo-progress">
                          <el-progress 
                          :text-inside="true" 
                          :stroke-width="16" 
                          :percentage="60"
                          :color="customColors"
                          class="text-left"
                          />
                        </div>
                    </div>
                </li>
                <li>
                    <img src="../../../assets/images/Rectangle 58.png" alt="">
                    <h3>Java从入门到精通</h3>
                    <div class="difficulty">中等</div>
                    <div class="subject">理工科</div>
                    <div class="score"><el-rate v-model="score" :max="3" disabled/></div>
                    <div class="progress">
                        <div>
                          <el-progress 
                          :text-inside="true" 
                          :stroke-width="16" 
                          :percentage="60"
                          :color="customColors"
                          />
                        </div>
                    </div>
                </li>
                <li>
                    <img src="../../../assets/images/Rectangle 58.png" alt="">
                    <h3>Java从入门到精通</h3>
                    <div class="difficulty">中等</div>
                    <div class="subject">理工科</div>
                    <div class="score"><el-rate v-model="score" :max="3" disabled/></div>
                    <div class="progress">
                        <div class="demo-progress">
                          <el-progress 
                          :text-inside="true" 
                          :stroke-width="16" 
                          :percentage="60"
                          :color="customColors"
                          class="text-left"
                          />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
::v-deep .el-rate .el-rate__icon{
    margin-right:0px
}
::v-deep .el-rate{
    --el-rate-fill-color:#FFC24B;
    align-items: baseline;
    --el-rate-disabled-void-color: #D9D9D9;
}
::v-deep .el-rate .is-disabled{
    width: 18px; 
    height: 18px;;
}
.lesson{
    position: relative;
    // overflow: auto;
    width: 597px;
    min-height: 668px;
    border-radius: 4px;
    background-color: #FFFFFF;
    .title{
        position: absolute;
        top: 20px;
        left: 38px;
        font-size: 20px;
        color: #414447;
    }
    .icon-lesson{
        position: absolute;
        left: 126px;
        top: 25px;
        width: 20px;
        height: 20px;
        // background: url(../../../assets/icons/icon-lesson.png) no-repeat;
        background-size: 20px 20px;
    }
    .container{
        position: absolute;
        left: 38px;
        top: 68px;
        width: 524px;
        height: 668px;
        border-radius: 4px;
        background-color: #fff;
        // overflow: hidden;
        ul{
            width: 556px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            // justify-content: space-between
        }
        ul li{
            width: 254px;
            height: 326px;
            border-radius: 4px;
            margin-bottom: 16px;
            margin-right: 24px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            // overflow: hidden;
            img{
                width: 254px;
                height: 197px;
            }
            h3{
                margin-left: 16px;
                margin-top: 10px;
                font-size: 20px;
                color: #BA5004;
            }
            .difficulty,
            .subject{
                display: inline-block;
                margin-top: 4px;
                height: 20px;
                border-radius: 2px;
                background-color: #FFF2E4;
                font-size: 13px;
                color: #FFAD0E;
                text-align: center;
            }
            .difficulty{
                margin-left: 16px;
                width: 50px;
            }
            .subject{
                margin-left: 8px;
                width: 63px;
            }
            .score{
                margin-left: 16px;
                margin-top: 4px;
                width: 53px;
                height: 15px;
            }
            .progress{
                margin-left: 16px;
                margin-top: 19px;
                width: 222px;
                height: 16px;
            }
        }
    }
}
</style>