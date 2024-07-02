<script setup>
import { ref } from 'vue'

const score = ref(2)

</script>


<template>
    <div class="exercise">
        <div class="title">已提交题目</div>
        <div class="icon-exercise"></div>
        <div class="container">
            <ul>
                <li>
                    <div class="circle"></div>
                    <h6>1</h6>
                    <span>if语句的应用</span>
                    <div class="score"><el-rate v-model="score" :max="3" disabled/></div>
                    <div class="status">已通过</div>
                </li>
                <li>
                    <div class="circle"></div>
                    <h6>2</h6>
                    <span>if语句的应用</span>
                    <div class="score"><el-rate v-model="score" :max="3" disabled/></div>
                    <div class="status">已通过</div>
                </li>
                <li>
                    <div class="circle"></div>
                    <h6>3</h6>
                    <span>if语句的应用</span>
                    <div class="score"><el-rate v-model="score" :max="3" disabled/></div>
                    <div class="status">已通过</div>
                </li>
                <li>
                    <div class="circle"></div>
                    <h6>4</h6>
                    <span>if语句的应用</span>
                    <div class="score"><el-rate v-model="score" :max="3" disabled/></div>
                    <div class="status">已通过</div>
                </li>
                <li>
                    <div class="circle"></div>
                    <h6>5</h6>
                    <span>if语句的应用</span>
                    <div class="score"><el-rate v-model="score" :max="3" disabled/></div>
                    <div class="status">已通过</div>
                </li>
                <li>
                    <div class="circle"></div>
                    <h6>6</h6>
                    <span>if语句的应用</span>
                    <div class="score"><el-rate v-model="score" :max="3" disabled/></div>
                    <div class="status">已通过</div>
                </li>
                <li>
                    <div class="circle"></div>
                    <h6>7</h6>
                    <span>if语句的应用</span>
                    <div class="score"><el-rate v-model="score" :max="3" disabled/></div>
                    <div class="status">已通过</div>
                </li>
                <li>
                    <div class="circle"></div>
                    <h6>8</h6>
                    <span>if语句的应用</span>
                    <div class="score"><el-rate v-model="score" :max="3" disabled/></div>
                    <div class="status">已通过</div>
                </li>
                <li>
                    <div class="circle"></div>
                    <h6>9</h6>
                    <span>if语句的应用</span>
                    <div class="score"><el-rate v-model="score" :max="3" disabled/></div>
                    <div class="status">已通过</div>
                </li>
                <li>
                    <div class="circle"></div>
                    <h6>10</h6>
                    <span>if语句的应用</span>
                    <div class="score"><el-rate v-model="score" :max="3" disabled/></div>
                    <div class="status">已通过</div>
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
    --el-rate-fill-color:#17D199;
    align-items: baseline;
    --el-rate-disabled-void-color: #D9D9D9;
}
::v-deep .el-rate .is-disabled{
    width: 18px; 
    height: 18px;;
}
.exercise{
    position: relative;
    margin-left: 33px;
    width: 463px;
    height: 659px;
    border-radius: 4px;
    background-color: #FFFFFF;
    .title{
        position: absolute;
        top: 20px;
        left: 38px;
        font-size: 20px;
        color: #414447;
    }
    .icon-exercise{
        position: absolute;
        left: 145px;
        top: 25px;
        width: 20px;
        height: 20px;
        // background: url(../../../assets/icons/icon-exercise.png) no-repeat;
        background-size: 20px 20px;
    }
    .container{
        position: absolute;
        left: 31px;
        top: 68px;
        width: 400.5px;
        height: 500px;
        border-radius: 4px;
        ul{
            width: 400.5px;
            height: 500px;
        }
        li{
            width: 400.5px;
            height: 47px;
            margin-bottom: 4px;
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .circle{
                margin-left: 12px;
                margin-top: 20.5px;
                width: 6px;
                height: 6px;
                border-radius: 6px;
                background-color: #34ECB5;
            }
            h6{
                margin-left: 4px;
                margin-top: 13px;
                font-size: 14px;
            }
            span{
                margin-left: 42px;
                margin-top: 12px;
                font-size: 15px;
            }
            .score{
                margin-left: 80px;
                margin-top: 13.75px;
                width: 64.5px;
                height: 19.5px;
            }
            .status{
                margin-left: 42px;
                margin-top: 12px;
                width: 45px;
                height: 23px;
                text-align: center;
                font-size: 15px;
                color: #17D199;
            }
        }
    }
}
</style>
