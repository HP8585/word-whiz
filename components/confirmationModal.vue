<template>
<div class="absolute top-[50%] translate-y-[-50%] md:w-[21em] px-1 bg-gray-900 text-center flex flex-col items-center gap-4 py-2 rounded-lg">
    <div class="flex flex-col">
    <span class="text-[1.3rem]">Are you sure that you want to terminate this round?</span>
    <small class="text-[1rem]">(All of your current scores will be voided)</small>
</div>

<div class="flex gap-3">
    <button @click="confirmation = false" class="bg-red-600 px-4 rounded">No</button>
    <button @click="$emit('confirmed')" class="bg-green-600 px-4 rounded">Yes</button>
</div>
</div>
</template>

<script setup>
import { useStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
const { confirmation } = storeToRefs(useStore())

</script>