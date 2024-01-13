const LazyImage = ({ src, alt }) => {
    return <img src={src} alt={alt} className="w-full h-64 object-cover" loading="lazy" />;
  };
  
  export default LazyImage;