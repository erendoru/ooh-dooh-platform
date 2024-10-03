const nextConfig = {
    // ... diğer yapılandırmalar
    webpack: (config) => {
      config.externals.push({
        'leaflet': 'L',
      })
      return config
    },
  }