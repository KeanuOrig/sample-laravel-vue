<template>
    <div class="max-w-4xl mx-auto mt-10 global-padding">
      <h1 class="text-2xl font-bold mb-4">Edit Product</h1>
      <div v-if="step === 1">
        <form @submit.prevent="nextStep">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" v-model="product.name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
          </div>
          <div class="mb-4">
            <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
            <input type="text" id="category" v-model="product.category" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" v-model="product.description" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>
          </div>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Next</button>
        </form>
      </div>
      <div v-else-if="step === 2">
        <form @submit.prevent="nextStep">
          <div class="mb-4 py-8">
            <label for="date_time" class="block text-sm font-medium text-gray-700">Date Time</label>
            <DatePicker
              id="date_time"
              v-model="product.date_time"
              :type="'datetime'"
              :placeholder="'Select Date Time'"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Next</button>
        </form>
      </div>
      <div v-else-if="step === 3">
        <form @submit.prevent="updateProduct" enctype="multipart/form-data">
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Images (To Follow next sprint)</label>
            <input type="file" ref="fileInput" multiple @change="handleFileUpload" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input">
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">JPG, JPEG</p>
          </div>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Edit Product</button>
        </form>
      </div>
    </div>
</template>
  
<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import DatePicker from 'vue3-datepicker';

    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const step = ref(1);


    const product = ref({
        id: '',
        name: '',
        category: '',
        description: '',
        date_time: ''
    });
  
    onMounted( async () => { 
        product.value.id = route.params.productId;
        const response = await store.dispatch('product/doGetById', {id: product.value.id} );
        product.value.name = response.name
        product.value.category = response.category
        product.value.description = response.description
        product.value.image = response.image_url
        product.value.date_time = null

    });

    const nextStep = () => {
        if (step.value === 1 && (!product.value.name || !product.value.category || !product.value.description)) {
            alert('Please fill in all fields.');
            return;
        }
        if (step.value === 2 && !product.value.date_time) {
            alert('Please select a date and time.');
            return;
        }
        step.value++;
    };

    const updateProduct = async () => {

        let date = new Date();
        console.log(product.value.date_time)
        let formattedDate = product.value.date_time.toISOString().slice(0, 19).replace('T', ' ');

        try {
            await store.dispatch('product/doUpdate', {
                id: product.value.id,
                name: product.value.name,
                category: product.value.category,
                description: product.value.description,
                date_time: formattedDate
            });
            router.push('/product-list');
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };  

</script>
  