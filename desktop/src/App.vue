<script setup lang="ts">

import Recorder from './libs/record/recorder'
const fs = require('fs');

let recorder =  new Recorder( { });


function onClickStart() {
    recorder.start();
}

function onClickClear() {
  recorder.clear();
}

function onClickStop() {
    recorder.stop();
}


function onClickExport() {
  recorder.saveMP3((data:unknown)=>{
    //@ts-ignore
    fs.writeFile('./test.mp3', data, err => {
                    if (err) {
                        console.log(err);
                    } else {
                        // 保存完之后清除数据，或在其他合适时机清除，否则录音数据一直叠加
                        recorder.clear();
                       
                    }
                });
  })
}

</script>

<template>
  <div class="wrap">
      <img class="logo" src="./assets/robot.png" />

      <button @click.stop = "onClickStart">开始</button>

      <button @click.stop = "onClickStop">停止</button>

      <button @click.stop = "onClickClear">清除</button>

       <button @click.stop = "onClickExport">导出</button>
      
  </div>

</template>

<style scoped >
.wrap{
  background: rgb(30, 30, 30);
  width: 100%;
  height: 100vh;
}
.logo{
  width: 30px;
  height: 30px;
  margin: 10px 10px;
}
</style>
