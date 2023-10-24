import { defineStore } from 'pinia'

export const useStore = defineStore('user', {
  state: () => {
    return {
     stars: 0,
     scores: 0,
     scoresList:[],
     onMenu: false,
     answerModal: false,
     notEnough: false,
     confirmation: false
    }
  },
})