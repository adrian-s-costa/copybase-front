<template>
  <div class="col-span-full w-full">
    <div 
      @dragenter.prevent="toggleActive"
      @dragleave.prevent="toggleActive"
      @dragover.prevent
      @drop.prevent="toggleActive"
      :class="{ 'active-dropzone': active }" 
      class="w-full h-72 sua-div mt-2 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 dropzone teste"
    >
      <div class="text-center">
        <DocumentIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
        <div class="mt-4 flex text-sm leading-6 text-gray-600">
          <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-[#007f5f] hover:text-[#1e2f23]">
            <span>Upload a file</span>
            <input id="file-upload" name="file-upload" type="file" class="sr-only dropzoneFile"/>
          </label>
          <p class="pl-1">or drag and drop</p>
        </div>
        <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { DocumentIcon } from '@heroicons/vue/24/solid'

  const active = ref(false);

  const toggleActive = () => {
    active.value = !active.value;
  };
</script>

<style>

</style>