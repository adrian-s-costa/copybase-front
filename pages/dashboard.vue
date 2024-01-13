<script setup>
import { Bar, Line } from 'vue-chartjs'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { ref } from "vue";

const metricsData = useMetrics();
const state = ref('Churn Rate');
const chartKey = ref(0);

const dates = ref([]);
const values = ref([]);

const updateChartData = () => {
  if (state.value === 'MRR') {
    chartKey.value += 1;
    dates.value = metricsData.mrr.map(entry => entry.data);
    values.value = metricsData.mrr.map(entry => entry.valor);
  } else if (state.value === 'Churn Rate') {
    chartKey.value += 1;
    dates.value = metricsData.churnRate.map(entry => entry.data);
    values.value = metricsData.churnRate.map(entry => entry.valor);
  }
};

updateChartData();

const chartData = ref({
  labels: dates,
  datasets: [
    {
      label: state,
      borderColor: '#008000', 
      backgroundColor: '#008000',
      data: values,
      fill: false,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      time: {
        unit: 'months',
      },
      title: {
        display: true,
        text: 'Data',
      },
    },
    y: {
      title: {
        display: true,
        text: state,
      },
    },
  },
});

const handleClick = (metrica) => {
  state.value = metrica;
  updateChartData();
};
</script>
<template>
  <div class="w-full flex justify-center flex-col items-center">
    <div class="w-[64vw] flex justify-end gap-5">
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Gráfico
            <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Line</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Bar</a>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Métricas
            <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']" @click="handleClick('MRR')">MRR</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']" @click="handleClick('Churn Rate')">Churn Rate</a>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
    <div class="w-[64vw] ">
      <div>
        <Line
          :data="chartData"
          :options="chartOptions"
          :style="{ height: '300px' }"
          :key="chartKey"
        />
      </div>
      <div>
        <Bar
          :data="chartData"
          :options="chartOptions"
          :style="{ height: '300px' }"
          :key="chartKey"
        />
      </div>
    </div>
  </div>
</template>
