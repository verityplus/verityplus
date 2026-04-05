export type Locale = 'id' | 'en' | 'zh'
export const SUPPORTED_LOCALES: Locale[] = ['id', 'en', 'zh']
export const DEFAULT_LOCALE: Locale = 'id'

export interface MessageSchema {
  nav: {
    home: string
    about: string
    contact: string
    advertise: string
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
    newsletter: string
    newsletterDesc: string
    emailPlaceholder: string
    subscribe: string
    subscribeSuccess: string
    copyright: string
    instagram: string
    tiktok: string
    email: string
  }
  common: {
    minRead: string
    readMore: string
    seeAll: string
    seeMore: string
    send: string
    email: string
    previous: string
    next: string
    backToHome: string
    all: string
    subscribe: string
    joinNow: string
    mostPopular: string
    featured: string
    custom: string
    contactUs: string
    monthly: string
    popular: string
    latest: string
    articles: string
    categories: string
    search: string
    noResults: string
    noResultsDesc: string
    noArticles: string
    noArticlesDesc: string
    noArticlesInCategory: string
    loading: string
    readArticle: string
    stop: string
    fontSizeIncrease: string
    fontSizeDecrease: string
    totalArticles: string
    articlesBy: string
    category: string
    categoryNotFound: string
    authorNotFound: string
    exploreArticles: string
    exploreArticlesDesc: string
    allArticles: string
    allArticlesDesc: string
    categoryDescFallback: string
    recommendedArticles: string
    popularCategories: string
    subscribeNewsletter: string
    subscribeNewsletterDesc: string
    clearSearch: string
    searchResults: string
    searchResultsFor: string
    searchPlaceholder: string
    searchPlaceholderExtended: string
    emailYour: string
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
    authorTitle: string
    authorDesc: string
    categoryTitle: string
    categoryDesc: string
    allArticlesTitle: string
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
    projectsCompleted: string
    yearsExperience: string
    coreValues: string
    innovationTitle: string
    innovationDesc: string
    collaborationTitle: string
    collaborationDesc: string
    integrityTitle: string
    integrityDesc: string
    quote: string
    teamAlt: string
  }
  contact: {
    heading: string
    title: string
    description: string
    mainOffice: string
    address: string
    phone: string
    messageSent: string
    firstName: string
    firstNamePlaceholder: string
    lastName: string
    lastNamePlaceholder: string
    message: string
    messagePlaceholder: string
    sendMessage: string
  }
  advertise: {
    heading: string
    title: string
    description: string
    mostPopularBadge: string
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
    stats: {
      monthlyViews: string
      activeUsers: string
      avgCTR: string
      subscribers: string
    }
    features: {
      bannerSidebar: string
      dedicatedPost: string
      socialMediaShoutout: string
      headerBanner: string
      sponsoredArticles: string
      socialMediaPost: string
      weeklyNewsletter: string
      allProfessionalFeatures: string
      fullPageBranding: string
      videoReview: string
    }
  }
  privacy: {
    heading: string
    lastUpdated: string
    question: string
    questionDesc: string
    sections: {
      intro: { title: string; content: string }
      infoCollected: { title: string; content: string; items: string[] }
      infoUsage: { title: string; content: string; items: string[] }
      dataSecurity: { title: string; content: string }
      yourRights: { title: string; content: string }
    }
  }
  terms: {
    heading: string
    welcome: string
    version: string
    question: string
    questionDesc: string
    contactLegal: string
    sections: {
      acceptance: { title: string; content: string }
      userAccount: { title: string; content: string; items: string[] }
      intellectualProperty: { title: string; content: string }
      liability: { title: string; quote: string }
      changes: { title: string; content: string }
    }
  }
  search: {
    heading: string
    showingResults: string
    noResults: string
    noResultsDesc: string
  }
  article: {
    minutesRead: string
    readMore: string
    recommended: string
    articlesBy: string
    authorSponsor: string
    categorySponsor: string
    exclusivePromo: string
    mainPromo: string
  }
  ads: {
    defaultLabel: string
    header: string
    middle: string
    footer: string
    sidebar: string
    authorSponsor: string
    categorySponsor: string
    exclusivePromo: string
    sidePromo: string
    mainPromo: string
    sponsor: string
  }
  topbar: {
    browse: string
    featured: string
    latest: string
    popular: string
    categories: string
    articlesCount: string
  }
  cookieConsent: {
    message: string
    accept: string
    decline: string
    learnMore: string
  }
  analytics: {
    heading: string
    totalVisits: string
    uniqueVisitors: string
    pageViews: string
    avgDuration: string
    topPages: string
    noData: string
    seconds: string
    viewAnalytics: string
    analyticsTitle: string
    analyticsDesc: string
    date: string
    visits: string
    topReferrers: string
    referrer: string
    count: string
    exportData: string
    clearData: string
    clearDataConfirm: string
  }
}
