import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [{
  label: 'Home',
  icon: 'i-lucide-home',
  to: '/',
  colour: 'green-600'
}, {
  label: 'Services',
  icon: 'i-lucide-folder',
  to: '/services',
  colour: 'yellow-600'
}, {
  label: 'Blog',
  icon: 'i-lucide-file-text',
  to: '/blog',
  colour: 'cyan-600'
}, {
  label: 'Testimonials',
  icon: 'i-lucide-file-text',
  to: '/testimonials',
  colour: 'rose-600'
}, {
  label: 'About',
  icon: 'i-lucide-user',
  to: '/about',
  colour: 'indigo-600'
}]
