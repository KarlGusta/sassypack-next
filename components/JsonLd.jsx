import { author, organization } from "@/data/author";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.jobTitle,
    description: author.bio,
    image: `https://sassypack.collabtower.com${author.image}`,
    url: author.url,
    sameAs: author.sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nanyuki",
      addressCountry: "KE",
    },
    worksFor: {
      "@type": "Organization",
      name: organization.name,
      url: organization.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organization.name,
    url: organization.url,
    logo: organization.logo,
    sameAs: organization.sameAs,
    founder: {
      "@type": "Person",
      name: author.name,
      url: author.url,
      sameAs: author.sameAs,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: author.email,
      contactType: "customer support",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArticleJsonLd({ post, url }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: author.name,
      url: author.url,
      sameAs: author.sameAs,
      image: `https://sassypack.collabtower.com${author.image}`,
    },
    publisher: {
      "@type": "Organization",
      name: organization.name,
      url: organization.url,
      logo: {
        "@type": "ImageObject",
        url: organization.logo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
