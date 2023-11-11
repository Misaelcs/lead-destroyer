<template>
	<LoginModalComponent @submit="$refs.Login.submitForm()">
		<LoginFormComponent ref="Login"></LoginFormComponent>
	</LoginModalComponent>
</template>


<route lang="yaml">
name: Cadastrar
</route>
