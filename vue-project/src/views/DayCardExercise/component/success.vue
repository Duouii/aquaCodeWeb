<script>
import {ref} from 'vue'
// 响应式数据
const showModal = ref(false);
// 关闭弹框
const onCloseModal = () => {
  showModal.value = false;

  // 恢复滚动
  document.body.style.overflow = '';
};
</script>
<template>
  <!-- 弹框和遮罩 -->
    <div :class="{ 'modal': true, 'show': showModal }">
      <div class="window">
        <h1>SUCCESS</h1>
        <h2>代码运行成功 :-)</h2>
        <span>测试点</span>
        <ul>
          <li>
            <h5>答案正确</h5>
            <h6>3ms</h6>
            <h6>512kb</h6>
          </li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <button class="closeBtn" @click="onCloseModal">x</button>
    </div>
    
    <div :class="{ 'modal-overlay': true, 'show': showModal }"></div>
</template>
<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  display: none;
  .window {
    width: 500px;
    height: 354px;
    background-color: #EEFFFA;
    h1 {
      position: absolute;
      left: 40px;
      top: 30px;
      font-size: 64px;
      color: #BAFFEA;
      font-weight: 700;
    }
    h2 {
      position: absolute;
      left: 40px;
      top: 102px;
      font-size: 32px;
      color: #009F6F;
    }
    span {
      position: absolute;
      left: 40px;
      top: 165px;
      font-size: 16px;
      color: #45E84C;
    }
    ul {
      position: absolute;
      left: 40px;
      top: 192px;
      height: 85px;
      display: flex;
      li {
        width: 85px;
        height: 85px;
        background: #45E84C;
        margin-right: 14px;
        h5, h6 {
          color: #fff;
          font-size: 13px;
          text-align: center;
        }
        h5 {
          font-size: 14px;
          margin-top: 7px;
          margin-bottom: 15px;
        }
      } 
    }
    
  }
  .closeBtn {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background-color: transparent;
    margin-top: 47px;
    margin-left: 235px;
    font-size: 25px;
    line-height: 30px;
    border: 1px solid #fff;
    color: #fff;
  }
}

.modal.show {
  display: block;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: none;
}

.modal-overlay.show {
  display: block;
}
</style>