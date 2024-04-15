<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg global-padding">
        <div class="font-bold pl-4 pb-4 flex justify-between items-center">
            <span>Product List</span>
            <button @click="redirectToCreate" type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">ADD PRODUCT</button>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-16 py-3 flex justify-center items-center">
                        Image
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Product
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Category
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Description
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in productList" :key="product.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="p-4 flex justify-center items-center">
                        <img v-if="product.image_url && JSON.parse(product.image_url)[0]?.url" :src="JSON.parse(product.image_url)[0].url" class="w-8 h-8 md:w-16 h-16 object-cover" alt="Image">
                        <img v-else src="https://www.theyearinpictures.co.uk/images//image-placeholder.png" class="w-8 h-8 md:w-16 h-16 object-cover" alt="Placeholder">
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {{ product.name }}
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {{ product.category }}
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {{ product.description }}
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex">
                            <div class="mr-4">
                                <svg @click="redirectToUpdate(product.id)" class="w-6 h-6 text-blue-800 dark:text-blue" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M1 5h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 1 0 0-2H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2Zm18 4h-1.424a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2h10.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Zm0 6H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 0 0 0 2h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Z"/>
                                </svg>
                            </div>
                            <div>
                                <svg @click="showConfirmDeleteModal(product.id)" class="w-6 h-6 text-red-800 dark:text-red" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z"></path>
                                </svg>
                                <ConfirmDelete
                                    v-if="isConfirmDeleteModalVisible"
                                    :modalHeadline="'Delete Product'"
                                    :deleteMessage="'Are you sure?'"
                                    @deleteRecordEvent="deleteProduct(productId)"
                                    @close="closeConfirmDeleteModal"
                                />
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="flex flex-col items-center pb-2">
            <div class="inline-flex mt-2 xs:mt-0">
                <button v-if="page != 1" @click="prevPage(page)" class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Prev
                </button>
                <button v-if="page != last_page - 1" @click="nextPage(page)" class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import ConfirmDelete from '../components/ConfirmDelete.vue';
    
    const router = useRouter();
    const store = useStore();

    const productList = ref([]);
    const page = ref(1);
    const last_page = ref(0);
    const isConfirmDeleteModalVisible = ref(false);
    const productId = ref(null);

    onMounted( async () => { 
        const response = await store.dispatch('product/doGetAll', { page: 1 });
        console.log(response.data)
        productList.value = response.data;
        page.value = response.current_page
        last_page.value = response.last_page
    });

    const prevPage = async (current_page) => {
        try {
            const response = await store.dispatch('product/doGetAll', { page: current_page - 1 });
            productList.value = response.data;
            page.value = response.current_page
            last_page.value = response.last_page
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const nextPage = async (current_page) => {
        try {
            const response = await store.dispatch('product/doGetAll', { page: current_page + 1});
            productList.value = response.data;
            page.value = response.current_page
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const showConfirmDeleteModal = (id) => { 
        productId.value = id
        isConfirmDeleteModalVisible.value = true;
    };

    const closeConfirmDeleteModal = () => {
        isConfirmDeleteModalVisible.value = false;
    };

    const redirectToCreate = () => {
        router.push('/product-create');
    };

    const redirectToUpdate = (productId) => {
        router.push(`/product-update/${productId}`);
    };

    const deleteProduct = async (productId) => {
        const response = await store.dispatch('product/doDeleteProduct', productId);
        const updatedProductList = productList.value.filter(product => product.id !== productId);
        productList.value = updatedProductList;
        closeConfirmDeleteModal();
        router.push('/product-list');
    };
</script>
  
<style scoped>
/* Add custom styles here if needed */
</style>