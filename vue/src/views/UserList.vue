<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg global-padding px-3">
        <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <div class="font-bold">
                User Maintenance
            </div>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="p-4">
                        ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Position
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in userList" :key="user.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="px-6 py-4">
                        {{ user.id }}
                    </td>
                    <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <img class="w-10 h-10 rounded-full" src="https://picsum.photos/200/300" alt="Jese image">
                        <div class="ps-3">
                            <div class="text-base font-semibold">{{ user.name }}</div>
                            <div class="font-normal text-gray-500">{{ user.email }}</div>
                        </div>  
                    </th>
                    <td class="px-6 py-4">
                        {{ user.role }}
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex items-center">
                            <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex">
                            <div class="mr-4">
                                <svg @click="showUserDetails(user.id)" class="w-6 h-6 text-blue-800 dark:text-blue" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M1 5h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 1 0 0-2H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2Zm18 4h-1.424a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2h10.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Zm0 6H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 0 0 0 2h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Z"/>
                                </svg>
                            </div>
                            <div>
                                <svg @click="showConfirmDeleteModal(user.id)" class="w-6 h-6 text-red-800 dark:text-red" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z"></path>
                                </svg>
                                <ConfirmDelete
                                    v-if="isConfirmDeleteModalVisible"
                                    :modalHeadline="'Delete User'"
                                    :deleteMessage="'Are you sure?'"
                                    @deleteRecordEvent="deleteUser(userId)"
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

    const isConfirmDeleteModalVisible = ref(false);
    const page = ref(1);
    const last_page = ref(0);
    const userList = ref([]);
    const userId = ref(null);

    onMounted( async () => { 
        const response = await store.dispatch('user/doGetAll', { page: 1 });
        userList.value = response.data;
        page.value = response.current_page
        last_page.value = response.last_page
    });
    
    const showConfirmDeleteModal = (id) => { 
    userId.value = id
    isConfirmDeleteModalVisible.value = true;
    };

    const closeConfirmDeleteModal = () => {
    isConfirmDeleteModalVisible.value = false;
    };

    const showUserDetails = (userId) => {
        router.push(`/user-list/${userId}`);
    };

    
    const deleteUser = async (userId) => {
        const response = await store.dispatch('user/doDeleteUser', userId);
        const updatedUserList = userList.value.filter(user => user.id !== userId);
        userList.value = updatedUserList;
        closeConfirmDeleteModal();
        router.push('/user-list');
    };
</script>

<style scoped>

</style>
