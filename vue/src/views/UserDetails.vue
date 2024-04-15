<template>
    <form @submit.prevent="onSubmit" class="relative overflow-x-auto shadow-md sm:rounded-lg global-padding px-3 mx-auto global-padding">
      <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        <div class="font-bold">
          User Details
        </div>
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input type="email" v-model="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input type="text" v-model="name" name="floating_name" id="floating_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
      </div>
      <button type="submit" class="mx-auto block mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
    </form>
  </template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';

    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const name = ref(null);
    const email = ref(null);
    const userId = ref(null);

    onMounted( async () => { 
        userId.value = route.params.userId;
        const response = await store.dispatch('user/doGetById', {id: userId.value} );
       
        name.value = response.name
        email.value = response.email
    });

    const onSubmit = async () => {
        try {
            await store.dispatch('user/doUpdate', { id: userId.value, name: name.value, email: email.value } );
            router.push('/user-list');
        } catch (error) {
            console.error(error);
        } 
    }
</script>

<style scoped>

</style>
