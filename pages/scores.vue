<template>
<div class="mx-auto w-screen px-3 md:px-0 md:w-[30em] py-10 text-white">
    
    <div class="flex flex-row-revers w-full justify-between font-bold items-center mb-10 border-b border-gray-700 pb-2">
        <div class="tooltip hover:after:content-['Exit']" @click="navigateTo('/')"><img src="../assets/door3.webp" class="bg-gray-700 w-8" /></div>
        <div class="flex flex-row-reverse items-center justify-center">
        <img src="../assets/awardd.png" class="w-10">
    <h1 class="text-3xl">Top 10 Scores</h1>
</div>
<div/>
</div>
    <ol class="scores_list">
        <li v-for="(score, index) in allScores" :key="index" class="flex gap-3 text-white text-2xl">
            <span>{{ index + 1 }}.</span>
        <span>{{ score.score }}</span>
        </li>
    </ol>
</div>

</template>

<script setup>


const currentScore = ref(null)
const allScores = ref([])

watch(currentScore, (newScore) => {
  if (newScore > allScores.value[0]?.score) {
    if(allScores.value.length >=10){
        allScores.value.splice(9,1)
        allScores.value.unshift({ score: newScore })
    localStorage.clear('allScores')
    localStorage.setItem('allScores', JSON.stringify(allScores.value))
    }else{
        allScores.value.unshift({ score: newScore })
    localStorage.clear('allScores')
    localStorage.setItem('allScores', JSON.stringify(allScores.value))
    }
    
  }

  
})



onMounted(() => {
  const storedScore = JSON.parse(localStorage.getItem('score'))
  currentScore.value = storedScore || 0

  const storedAllScores = JSON.parse(localStorage.getItem('allScores'))
  allScores.value = storedAllScores || [{ score: 0 }]
})
</script>