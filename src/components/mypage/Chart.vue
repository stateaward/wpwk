<template>
  <div class="as-chart">
    <canvas id="myChart" width="100" height="100"></canvas>
  </div>
</template>
<script>
import Chart from 'chart.js'
import { mapState } from 'vuex';

export default {
  name: "Chart",
  data: function () {
    return {
      personsAbilities: [],
      maxAbility: 0
    }
  },
  created: function () {    
    this.getAbilities()
  },
  methods: {
    getAbilities: function () {
       this.personsAbilities = this.usersAbilities.abilities
       const maxAb = Math.max.apply(null, this.personsAbilities)
       if (maxAb > 20) {
          this.maxAbility = maxAb
       } else {
         this.maxAbility = 20
      
       }
     },
    createChart: function (charId) {
      const ctx = document.getElementById(charId)
      new Chart (ctx, {
        type: 'radar',
        data: {
          labels: ['언어지능', '논리수학지능', '음악지능', '신체운동지능', '공간지능', '자연지능', '대인지능', '개인내지능'],
          datasets:[
            {
              label: '내 성향',
              data: this.personsAbilities,
              backgroundColor: "#12711a70",
              borderColor: "#12711a",
              borderWidth: 1,
          }],
        },
        options: {
          elements: {
            point: {
              radius: 0,
            }
          },
          responsive: true,
          maintainAspectRatio:true,
          scale: {
            angleLines: {
              display: true,
            },
            ticks: {
              display: false,
              beginAtZero: true,
              max: this.maxAbility,
              min: 0,
              stepSize: this.maxAbility / 5,
            },
            pointLabels: {
              fontSize: 11,
            }
          },
          
          legend: {
            display: false,
          },

          tooltips: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.yLabel;
              }
            }
          }
        },
      })
    }
  },
  mounted () {
    this.createChart('myChart')
  },
  computed: {
    ...mapState(['usersAbilities'])
  }
}
</script>
<style lang="scss">
.as-chart{
// background-color:#12711a;
// background-color:#ffec99;

}
  
</style>