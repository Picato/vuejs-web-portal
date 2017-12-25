<template>
  <canvas height="100"></canvas>
</template>

<script>
import Chart from 'chart.js'

export default {
  props: ['data'],
  mounted () {
    const self = this
    const chart = new Chart(self.$el.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['45', '40', '35', '30', '25', '20', '15', '10', '5', 'Now'],
        datasets: [{
          data: self.data,
          backgroundColor: [
            'rgba(255, 255, 255, 0.0)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        responsiveAnimationDuration: 0,
        legend: {
          display: false
        }
      }
    })
    chart.data.datasets[0].data = this.data
    chart.update()
  }
}
</script>
