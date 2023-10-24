<template>
<div @click.stop="answerModal = true" class="flex flex-col absolute top-[50%] translate-y-[-50%] pb-4 text-white bg-gray-900 px6 py-1 rounded">
    <div class="px-2">
        <div/>
        <i @click.stop="$emit('close')" class="fa fa-times cursor-pointer bg-red-700 px-1 rounded-full" />
    </div>
<span class="px-5 py-2">The answer is <span class="bg-green-600 px-2 rounded pb-1">{{ answer }}</span></span>
</div>
</template>

<script setup>
import { useStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
const { answerModal } = storeToRefs(useStore())
const props = defineProps(['answer'])
const { answer } = toRefs(props)

onMounted(()=>{
    window.addEventListener('click', ()=>{
        answerModal.value = false
    })
})
</script>
