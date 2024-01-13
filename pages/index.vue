<template>
  <div class="w-full flex flex-col items-center justify-center">
    <div class="w-[63vw] m-5">
      <DropZone @drop.prevent="drop" @change="selectedFile" class="dropzone" />
      <ul role="list" v-if="dropzoneFile !== ''" class="divide-y divide-gray-100 rounded-lg my-[32px]">
        <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6 rounded-md bg-[#ffff3f]">
          <div class="flex w-0 flex-1 items-center">
            <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            <div class="ml-4 flex min-w-0 flex-1 gap-2">
              <span class="truncate font-medium">{{ dropzoneFile && dropzoneFile.name }}</span>
              <span class="flex-shrink-0 text-gray-400">{{dropzoneFile && dropzoneFile.size }} B</span>
            </div>
          </div>
          <div class="ml-4 flex-shrink-0">
            <button class="font-medium text-[#007f5f] hover:text-[#1e2f23]" @click="deleteFile">X</button>
          </div>
        </li>
      </ul>
      <div class="w-full flex justify-end">
        <fwb-button class="bg-[#007f5f] hover:bg-[#1e2f23] animation:100ms"  v-if="dropzoneFile !== ''" @click="uploadFile">Iniciar</fwb-button>
      </div>
    </div>      
  </div>
  <Modal></Modal>
</template>

<script setup>
  import DropZone from "@/components/DropZone.vue";
  import { ref } from "vue";
  import { FwbButton } from 'flowbite-vue'
  import { PaperClipIcon } from '@heroicons/vue/24/solid'
  import Modal from "@/components/Modal.vue";
  import { navigateTo } from "nuxt/app";

const metricsData = useMetrics();

// Execute os dois posts ao carregar a página
const uploadFile = async () => {
  try {
    const formData = new FormData();
    formData.append('file', dropzoneFile.value);

    const [mrrResponse, churnRateResponse] = await Promise.all([
      $fetch('http://localhost:3001/upload/mrr', {
        method: 'POST',
        body: formData
      }),
      $fetch('http://localhost:3001/upload/churn-rate', {
        method: 'POST',
        body: formData
      })
    ]);

    metricsData.setMrr(mrrResponse);
    metricsData.setChurnRate(churnRateResponse);

    navigateTo('/dashboard');

  } catch (error) {
    console.error('Erro ao enviar o arquivo:', error);
  }
}


  const { $anime } = useNuxtApp()
  let dropzoneFile = ref('')

  const handleClick = (e) => {
    const alturaViewport = window.innerHeight;

    if (e){
      $anime({ targets: '.dropzone', translateY: alturaViewport, duration: 800 })
    }
    classeDinamica = "block"
    $anime({ targets: '.dropzone', translateY: 0, duration: 800 })
  }

  const drop = (e) => {
    dropzoneFile.value = e.dataTransfer.files[0]; 
  };

  const selectedFile = () => {
    dropzoneFile.value = document.querySelector(".dropzoneFile").files[0];
  };

  const deleteFile = () => {
    dropzoneFile.value = '';
    document.querySelector(".dropzoneFile").files[0] = {};
  };
</script>

<style lang="scss" scoped>

</style>