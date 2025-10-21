import adapter from '@sveltejs/adapter-auto';

export default {
  kit: {
    adapter: adapter({
      out: 'build'
    }),
    experimental: {
      remoteFunctions: true
    }
  },
  compilerOptions: {
    experimental: {
      async: true
    }
  }
};
