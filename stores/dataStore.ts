import { defineStore } from "pinia"

export const useMetrics = defineStore('metricsData', {
  state: () => ({
    mrr: [],
    churnRate: [],
  }),

  actions: {
    setMrr(arrayDataMrr: any) {
      this.mrr = arrayDataMrr;
    },
    setChurnRate(arrayDataChurnRate: any){
      this.churnRate = arrayDataChurnRate;
    }
  }
})

