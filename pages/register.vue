<template>
  <v-container class="d-flex justify-center align-center" fluid>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-6" elevation="6">
          <v-card-title class="text-center">Tracker App</v-card-title>
          <v-card-text>
            <v-text-field
              label="First Name"
              v-model="firstName"
              outlined
            ></v-text-field>

            <v-text-field
              label="Last Name"
              v-model="lastName"
              outlined
            ></v-text-field>

            <v-text-field
              label="Email"
              v-model="email"
              outlined
              :error-messages="emailError"
            ></v-text-field>
            <v-text-field
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              outlined
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="togglePasswordVisibility"
              :error-messages="passwordError"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="d-flex flex-column justify-center">
            <v-btn block variant="outlined" @click="register">Sign Up</v-btn>
            <div>Already have an account? <a href="/login">Log In</a></div>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script setup>
import { useStorage } from "@vueuse/core"
import { ref } from "vue"

const email = ref("")
const password = ref("")
const emailError = ref("")
const passwordError = ref("")
const showPassword = ref(false)

const firstName = useStorage("firstName")
const lastName = useStorage("lastName")

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const validateInputs = () => {
  emailError.value = !email.value
    ? "Email is required"
    : !emailPattern.test(email.value)
    ? "Invalid email format"
    : ""

  passwordError.value = !password.value
    ? "Password is required"
    : password.value.length < 6
    ? "Password must be at least 6 characters"
    : ""

  return !emailError.value && !passwordError.value
}

const register = async () => {
  if (!validateInputs()) return

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      navigateTo("/login")
    } else {
      passwordError.value = data.message || "Registration failed"
    }
  } catch (error) {
    console.error("Registration error:", error)
    passwordError.value = "Server error. Please try again later."
  }
}
</script>

<style scoped>
.v-container {
  min-height: 100vh;
}
</style>
