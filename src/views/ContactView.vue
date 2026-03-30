<template>
  <section class="bg-white py-16 px-6 sm:py-24">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">

        <div>
          <h2 class="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-2">
            Hubungi Kami
          </h2>
          <h1 class="text-4xl font-extrabold text-gray-900 mb-6">
            Mari Mulai Sesuatu yang Luar Biasa
          </h1>
          <p class="text-lg text-gray-600 mb-10">
            Punya ide atau pertanyaan? Tim kami siap membantu Anda mewujudkan visi digital Anda. Kirimkan pesan dan kami
            akan membalas dalam 24 jam.
          </p>

          <div class="space-y-8">
            <div class="flex items-start gap-4">
              <div
                class="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-bold text-gray-900">Kantor Utama</h4>
                <p class="text-gray-600">Jl. Teknologi No. 42, Jakarta Selatan, Indonesia</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div
                class="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-bold text-gray-900">Email</h4>
                <p class="text-gray-600">halo@perusahaananda.com</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div
                class="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-bold text-gray-900">Telepon</h4>
                <p class="text-gray-600">+62 21 1234 5678</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nama Depan</label>
                <input type="text" placeholder="John"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nama Belakang</label>
                <input type="text" placeholder="Doe"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" placeholder="john@example.com"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
              <textarea rows="4" placeholder="Apa yang bisa kami bantu?"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"></textarea>
            </div>

            <button type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              Kirim Pesan
            </button>
          </form>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const handleSubmit = () => {
  alert('Pesan Anda telah terkirim (Ini hanya demo)');
};
</script>
