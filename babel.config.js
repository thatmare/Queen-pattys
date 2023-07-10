export default function(api) {
    api.cache(true);
  
    const presets = [
      ['@babel/preset-env', { modules: false }],
      ['@babel/preset-react', { runtime: 'automatic' }],
      ['@babel/preset-typescript']
    ];
  
    return {
      presets,
    };
  }
  