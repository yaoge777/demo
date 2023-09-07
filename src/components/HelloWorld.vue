<template>
  <div class="container">
    <div class="header">
      <input type="text" v-model.trim="name" >
      <button @click="handleSearch">Search</button>
      <button @click="showAll ">showAll</button>
    </div>

    <div class="content">
      <ul>
        <li @click="handleClick(val.age, val.job)" v-for="val in filterName" key="val.age + val.job">
          <p v-html="heightLight(val.name)"></p>
        </li>
      </ul>
    </div>
  </div>
  
  <div class="container1">
    <div class="form">
      <div class="title">AGE</div>
      <div class="value">{{ age }}</div>
      <div class="title">JOB</div>
      <div class="value">{{ job }}</div>
      <button @click="handleDisplay">x</button>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import {onMounted, ref } from "vue";
import {getNameData} from '../api'
let name = ''
const total = ref([{name:'', age:'', job: ''}])
const filterName = ref([{name:'', age:'', job: ''}])
const age = ref('0')
const job = ref('student')
const handleSearch = () => {

  const nameToSearch = name.toLowerCase();
  filterName.value = total.value.filter(v => v.name.toLowerCase().includes(nameToSearch))
}

const heightLight = (text: string) => {
  const rg = new RegExp(name, 'gi')
  return text.replace(rg, match => `<span class="highlight" style="background-color:yellow">${match}</span>`)
}

const showAll = () => {
  name = ''
  filterName.value = total.value
}

const handleClick = (a:string, j: string) => {
  age.value = a
  job.value = j
  const t = document.querySelector('.container1') as HTMLElement
  t.style.display = 'flex'
}

const handleDisplay = () => {
  const t = document.querySelector('.container1') as HTMLElement
  t.style.display = 'none'
}

const setName = () => {
  getNameData().then(res => {
    total.value = res.data.data
    filterName.value = res.data.data
  })
}
onMounted(() => {
  setName()
})
</script>

<style lang="less" scoped>

.container{
  display: flex;
  flex-direction: column;
  width: fit-content;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  transform: translateX(-50%) translateY(-50%);
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  border: 1px solid white;
  box-shadow: 5px 5px 5px 5px rgb(160, 160, 160);
  border-radius: 10px;
  padding: 10px 0;
  height: 300px;
  button{
    background-color: rgb(0, 123, 255);
    width: 100px;
    line-height: 30px;
    height: 30px;
    border-radius: 10px;
    vertical-align: middle;
    color: white;
    border:none
  }
}

input{
  height: 20px;
}


.content{
  width: 100%;
}



li{
  padding: 8px 0;
  width: 100%;
  text-align: center;
  list-style-type:none;
}

li:nth-child(odd){
  background-color: rgba(180, 180, 180, 0.556);
}


li:nth-child(even){
  background-color: white;
}

li:hover{
  cursor: pointer;
}

.container1{
  display: none;
  z-index: 10;
  background-color: rgba(128, 128, 128, 0.344);
  width: 100vw;
  height: 100vh;
  position: relative;
}

.form{
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  align-items: center;
  button{
    position: absolute;
    font-size: 30px;
    border: none;
    background-color: white;
    right: 20px;
    top: 4px 
  }
  button:hover{
    cursor: pointer
  }
}

.title, .value{
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.value{
  background-color: aliceblue;
}

button:hover{
  cursor: pointer;
}
</style>
