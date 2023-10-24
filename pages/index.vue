<!--                                                         GOD                                                                                 -->
<template>

<div class="text-white text-2xl  flex flex-col mx-auto w-[30em] justify-center items-center gap-2 py-10">
    <answer-modall v-show="answerModal" :answer="originalWord" @close="answerModal=false"/>
    <menu-modal v-show="onMenu" @answer="showAnswer"  @close="onMenu = false" />
    <confirmation-modal v-show="confirmation" @confirmed="terminateRound"/>
    <not-enough-modal v-show="notEnough" />
    
    <header class="bg-red500 border-b-gray-800 border-b w-full flex justify-between">
        <div class="py-2 text-4xl text-gray-500 tooltip hover:after:content-['Menu']" @click.stop="onMenu = true">
            <i class="fa-solid fa-ellipsis bg-gray-900 cursor-pointer h-8 flex items-center px-2 rounded" />
        </div>
        <div class="flex flex-row-reverse gap-4">
            <div class="flex flex-row-reverse items-center tooltip hover:after:content-['Scores']">
                <span>{{ useStore().scores }}</span>
                <img src="../assets/awardd.png" class="w-[1.5em]">
            </div>
            <div class="flex flex-row-reverse items-center tooltip hover:after:content-['Srars']">
                <span>{{ useStore().stars }}</span>
            <img src="../assets/star.png" class="w-12">
        </div>

        </div>
    </header>
<div class="flex flex-col items-center gap-5">
    
    <div class="flex flex-col items-center">
<div class="flex gap-2">
    <div v-if="isLoading">Loading Word...</div>
<div v-else v-for="letter in jumbledWord" :key="letter" class="bg-gray-800 rounded px-2.5 py-1">
<span>{{ letter }}</span>
</div>
</div>
<span class="text-[1rem] text-center max-w-[34em]">Hint : {{ hint }}</span>
</div>

<input v-model="inputWord" type="text" :class="isWrong ? 'border-2 border-red-600' : isRight ? 'border-2 border-green-600':''" class="bg-gray-800 outline-none rounded text-white px-3 py-1 text-lg w-[14em] h">

</div>

</div>

</template>
<script setup>
import axios from 'axios'
import { useStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
const { scores, scoresList, stars, onMenu, answerModal, notEnough, confirmation } = storeToRefs(useStore())
const originalWord = ref(null),
 jumbledWord = ref(null),
 hint = ref(null),
 isLoading = ref(false),
 isWrong = ref(false)
,isRight = ref(false),
answerShown = ref(false)

const inputWord = ref(null)

const showAnswer = ()=>{
    
    if(stars.value < 20){
        notEnough.value = true;
        onMenu.value = false
    }else{
        
        answerShown.value = true;
    answerModal.value = true;
    onMenu.value = false;
        stars.value -= 20;
    }
    localStorage.setItem('stars', JSON.stringify(stars.value))
}

const shuffledWord = (word)=>{
    const shuffled = word.split('').sort(()=> Math.floor(Math.random() - 0.5)).join('')
    return shuffled
}

const getRandomWord = async ()=>{
    try{
        hint.value = null;
        isLoading.value = true
        const response = await axios.get('https://random-word-api.herokuapp.com/word')
        if(response.data){
          
            inputWord.value = null
            originalWord.value = response.data[0];
            console.clear()
        console.log("Only if you really don't know the answer:) :", originalWord.value);
            loadHint()
            jumbledWord.value = shuffledWord(originalWord.value)
            isLoading.value = false
        }else{
            return;
        }
    }catch(err){
        console.clear()
        console.log("Only if you really don't know the answer:) :", originalWord.value);
        getRandomWord()
    }
}

const loadHint = async ()=>{
                const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${originalWord.value}`)
            if(res.data){       
                 hint.value = res.data[0].meanings[0].definitions[0].definition
            }else{
                console.clear()
                console.log("Only if you really don't know the answer:) :", originalWord.value);
                loadHint()
            }
            } 
watch(()=> inputWord.value, async ()=>{
    if(inputWord.value === originalWord.value){
        const highestScore = JSON.parse(localStorage.getItem('score'))
        isRight.value = true;
        
        setTimeout(async () => {
            originalWord.value = null;
        jumbledWord.value = null;
        
        await new Promise(resolve => setTimeout(() =>  resolve(isRight.value = false), 1200)).then(()=>{
            
        stars.value += 5;
        scores.value += 20;
        localStorage.setItem('stars', JSON.stringify(stars.value))
            getRandomWord()

            if(scores.value > highestScore){
                localStorage.setItem('score', JSON.stringify(scores.value))
            }
        })
    }, 1500);
    }else{
        isWrong.value = true;
        setTimeout(() => {
            isWrong.value = false
        }, 1200);
    }
})

onMounted(()=>{
    getRandomWord()
    if(!localStorage.getItem('stars')){
        stars.value = 35
    }else{
        const storedStars = JSON.parse(localStorage.getItem('stars'))
    stars.value = storedStars
    }
    
    if(!localStorage.getItem('score')){
        localStorage.setItem('score', JSON.stringify(0))
    }else{
        return;
    }

})
const terminateRound = ()=>{
    scores.value = 0;
    getRandomWord()
    confirmation.value = false;
}
</script>