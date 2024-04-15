<template>

    <form @submit.prevent="onSubmit" class="max-w-sm mx-auto global-padding">
        <h1 class="text-2xl font-bold mb-4">Login</h1>
        <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" id="email" v-model="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <div class="mb-5">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" id="password" v-model="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const store = useStore();
    const loading  = computed(() => store.getters['loading/isLoading']);
    // const loadingState = computed(() => store.state.loading);

    const onSubmit = async () => {
        try {
            const response = await store.dispatch('auth/doLogin', { email: email.value, password: password.value });

            router.push('/');
        } catch (error) {
            console.error('Login error:', error);
        } 
    }
</script>

<style scoped>

</style>