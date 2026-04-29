import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = "Manchester Technology | Digital Agency", 
  description = "High-performance web and mobile applications engineered for growth.", 
  path = "", 
  schema,
  noindex = false,
  ogImage = "/og-image.jpg",
  ogType = "website"
}) {
  const domain = 'https://yourdomain.com';
  
  // Enforce canonical URL formatting (no trailing slash for sub-pages)
  const cleanPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
  
  // Canonical URLs intentionally strip query parameters to act as the source of truth
  const canonicalUrl = `${domain}${cleanPath.split('?')[0]}`;

  // 1. Organization Schema (Global Base)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Manchester Technology",
    "url": domain,
    "logo": `${domain}/logo.jpeg`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919036351517",
      "contactType": "customer service"
    }
  };

  // 2. Build final schema array combining Organization with page-specific schema
  // E.g., if page passes LocalBusiness or Service schema, it merges seamlessly.
  const structuredData = [organizationSchema];
  if (schema) {
    structuredData.push({ "@context": "https://schema.org", ...schema });
  }

  return (
    <Helmet>
      {/* Basic HTML Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Meta Robots Control */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph (Social SEO) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={`${domain}${ogImage}`} />
      <meta property="og:site_name" content="Manchester Technology" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${domain}${ogImage}`} />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData.length === 1 ? structuredData[0] : structuredData)}
      </script>
    </Helmet>
  );
}
