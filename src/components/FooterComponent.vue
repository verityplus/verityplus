<template>
  <footer class="bg-gray-900 text-gray-300 pt-12 pb-6">
    <div class="container px-4 lg:px-48">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

        <div class="col-span-1 md:col-span-1">
          <div class="w-fit">
            <LogoDisplayComponent class="invert" />
          </div>
          <p class="text-sm mt-4 leading-relaxed">
            VERITY+ adalah media digital yang menghadirkan informasi sekaligus solusi bagi generasi muda.
          </p>
        </div>

        <div>
          <h3 class="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Perusahaan</h3>
          <ul class="space-y-2">
            <li>
              <RouterLink to="/about-us" class="hover:text-blue-400 transition-colors">Tentang Kami</RouterLink>
            </li>
            <li>
              <RouterLink to="/contact" class="hover:text-blue-400 transition-colors">Kontak</RouterLink>
            </li>
            <li>
              <RouterLink to="/advertise" class="hover:text-blue-400 transition-colors">Periklanan</RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Bantuan</h3>
          <ul class="space-y-2">
            <li>
              <RouterLink to="/privacy-policy" class="hover:text-blue-400 transition-colors">Kebijakan Privasi
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/terms-and-conditions" class="hover:text-blue-400 transition-colors">Syarat & Ketentuan
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Newsletter</h3>
          <p class="text-sm mb-4">Dapatkan update terbaru dari kami langsung di inbox Anda.</p>
          <form @submit.prevent="handleSubscribe" class="flex flex-col gap-2">
            <input v-model="email" type="email" placeholder="Email Anda"
              class="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              required />
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-all">
              Langganan
            </button>
          </form>
        </div>
      </div>

      <hr class="border-gray-800 mb-8" />

      <div class="flex flex-col md:row flex-wrap md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-gray-500">
          &copy; {{ currentYear }} VERITY+. Hak cipta dilindungi undang-undang.
        </p>

        <div class="flex space-x-6">
          <a href="https://instagram.com/verityplus" class="hover:text-white transition-colors">Instagram</a>
          <a href="https://tiktok.com/@verityplus" class="hover:text-white transition-colors">TikTok</a>
          <a href="mailto:contact@verityplus.space" class="hover:text-white transition-colors">Email</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import LogoDisplayComponent from './LogoDisplayComponent.vue';

const email = ref('');
const currentYear = computed(() => new Date().getFullYear());

const handleSubscribe = () => {
  alert(`Terima kasih telah mendaftar dengan email: ${email.value}`);
  email.value = '';
};
</script>
