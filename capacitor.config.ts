import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.downoad.test',
  appName: 'downloadTest',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
