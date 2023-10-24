<!--                                                         GOD                                                                                 -->
<template>
    
<div @click.stop="onMenu = true" class="flex flex-col gap-5 absolute top-[50%] translate-y-[-50%] text-white bg-gray-900 px-6 py-6 rounded">
    <div class="flex flex-row-reverse items-center justify-between">
      
        <div/>

        <h1 class="font-bold pr-4">Menu</h1>

            <i @click.stop="$emit('close')" class="fa fa-times cursor-pointer bg-red-700 px-1 rounded-full" />
    </div>
    <div class="text-center flex flex-col gap-3 menu-opts">
        <div @click.stop="$emit('answer')" class="flex items-center ">Get the answer for -20<img src="../assets/star.png" class="w-12"></div>
        
        <div @click="navigateTo('/scores')">See the last top 10 scores</div>

        <div @click.stop="onMenu = false; confirmation = true">Terminate the round</div>
    </div>
</div>
</template>

<script setup>
import { useStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
const { onMenu, confirmation } = storeToRefs(useStore())


onMounted(()=>{
    window.addEventListener('click', ()=>{
        onMenu.value = false
    })
})

</script>
