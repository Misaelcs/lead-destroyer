<template>
	<router-view />
</template>

<script lang="ts">
export default {
    name: 'JusCash Teste',
    watch: {
        $route: {
            immediate: true,
            handler(to, from) {
                document.title = "JusCash - "+to.name;
            }
        },
    }
};
</script>