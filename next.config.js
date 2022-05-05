
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  plugins: {

  },
  images: {
		domains: ['cdn.sanity.io', "localhost"],
	}
}

module.exports = nextConfig
