<template>
    <div @click.stop="notEnough = true" class="flex flex-col absolute top-[50%] translate-y-[-50%] pb-4 text-white bg-gray-900 px6 py-1 rounded">
        <div class="px-2">
            <div/>
            <i @click.stop="notEnough = false" class="fa fa-times cursor-pointer bg-red-700 px-1 rounded-full" />
        </div>
    <span class="px-5 py-2 text-red-600">You do not have enough stars!</span>
    </div>
    </template>
    
    <script setup>
    import { useStore } from '~/stores/user'
    import { storeToRefs } from 'pinia'
    const { notEnough } = storeToRefs(useStore())
  
    
    onMounted(()=>{
        window.addEventListener('click', ()=>{
            notEnough.value = false
        })
    })
    </script>