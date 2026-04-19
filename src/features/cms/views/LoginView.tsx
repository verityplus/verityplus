import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth.store'

/**
 * Login View: Authentication screen for CMS access.
 */
export default defineComponent({
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const username = ref('')
    const password = ref('')
    const error = ref('')

    const handleLogin = async () => {
      const success = await authStore.login(username.value, password.value)
      if (success) {
        router.push('/cms')
      } else {
        error.value = 'Invalid username or password'
      }
    }

    return () => (
      <div class="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-slate-800 mb-2">VERITY+ CMS</h1>
            <p class="text-slate-600">Sign in to access the administrative dashboard</p>
          </div>

          <form
            onSubmit={(e: Event) => {
              e.preventDefault()
              handleLogin()
            }}
            class="space-y-6"
          >
            <div>
              <label for="username" class="block text-sm font-medium text-slate-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username.value}
                onInput={(e) => username.value = (e.target as HTMLInputElement).value}
                class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password.value}
                onInput={(e) => password.value = (e.target as HTMLInputElement).value}
                class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            {error.value && <div class="text-red-600 text-sm text-center">{error.value}</div>}

            <button
              type="submit"
              class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  },
})
