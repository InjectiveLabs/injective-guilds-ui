<template>
  <div id="chart" class="relative"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import ApexCharts from 'apexcharts'
import { BigNumber } from '@injectivelabs/utils'

const options = {
  chart: {
    type: 'area',
    fontFamily: 'Space Grotesk',
    height: 245,
    stacked: false,
    toolbar: {
      show: false
    },
    zoom: {
      type: 'x',
      autoScaleYaxis: true,
      enabled: true
    }
  },
  colors: ['#0FF4E7'],
  grid: { show: false },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  fill: {
    type: 'gradient',
    gradient: {
      gradientToColors: ['#043E3A'],
      type: 'vertical',
      opacityFrom: 0.35,
      opacityTo: 0.35,
      stops: [0, 100]
    }
  },
  animations: {
    enabled: true,
    easing: 'easeinout',
    speed: 800,
    animateGradually: {
      enabled: true,
      delay: 150
    },
    dynamicAnimation: {
      enabled: true,
      speed: 350
    }
  },
  markers: {
    colors: ['transparent'],
    show: false,
    size: [3, 0],
    strokeColors: ['transparent']
  },
  legend: {
    show: false
  },
  xaxis: {
    tooltip: {
      enabled: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    type: 'datetime',
    max: new Date().getTime(),
    tickAmount: 8,
    labels: {
      style: {
        colors: '#099188',
        fontSize: '0.75rem'
      },
      datetimeFormatter: {
        year: 'yyyy',
        month: 'MMM yyyy',
        day: 'MMM dd',
        hour: 'dd MMM HH:mm'
      }
    }
  },
  yaxis: [
    {
      show: false
    }
  ]
}

export default Vue.extend({
  props: {
    xMin: {
      required: true,
      type: Date
    },

    xMax: {
      required: true,
      type: Date
    },

    series: {
      required: true,
      type: Array
    }
  },

  data() {
    return {
      chart: {} as any
    }
  },

  computed: {
    options(): any {
      const { xMin, xMax, series } = this

      const xaxis = {
        ...options.xaxis,
        labels: {
          ...options.xaxis.labels
        },
        min: (xMin as unknown as Date).getTime(),
        max: (xMax as unknown as Date).getTime()
      }

      return {
        ...options,
        xaxis,
        series,
        tooltip: {
          y: {
            formatter: (value: number): string => {
              return `$${new BigNumber(value).toFixed(2)}`
            }
          }
        }
      }
    }
  },

  watch: {
    options(newOptions: any) {
      this.handleChartInit(newOptions)
    }
  },

  mounted() {
    this.handleChartInit(this.options)
  },

  beforeDestroy() {
    this.handleChartDestroy()
  },

  methods: {
    handleChartDestroy() {
      if (this.chart.destroy !== undefined) {
        this.chart.destroy()
      }
    },

    handleChartInit(options: any) {
      this.handleChartDestroy()
      this.chart = new ApexCharts(document.querySelector('#chart'), options)
      this.chart.render()
    }
  }
})
</script>

<style lang="scss" scoped>
#chart .apexcharts-tooltip.apexcharts-theme-light .apexcharts-tooltip-title {
  @apply bg-black text-white border-primary-500;
}
</style>
