export type Locale = 'id' | 'en' | 'zh'
export const SUPPORTED_LOCALES: Locale[] = ['id', 'en', 'zh']
export const DEFAULT_LOCALE: Locale = 'id'

export interface MessageSchema {
  nav: {
    home: string
  }
  footer: {
    description: string
    company: string
    about: string
    contact: string
    advertise: string
    help: string
    privacy: string
    terms: string
    copyright: string
    instagram: string
    tiktok: string
    email: string
    social: string
  }
  common: {
    locale: string
    skipToContent: string
    errorLoading: string
    retry: string
    minRead: string
    readMore: string
    seeAll: string
    seeMore: string
    email: string
    previous: string
    next: string
    all: string
    contactUs: string
    search: string
    noResults: string
    noArticles: string
    noArticlesDesc: string
    noArticlesInCategory: string
    loading: string
    readArticle: string
    stop: string
    fontSizeIncrease: string
    fontSizeDecrease: string
    totalArticles: string
    category: string
    exploreArticles: string
    exploreArticlesDesc: string
    allArticles: string
    allArticlesDesc: string
    categoryDescFallback: string
    popularCategories: string
    clearSearch: string
    searchPlaceholder: string
    phone: string
    homeTitle: string
    homeDesc: string
    aboutTitle: string
    aboutDesc: string
    contactTitle: string
    contactDesc: string
    advertiseTitle: string
    advertiseDesc: string
    privacyTitle: string
    privacyDesc: string
    termsTitle: string
    termsDesc: string
    searchTitle: string
    searchTitleQuery: string
    searchDesc: string
    mostPopular: string
    authorTitle: string
    authorDesc: string
    categoryTitle: string
    categoryDesc: string
    categoryDescFallback: string
    allArticlesTitle: string
    allArticlesDesc: string
    articleLoading: string
  }
  home: {
    latestArticles: string
    popularArticles: string
  }
  about: {
    whoWeAre: string
    heading: string
    description: string
    ourStory: string
    storyParagraph1: string
    storyParagraph2: string
    established: string
    missionVision: string
    purpose: string
    mission: string
    missionDesc: string
    vision: string
    visionDesc: string
    coreValues: string
    whatWeBelieve: string
    communityTitle: string
    communityDesc: string
    creativityTitle: string
    creativityDesc: string
    innovationTitle: string
    innovationDesc: string
    qualityTitle: string
    qualityDesc: string
    teamAlt: string
  }
  contact: {
    heading: string
    title: string
    description: string
    mainOffice: string
    address: string
    phone: string
  }
  advertise: {
    heading: string
    title: string
    description: string
    plans: {
      starter: {
        name: string
        subtitle: string
        cta: string
      }
      professional: {
        name: string
        subtitle: string
        cta: string
      }
      custom: {
        name: string
        subtitle: string
        cta: string
      }
    }
    features: {
      bannerSidebar3Days: string
      bannerSidebar9Days: string
      oneAdvertorialArticle: string
      threeAdvertorialArticles: string
      oneInstagramPost: string
      threeInstagramPosts: string
      oneTikTokPost: string
      threeTikTokPosts: string
      allProfessionalBenefits: string
      promotionalVideo: string
      customCampaign: string
      etCetera: string
    }
  }
  privacy: {
    heading: string
    lastUpdated: string
    intro: string
    contactHeading: string
    contactDesc: string
    contactButton: string
    sections: {
      infoCollected: {
        title: string
        content: string
        items: string[]
      }
      infoUsage: {
        title: string
        content: string
        items: string[]
      }
      cookies: {
        title: string
        content: string
        items: string[]
      }
      thirdParty: {
        title: string
        content: string
        items: string[]
      }
      dataRetention: {
        title: string
        content: string
      }
      yourRights: {
        title: string
        content: string
        items: string[]
      }
      childrenPrivacy: {
        title: string
        content: string
      }
      policyChanges: {
        title: string
        content: string
      }
    }
  }
  terms: {
    heading: string
    lastUpdated: string
    intro: string
    tocHeading: string
    contactHeading: string
    contactDesc: string
    contactButton: string
    sections: {
      acceptance: { title: string; content: string }
      contentUse: { title: string; content: string; items: string[] }
      userAccounts: { title: string; content: string; items: string[] }
      commenting: { title: string; content: string; items: string[] }
      advertising: { title: string; content: string }
      externalLinks: { title: string; content: string }
      copyright: { title: string; content: string; items: string[] }
      limitationLiability: { title: string; content: string }
      changes: { title: string; content: string }
    }
  }
  search: {
    heading: string
    showingResults: string
    noResults: string
    noResultsDesc: string
    enterQuery: string
  }
  article: {
    minutesRead: string
    recommended: string
    articlesBy: string
    mainPromo: string
  }
  ads: {
    defaultLabel: string
    header: string
    middle: string
    footer: string
    authorSponsor: string
    categorySponsor: string
    sidePromo: string
    exclusivePromo: string
    sponsor: string
  }
  topbar: {
    browse: string
    featured: string
    latest: string
    popular: string
    categories: string
  }
  cookieConsent: {
    message: string
    accept: string
    decline: string
    learnMore: string
  }
  notFound: {
    title: string
    message: string
    backHome: string
  }
}
