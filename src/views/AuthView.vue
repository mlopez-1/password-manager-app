<script setup>
import AuthForm from '@/components/AuthForm.vue'
</script>

<template>
  <v-app>
    <v-main class="nature-bg">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark>
                <v-toolbar-title>
                  <v-icon left>mdi-lock</v-icon>
                  Password Manager
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <AuthForm />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.nature-bg {
  background: linear-gradient(
    rgba(255, 255, 255, 0.7), 
    rgba(255, 255, 255, 0.7)
  ),
  url('https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
}
</style>