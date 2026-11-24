import { Language } from '../types/commerce';

export interface TranslationSchema {
  dir: 'rtl' | 'ltr';
  langName: string;
  announcement: {
    text: string;
    cta: string;
  };
  nav: {
    home: string;
    shop: string;
    categories: string;
    about: string;
    trackOrder: string;
    contact: string;
    wishlist: string;
    cart: string;
    admin: string;
    searchPlaceholder: string;
    searchButton: string;
    menu: string;
    close: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    editorialCaption: string;
  };
  home: {
    categoriesTitle: string;
    categoriesSubtitle: string;
    viewAllCategories: string;
    collectionTitle: string;
    collectionSubtitle: string;
    tabTrending: string;
    tabBestSellers: string;
    tabNewArrivals: string;
    viewAllProducts: string;
    campaignKicker: string;
    campaignTitle: string;
    campaignBody: string;
    campaignCta: string;
    campaignSecondaryCta: string;
    advantagesTitle: string;
    advantages: {
      title: string;
      description: string;
    }[];
    newsletterTitle: string;
    newsletterSubtitle: string;
    newsletterPlaceholder: string;
    newsletterButton: string;
    newsletterSuccess: string;
    newsletterInvalid: string;
  };
  product: {
    addToCart: string;
    addedToCart: string;
    outOfStock: string;
    lowStock: string;
    inStock: string;
    leftInStock: string;
    addToWishlist: string;
    removeFromWishlist: string;
    selectColor: string;
    selectSize: string;
    quantity: string;
    material: string;
    sku: string;
    rating: string;
    reviews: string;
    description: string;
    shippingNote: string;
    relatedProducts: string;
    backToShop: string;
    notFoundTitle: string;
    notFoundBody: string;
    quickView: string;
  };
  shop: {
    title: string;
    subtitle: string;
    allCategories: string;
    searchLabel: string;
    searchPlaceholder: string;
    sortLabel: string;
    sortFeatured: string;
    sortNewest: string;
    sortPopular: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    resultsCount: string;
    clearFilters: string;
    noResultsTitle: string;
    noResultsBody: string;
  };
  categoriesPage: {
    title: string;
    subtitle: string;
    exploreCategory: string;
    itemsAvailable: string;
  };
  wishlistPage: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyBody: string;
    browseShop: string;
    moveToCart: string;
    remove: string;
  };
  cart: {
    title: string;
    drawerTitle: string;
    subtitle: string;
    emptyTitle: string;
    emptyBody: string;
    continueShopping: string;
    subtotal: string;
    shipping: string;
    freeShipping: string;
    freeShippingProgress: string;
    freeShippingUnlocked: string;
    total: string;
    checkoutButton: string;
    viewCartButton: string;
    remove: string;
    colorLabel: string;
    sizeLabel: string;
  };
  checkout: {
    title: string;
    subtitle: string;
    demoNotice: string;
    customerSection: string;
    fullName: string;
    fullNamePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    city: string;
    cityPlaceholder: string;
    address: string;
    addressPlaceholder: string;
    notes: string;
    notesPlaceholder: string;
    paymentSection: string;
    codTitle: string;
    codDesc: string;
    bankTitle: string;
    bankDesc: string;
    bankDetails: string;
    orderSummary: string;
    placeOrder: string;
    processing: string;
    errors: {
      nameRequired: string;
      phoneInvalid: string;
      cityRequired: string;
      addressRequired: string;
      emptyCart: string;
    };
    confirmation: {
      kicker: string;
      title: string;
      subtitle: string;
      orderNumberLabel: string;
      estimatedDeliveryLabel: string;
      paymentMethodLabel: string;
      trackOrderCta: string;
      continueShoppingCta: string;
      demoDisclaimer: string;
    };
    cities: string[];
  };
  tracking: {
    title: string;
    subtitle: string;
    inputLabel: string;
    inputPlaceholder: string;
    searchCta: string;
    sampleOrdersLabel: string;
    notFoundTitle: string;
    notFoundBody: string;
    orderDate: string;
    estimatedDelivery: string;
    destination: string;
    itemsTitle: string;
    steps: {
      pending: string;
      confirmed: string;
      preparing: string;
      shipped: string;
      delivered: string;
      cancelled: string;
    };
  };
  about: {
    kicker: string;
    title: string;
    lead: string;
    storyTitle: string;
    storyBody1: string;
    storyBody2: string;
    studioBadge: string;
    pillarsTitle: string;
    pillars: {
      title: string;
      body: string;
    }[];
    metrics: {
      value: string;
      label: string;
    }[];
  };
  contact: {
    title: string;
    subtitle: string;
    infoTitle: string;
    showroomLabel: string;
    showroomValue: string;
    hoursLabel: string;
    hoursValue: string;
    emailLabel: string;
    phoneLabel: string;
    formTitle: string;
    nameLabel: string;
    emailFieldLabel: string;
    subjectLabel: string;
    messageLabel: string;
    submitCta: string;
    successMessage: string;
    validationError: string;
  };
  footer: {
    brandDesc: string;
    shopHeading: string;
    studioHeading: string;
    careHeading: string;
    currencyLabel: string;
    rights: string;
    credit: string;
  };
  admin: {
    demoBanner: string;
    loginTitle: string;
    loginSubtitle: string;
    emailLabel: string;
    passwordLabel: string;
    loginButton: string;
    demoFillButton: string;
    loginError: string;
    backToStore: string;
    logout: string;
    nav: {
      overview: string;
      products: string;
      inventory: string;
      orders: string;
      customers: string;
      reports: string;
      settings: string;
    };
    kpi: {
      totalRevenue: string;
      totalOrders: string;
      totalProducts: string;
      lowStockAlerts: string;
    };
    overview: {
      recentOrders: string;
      categoryBreakdown: string;
      orderNumber: string;
      customer: string;
      date: string;
      total: string;
      status: string;
    };
    productsTab: {
      title: string;
      addProduct: string;
      editProduct: string;
      deleteConfirm: string;
      saveProduct: string;
      cancel: string;
      nameEn: string;
      nameCkb: string;
      nameAr: string;
      descEn: string;
      descCkb: string;
      descAr: string;
      category: string;
      priceIqd: string;
      stock: string;
      sku: string;
      imageAsset: string;
      actions: string;
      edit: string;
      delete: string;
    };
    inventoryTab: {
      title: string;
      subtitle: string;
      adjustStock: string;
      status: string;
    };
    ordersTab: {
      title: string;
      subtitle: string;
      updateStatus: string;
      payment: string;
      city: string;
    };
    customersTab: {
      title: string;
      subtitle: string;
      name: string;
      phone: string;
      city: string;
      ordersCount: string;
      totalSpent: string;
    };
    reportsTab: {
      title: string;
      subtitle: string;
      avgOrderValue: string;
      deliveredOrders: string;
      codShare: string;
      topProducts: string;
      unitsSold: string;
      revenue: string;
    };
    settingsTab: {
      title: string;
      subtitle: string;
      storeName: string;
      supportEmail: string;
      supportPhone: string;
      freeShippingThreshold: string;
      standardShipping: string;
      showAnnouncement: string;
      saveSettings: string;
      savedMessage: string;
      resetDemoData: string;
      resetDone: string;
    };
  };
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  ckb: {
    dir: 'rtl',
    langName: 'کوردی',
    announcement: {
      text: 'گەیاندنی بێبەرامبەر بۆ داواکارییەکانی سەروو ٢٥٠,٠٠٠ د.ع لە سەرانسەری عێراق و هەرێمی کوردستان',
      cta: 'بازاڕکردن',
    },
    nav: {
      home: 'سەرەکی',
      shop: 'فرۆشگا',
      categories: 'پۆلەکان',
      about: 'دەربارەمان',
      trackOrder: 'شوێنکەوتنی داواکاری',
      contact: 'پەیوەندی',
      wishlist: 'دڵخوازەکان',
      cart: 'سەبەتە',
      admin: 'بەڕێوەبەر',
      searchPlaceholder: 'بگەڕێ بۆ کاڵا، پۆل یان کۆد...',
      searchButton: 'گەڕان',
      menu: 'پێڕست',
      close: 'داخستن',
    },
    hero: {
      kicker: 'کۆمەڵەی نوێی ٢٠٢٦ · ستۆدیۆی باسلون',
      title: 'دیزاینی کەمێنە و کوالێتی نێودەوڵەتی بۆ ژیانی ڕۆژانە',
      subtitle:
        'کاڵای هەڵبژێردراو لە جلوبەرگ، ئەلیکترۆنیات، کەلوپەلی ماڵەوە و جوانکاری — بە هەستی ئارام و وردەکارییەکی بەرزەوە.',
      primaryCta: 'گەڕان لە فرۆشگا',
      secondaryCta: 'بینینی پۆلەکان',
      editorialCaption: 'پڕۆژەی سێیەمی فەرمی ستۆدیۆی داهێنەرانەی باسلون',
    },
    home: {
      categoriesTitle: 'پۆلە سەرەکییەکان',
      categoriesSubtitle: 'هەموو بەشە هەڵبژێردراوەکان بۆ شێوازێکی سادە و شاهانە',
      viewAllCategories: 'هەموو پۆلەکان',
      collectionTitle: 'بەرهەمە هەڵبژێردراوەکان',
      collectionSubtitle: 'کوالێتی بەرز، دیزاینی سەردەمیانە و نرخاندن بە دیناری عێراقی',
      tabTrending: 'باوترینەکان',
      tabBestSellers: 'پڕفرۆشترینەکان',
      tabNewArrivals: 'نوێترینەکان',
      viewAllProducts: 'بینینی هەموو بەرهەمەکان',
      campaignKicker: 'پێچانەوەی دیاری تایبەت',
      campaignTitle: 'هەر داواکارییەک وەک دیارییەکی ناوازە ئامادە دەکرێت',
      campaignBody:
        'سندووقی تایبەتی باسلون بە قوماش و کاغەزی ڕەسەن و پەیامی کەسی، ئامادەیە بۆ پێشکەشکردن بە ئازیزانتان لە هەموو شارەکان.',
      campaignCta: 'سەردانی فرۆشگا',
      campaignSecondaryCta: 'دەربارەی باسلون',
      advantagesTitle: 'تایبەتمەندییەکانی باسلون',
      advantages: [
        {
          title: 'سەرچاوەی ڕەسەن',
          description: 'هەموو بەرهەمەکان بە وردی پشکنینی کوالێتیان بۆ دەکرێت پێش ناردن.',
        },
        {
          title: 'گەیاندنی خێرا',
          description: 'گەیاندنی هاوڕۆژ لە هەولێر و ٢٤-٤٨ کاتژمێر بۆ هەموو پارێزگاکان.',
        },
        {
          title: 'پێچانەوەی شاهانە',
          description: 'پاکێجکردنی پارێزراو و شیک بە دیزاینی تایبەتی باسلون.',
        },
        {
          title: 'خزمەتگوزاری تایبەت',
          description: 'تیمی پاڵپشتی بە زمانی کوردی، عەرەبی و ئینگلیزی لە خزمەتتاندایە.',
        },
      ],
      newsletterTitle: 'بەشداربە لە هەواڵنامەی باسلون',
      newsletterSubtitle: 'یەکەم کەس بە کە ئاگاداری کۆمەڵە نوێکان و چاپی سنووردار دەبیت.',
      newsletterPlaceholder: 'ئیمەیڵەکەت بنووسە...',
      newsletterButton: 'بەشداریکردن',
      newsletterSuccess: 'سوپاس! ئیمەیڵەکەت بە سەرکەوتوویی تۆمارکرا.',
      newsletterInvalid: 'تکایە ناونیشانێکی ئیمەیڵی دروست بنووسە.',
    },
    product: {
      addToCart: 'زیادکردن بۆ سەبەتە',
      addedToCart: 'زیادکرا بۆ سەبەتە',
      outOfStock: 'لە کۆگادا نەماوە',
      lowStock: 'دانەی کەم ماوە',
      inStock: 'لە کۆگادا هەیە',
      leftInStock: 'دانە ماوە',
      addToWishlist: 'زیادکردن بۆ دڵخوازەکان',
      removeFromWishlist: 'لابردن لە دڵخوازەکان',
      selectColor: 'ڕەنگ هەڵبژێرە',
      selectSize: 'قەبارە هەڵبژێرە',
      quantity: 'بڕ',
      material: 'ماددە و دروستکردن',
      sku: 'کۆدی کاڵا',
      rating: 'هەڵسەنگاندن',
      reviews: 'هەڵسەنگاندن',
      description: 'وردەکاری بەرهەم',
      shippingNote: 'گەیاندن لە ٢٤ بۆ ٤٨ کاتژمێردا · پارەدان لە کاتی وەرگرتن بەردەستە',
      relatedProducts: 'بەرهەمە هاوشێوەکان',
      backToShop: 'گەڕانەوە بۆ فرۆشگا',
      notFoundTitle: 'بەرهەمەکە نەدۆزرایەوە',
      notFoundBody: 'ئەم کاڵایە نەماوە یان ناونیشانەکەی گۆڕدراوە.',
      quickView: 'بینینی وردەکاری',
    },
    shop: {
      title: 'هەموو بەرهەمەکان',
      subtitle: 'کۆمەڵەی تەواوی باسلون بە پێنج پۆلی سەرەکی',
      allCategories: 'هەمووی',
      searchLabel: 'گەڕان',
      searchPlaceholder: 'ناوی کاڵا یان کۆد بنووسە...',
      sortLabel: 'ڕیزکردن',
      sortFeatured: 'هەڵبژێردراو',
      sortNewest: 'نوێترین',
      sortPopular: 'باوترین',
      sortPriceAsc: 'نرخ: کەمترین بۆ زۆرترین',
      sortPriceDesc: 'نرخ: زۆرترین بۆ کەمترین',
      resultsCount: 'بەرهەم دۆزرایەوە',
      clearFilters: 'لابردنی فلتەرەکان',
      noResultsTitle: 'هیچ بەرهەمێک نەدۆزرایەوە',
      noResultsBody: 'وشەی گەڕان یان پۆلێکی تر تاقیبکەرەوە.',
    },
    categoriesPage: {
      title: 'پۆلەکانی فرۆشگا',
      subtitle: 'گەڕان بەدوای کاڵاکاندا بەپێی پۆلە سەرەکییەکان',
      exploreCategory: 'بینینی بەرهەمەکان',
      itemsAvailable: 'بەرهەم',
    },
    wishlistPage: {
      title: 'لیستی دڵخوازەکان',
      subtitle: 'ئەو بەرهەمانەی پاشەکەوتت کردوون بۆ کڕینی داهاتوو',
      emptyTitle: 'لیستی دڵخوازەکانت بەتاڵە',
      emptyBody: 'ئەو بەرهەمانەی سەرنجت ڕادەکێشن لێرە پاشەکەوتیان بکە.',
      browseShop: 'گەڕان لە فرۆشگا',
      moveToCart: 'گواستنەوە بۆ سەبەتە',
      remove: 'لابردن',
    },
    cart: {
      title: 'سەبەتەی کڕین',
      drawerTitle: 'سەبەتەکەت',
      subtitle: 'پێداچوونەوە بە کاڵا هەڵبژێردراوەکانت پێش تەواوکردنی داواکاری',
      emptyTitle: 'سەبەتەی کڕینەکەت بەتاڵە',
      emptyBody: 'هێشتا هیچ کاڵایەکت زیاد نەکردووە بۆ سەبەتەکەت.',
      continueShopping: 'بەردەوامبوون لە بازاڕکردن',
      subtotal: 'کۆی گشتی کاڵاکان',
      shipping: 'تێچووی گەیاندن',
      freeShipping: 'بێبەرامبەر',
      freeShippingProgress: 'بۆ گەیاندنی بێبەرامبەر ماوەتەوە:',
      freeShippingUnlocked: 'پیرۆزە! گەیاندنی بێبەرامبەرت بەدەستهێنا',
      total: 'کۆی گشتی کۆتایی',
      checkoutButton: 'تەواوکردنی کڕین',
      viewCartButton: 'بینینی سەبەتە',
      remove: 'سڕینەوە',
      colorLabel: 'ڕەنگ',
      sizeLabel: 'قەبارە',
    },
    checkout: {
      title: 'تەواوکردنی داواکاری',
      subtitle: 'زانیارییەکانی گەیاندن پڕبکەرەوە بۆ ناردنی داواکارییەکەت',
      demoNotice:
        'ئەمە قۆناغی تاقیکارییە (Demo Mode) — هیچ پارەیەکی ڕاستەقینە ڕاکێشانی بۆ ناکرێت هەتا پەیوەندی بە سیستەمی پارەدانەوە نەکرێت.',
      customerSection: 'زانیاری وەرگر',
      fullName: 'ناوی تەواو',
      fullNamePlaceholder: 'نموونە: کاروان ئەحمەد ڕەشید',
      phone: 'ژمارەی مۆبایل',
      phonePlaceholder: '0750 123 4567',
      city: 'شار / پارێزگا',
      cityPlaceholder: 'شار هەڵبژێرە',
      address: 'ناونیشانی تەواو',
      addressPlaceholder: 'گەڕەک، شەقام، نزیکترین خاڵی ناسراو',
      notes: 'تێبینی داواکاری (ئارەزوومەندانە)',
      notesPlaceholder: 'کاتی گونجاوی گەیاندن یان داواکاری پێچانەوە...',
      paymentSection: 'شێوازی پارەدان',
      codTitle: 'پارەدان لە کاتی وەرگرتن (Cash on Delivery)',
      codDesc: 'پارەکە بە نەقد بدە بە کارمەندی گەیاندن دوای پشکنینی کاڵاکە.',
      bankTitle: 'گواستنەوەی بانکی (بژاردەی تاقیکاری)',
      bankDesc: 'بۆ تاقیکردنەوەی دۆخی هەژماری بانکی لەم نموونە کارەدا.',
      bankDetails: 'زانیاری هەژماری تاقیکاری: بانکی کوردستان · IBAN: IQ00 BASL 0000 1234 5678',
      orderSummary: 'پوختەی داواکاری',
      placeOrder: 'ناردنی داواکاری',
      processing: 'تۆماردەکرێت...',
      errors: {
        nameRequired: 'تکایە ناوی تەواو بنووسە (لانیکەم ٣ پیت).',
        phoneInvalid: 'تکایە ژمارەی مۆبایلی عێراقی دروست بنووسە.',
        cityRequired: 'تکایە شار هەڵبژێرە.',
        addressRequired: 'تکایە ناونیشانی تەواو بنووسە.',
        emptyCart: 'سەبەتەکەت بەتاڵە.',
      },
      confirmation: {
        kicker: 'داواکاری تۆمارکرا',
        title: 'سوپاس بۆ متمانەت بە باسلون کۆمێرس',
        subtitle: 'داواکارییەکەت بە سەرکەوتوویی تۆمارکرا و لە ئامادەکاریدایە.',
        orderNumberLabel: 'ژمارەی داواکاری',
        estimatedDeliveryLabel: 'کاتی پێشبینیکراوی گەیاندن',
        paymentMethodLabel: 'شێوازی پارەدان',
        trackOrderCta: 'شوێنکەوتنی داواکاری',
        continueShoppingCta: 'گەڕانەوە بۆ فرۆشگا',
        demoDisclaimer: 'تێبینی: ئەمە داواکارییەکی تاقیکارییە لە بیرگەی وێبگەڕەکەتدا پاشەکەوتکراوە.',
      },
      cities: [
        'هەولێر',
        'سلێمانی',
        'دهۆک',
        'هەڵەبجە',
        'کەرکووک',
        'بەغداد',
        'بەسرە',
        'نەجەف',
        'کەربەلا',
        'نەینەوا (مووسڵ)',
      ],
    },
    tracking: {
      title: 'شوێنکەوتنی داواکاری',
      subtitle: 'ژمارەی داواکارییەکەت بنووسە بۆ بینینی دۆخی ئێستای بارەکەت',
      inputLabel: 'ژمارەی داواکاری',
      inputPlaceholder: 'نموونە: BSL-2026-1041',
      searchCta: 'پشکنین',
      sampleOrdersLabel: 'داواکارییە تاقیکارییە بەردەستەکان:',
      notFoundTitle: 'داواکاری نەدۆزرایەوە',
      notFoundBody: 'دڵنیابە لە دروستی ژمارەی داواکارییەکە و دووبارە هەوڵبدەرەوە.',
      orderDate: 'بەرواری داواکاری',
      estimatedDelivery: 'گەیاندنی پێشبینیکراو',
      destination: 'ناونیشانی گەیاندن',
      itemsTitle: 'کاڵاکانی ناو داواکاری',
      steps: {
        pending: 'وەرگیراوە',
        confirmed: 'پەسەندکراوە',
        preparing: 'ئامادەدەکرێت',
        shipped: 'نێردراوە',
        delivered: 'گەیشتووە',
        cancelled: 'هەڵوەشاوەتەوە',
      },
    },
    about: {
      kicker: 'ستۆدیۆی باسلون',
      title: 'کەمینەگەرایی شاهانە بە دیدگایەکی نێودەوڵەتی',
      lead: 'باسلون کۆمێرس سێیەمین پڕۆژەی فەرمی پۆرتفۆلیۆی ستۆدیۆی داهێنەرانەی باسلونە — ئەزموونێکی بازرگانی ئەلیکترۆنی مۆدێرن بە سێ زمان.',
      storyTitle: 'فەلسەفەی دیزاین و هەڵبژاردن',
      storyBody1:
        'ئێمە باوەڕمان بەوەیە بازاڕکردنی ئەلیکترۆنی دەبێت هەست بە ئارامی و ڕێزگرتن لە کاتی کڕیار ببەخشێت. دوور لە قەرەباڵغی و ڕیکلامی زیادە، هەموو کاڵایەک بەپێی ماددەی دروستکردن، تەمەندرێژی و جوانییەکی بێکات هەڵدەبژێردرێت.',
      storyBody2:
        'پلاتفۆرمەکە بە شێوەیەکی بنەڕەتی بۆ زمانی کوردی سۆرانی، عەرەبی و ئینگلیزی دروستکراوە تا هەموو بەشێک بە ڕاستگۆیی و ڕێکی ئاڕاستەی خوێندنەوە (RTL و LTR) پێشکەش بکات.',
      studioBadge: 'پڕۆژەی سێیەمی پۆرتفۆلیۆ · BASLUNE Creative Studio',
      pillarsTitle: 'بنەما سەرەکییەکانمان',
      pillars: [
        {
          title: 'سادەیی پێش هەموو شتێک',
          body: 'ڕووکارێکی خاوێن و بەتاڵ لە ئاڵۆزی بۆ تەرکیزکردنە سەر خودی بەرهەمەکان.',
        },
        {
          title: 'ئەندازیاری سێ-زمانی',
          body: 'تەواوی ناوەڕۆک، فۆرم و دۆخەکان بە وردی بۆ سۆرانی، عەرەبی و ئینگلیزی گونجێنراون.',
        },
        {
          title: 'ئامادە بۆ گەشەکردن',
          body: 'بونیادێکی مۆدیولار و خاوێن کە بە ئاسانی دەبەسترێتەوە بە هەر سیستمێکی باکئێند و پارەدانەوە.',
        },
      ],
      metrics: [
        { value: '٢٢+', label: 'بەرهەمی هەڵبژێردراو' },
        { value: '٣', label: 'زمانی تەواو (RTL/LTR)' },
        { value: '١٠', label: 'پارێزگای گەیاندن' },
        { value: '٢٤-٤٨ ک', label: 'کاتی گەیاندن' },
      ],
    },
    contact: {
      title: 'پەیوەندیمان پێوە بکە',
      subtitle: 'پرسیار، ڕاوێژ یان پێشنیارێکت هەیە؟ تیمی باسلون خۆشحاڵە بە بیستنت.',
      infoTitle: 'زانیاری ستۆدیۆ و فرۆشگا',
      showroomLabel: 'شوێن',
      showroomValue: 'شەقامی ئیمپایەر، هەولێر، هەرێمی کوردستان',
      hoursLabel: 'کاتی کارکردن',
      hoursValue: 'شەممە – پێنجشەممە · ٠٩:٠٠ تا ١٩:٠٠',
      emailLabel: 'ئیمەیڵ',
      phoneLabel: 'تەلەفۆن',
      formTitle: 'نامە بنێرە',
      nameLabel: 'ناوت',
      emailFieldLabel: 'ئیمەیڵ',
      subjectLabel: 'بابەت',
      messageLabel: 'نامەکەت',
      submitCta: 'ناردنی نامە',
      successMessage: 'سوپاس! نامەکەت بە سەرکەوتوویی وەرگیرا (ناردنی تاقیکاری).',
      validationError: 'تکایە هەموو خانە پێویستەکان بە دروستی پڕبکەرەوە.',
    },
    footer: {
      brandDesc:
        'پلاتفۆرمێکی بازرگانی ئەلیکترۆنی مۆدێرن و فرەزمان بۆ کاڵای هەڵبژێردراوی کوالێتی بەرز.',
      shopHeading: 'فرۆشگا',
      studioHeading: 'ستۆدیۆ',
      careHeading: 'خزمەتگوزاری کڕیار',
      currencyLabel: 'دراو: دیناری عێراقی (IQD)',
      rights: '© ٢٠٢٦ BASLUNE Commerce. هەموو مافەکان پارێزراون.',
      credit: 'دیزاین و گەشەپێدان لەلایەن BASLUNE Creative Studio',
    },
    admin: {
      demoBanner: 'دۆخی تاقیکاری (DEMO MODE) — داتاکان لە بیرگەی وێبگەڕدا پاشەکەوت دەکرێن',
      loginTitle: 'چوونەژوورەوەی پانێڵی بەڕێوەبەر',
      loginSubtitle: 'پانێڵی بەڕێوەبردنی فرۆشگا و کۆگا بۆ تاقیکردنەوە',
      emailLabel: 'ئیمەیڵی بەڕێوەبەر',
      passwordLabel: 'وشەی نهێنی',
      loginButton: 'چوونەژوورەوە',
      demoFillButton: 'پڕکردنەوەی زانیاری تاقیکاری',
      loginError: 'ئیمەیڵ یان وشەی نهێنی هەڵەیە. دوگمەی زانیاری تاقیکاری بەکاربهێنە.',
      backToStore: 'گەڕانەوە بۆ فرۆشگا',
      logout: 'چوونەدەرەوە',
      nav: {
        overview: 'کورتە و ئامار',
        products: 'بەرهەمەکان',
        inventory: 'کۆگا',
        orders: 'داواکارییەکان',
        customers: 'کڕیارەکان',
        reports: 'ڕاپۆرتی فرۆش',
        settings: 'ڕێکخستنەکان',
      },
      kpi: {
        totalRevenue: 'کۆی داهاتی تاقیکاری',
        totalOrders: 'کۆی داواکارییەکان',
        totalProducts: 'ژمارەی بەرهەمەکان',
        lowStockAlerts: 'ئاگاداری کەمبوونی کۆگا',
      },
      overview: {
        recentOrders: 'دوایین داواکارییەکان',
        categoryBreakdown: 'دابەشبوونی بەرهەم بەپێی پۆل',
        orderNumber: 'داواکاری',
        customer: 'کڕیار',
        date: 'بەروار',
        total: 'کۆی گشتی',
        status: 'دۆخ',
      },
      productsTab: {
        title: 'بەڕێوەبردنی بەرهەمەکان',
        addProduct: 'زیادکردنی بەرهەمی نوێ',
        editProduct: 'دەستکاریکردنی بەرهەم',
        deleteConfirm: 'دڵنیایت لە سڕینەوەی ئەم بەرهەمە؟',
        saveProduct: 'پاشەکەوتکردن',
        cancel: 'پاشگەزبوونەوە',
        nameEn: 'ناو (ئینگلیزی)',
        nameCkb: 'ناو (کوردی)',
        nameAr: 'ناو (عەرەبی)',
        descEn: 'کورتە باس (ئینگلیزی)',
        descCkb: 'کورتە باس (کوردی)',
        descAr: 'کورتە باس (عەرەبی)',
        category: 'پۆل',
        priceIqd: 'نرخ (IQD)',
        stock: 'بڕی کۆگا',
        sku: 'کۆدی SKU',
        imageAsset: 'وێنەی هەڵبژێردراو',
        actions: 'کردارەکان',
        edit: 'دەستکاری',
        delete: 'سڕینەوە',
      },
      inventoryTab: {
        title: 'بەڕێوەبردنی کۆگا',
        subtitle: 'دەستکاریکردنی ڕاستەوخۆی ژمارەی بەرهەمەکان لە کۆگادا',
        adjustStock: 'گۆڕینی بڕ',
        status: 'دۆخی کۆگا',
      },
      ordersTab: {
        title: 'بەڕێوەبردنی داواکارییەکان',
        subtitle: 'نوێکردنەوەی دۆخی ناردن و پێداچوونەوە بە وردەکارییەکان',
        updateStatus: 'گۆڕینی دۆخ',
        payment: 'پارەدان',
        city: 'شار',
      },
      customersTab: {
        title: 'لیستی کڕیارەکان',
        subtitle: 'کڕیارە تۆمارکراوەکان لە داواکارییە تاقیکارییەکانەوە',
        name: 'ناو',
        phone: 'مۆبایل',
        city: 'شار',
        ordersCount: 'داواکاری',
        totalSpent: 'کۆی خەرجی',
      },
      reportsTab: {
        title: 'ڕاپۆرتی فرۆش (تاقیکاری)',
        subtitle: 'پوختەی کارکردنی فرۆشگا بەپێی داتای ناوخۆیی',
        avgOrderValue: 'تێکڕای نرخی داواکاری',
        deliveredOrders: 'داواکارییە گەیەندراوەکان',
        codShare: 'ڕێژەی پارەدان لە کاتی وەرگرتن',
        topProducts: 'بەرهەمە سەرەکییەکان بەپێی داهات',
        unitsSold: 'بڕی فرۆشراو',
        revenue: 'داهات',
      },
      settingsTab: {
        title: 'ڕێکخستنە سەرەکییەکانی فرۆشگا',
        subtitle: 'ڕێکخستنی گەیاندن، شریتی ئاگاداری و زانیاری پەیوەندی',
        storeName: 'ناوی فرۆشگا',
        supportEmail: 'ئیمەیڵی پاڵپشتی',
        supportPhone: 'ژمارەی تەلەفۆن',
        freeShippingThreshold: 'سنووری گەیاندنی بێبەرامبەر (IQD)',
        standardShipping: 'کرێی گەیاندنی ئاسایی (IQD)',
        showAnnouncement: 'پیشاندانی شریتی ئاگاداری لە سەرەوە',
        saveSettings: 'پاشەکەوتکردنی ڕێکخستنەکان',
        savedMessage: 'ڕێکخستنەکان پاشەکەوتکران.',
        resetDemoData: 'گەڕاندنەوەی داتا بنەڕەتییەکان',
        resetDone: 'داتاکان گەڕێندرانەوە بۆ دۆخی سەرەتایی.',
      },
    },
  },

  ar: {
    dir: 'rtl',
    langName: 'العربية',
    announcement: {
      text: 'توصيل مجاني للطلبات فوق ٢٥٠,٠٠٠ د.ع إلى جميع محافظات العراق وإقليم كردستان',
      cta: 'تسوق الآن',
    },
    nav: {
      home: 'الرئيسية',
      shop: 'المتجر',
      categories: 'الأقسام',
      about: 'من نحن',
      trackOrder: 'تتبع الطلب',
      contact: 'تواصل معنا',
      wishlist: 'المفضلة',
      cart: 'السلة',
      admin: 'لوحة التحكم',
      searchPlaceholder: 'ابحث عن منتج، قسم أو رمز...',
      searchButton: 'بحث',
      menu: 'القائمة',
      close: 'إغلاق',
    },
    hero: {
      kicker: 'تشكيلة ٢٠٢٦ · استوديو باسلون',
      title: 'بساطة فاخرة وجودة عالمية لحياتك اليومية',
      subtitle:
        'مقتنيات منتقاة بعناية في الأزياء، الإلكترونيات، ديكور المنزل والعناية بالبشرة — بتصميم هادئ وتفاصيل استثنائية.',
      primaryCta: 'استكشف المتجر',
      secondaryCta: 'تصفح الأقسام',
      editorialCaption: 'المشروع الرسمي الثالث لاستوديو باسلون الإبداعي',
    },
    home: {
      categoriesTitle: 'الأقسام الرئيسية',
      categoriesSubtitle: 'تشكيلات متكاملة صُممت لأسلوب حياة راقٍ ومتوازن',
      viewAllCategories: 'جميع الأقسام',
      collectionTitle: 'مختارات باسلون',
      collectionSubtitle: 'خامات أصيلة، تصميم معاصر وأسعار واضحة بالدينار العراقي',
      tabTrending: 'الرائجة',
      tabBestSellers: 'الأكثر مبيعاً',
      tabNewArrivals: 'وصل حديثاً',
      viewAllProducts: 'عرض جميع المنتجات',
      campaignKicker: 'تغليف الهدايا الخاص',
      campaignTitle: 'كل طلب يُجهز كهدية فاخرة تليق بذوقك',
      campaignBody:
        'صناديق باسلون المميزة بشرائط الساتان وبطاقة إهداء خاصة، جاهزة للتسليم المباشر لأحبائك في جميع المدن.',
      campaignCta: 'تسوق الهدايا',
      campaignSecondaryCta: 'قصتنا',
      advantagesTitle: 'مزايا باسلون كوميرس',
      advantages: [
        {
          title: 'أصالة مضمونة',
          description: 'فحص دقيق للجودة والخامات قبل تغليف وشحن كل قطعة.',
        },
        {
          title: 'توصيل سريع',
          description: 'توصيل في نفس اليوم بأربيل و٢٤-٤٨ ساعة لجميع المحافظات.',
        },
        {
          title: 'تغليف فاخر',
          description: 'علب حماية أنيقة مصممة بعناية لتجربة فتح استثنائية.',
        },
        {
          title: 'خدمة عملاء مخصصة',
          description: 'دعم مباشر باللغات الكردية، العربية والإنجليزية.',
        },
      ],
      newsletterTitle: 'اشترك في نشرة باسلون',
      newsletterSubtitle: 'كن أول من يطلع على الإصدارات الجديدة والمجموعات الحصرية.',
      newsletterPlaceholder: 'أدخل بريدك الإلكتروني...',
      newsletterButton: 'اشتراك',
      newsletterSuccess: 'شكراً لك! تم تسجيل بريدك الإلكتروني بنجاح.',
      newsletterInvalid: 'يرجى إدخال بريد إلكتروني صحيح.',
    },
    product: {
      addToCart: 'إضافة إلى السلة',
      addedToCart: 'تمت الإضافة للسلة',
      outOfStock: 'نفد من المخزون',
      lowStock: 'كمية محدودة',
      inStock: 'متوفر في المخزون',
      leftInStock: 'قطعة متبقية',
      addToWishlist: 'إضافة للمفضلة',
      removeFromWishlist: 'إزالة من المفضلة',
      selectColor: 'اختر اللون',
      selectSize: 'اختر المقاس',
      quantity: 'الكمية',
      material: 'الخامة والتصنيع',
      sku: 'رمز المنتج',
      rating: 'التقييم',
      reviews: 'تقييمات',
      description: 'تفاصيل المنتج',
      shippingNote: 'التوصيل خلال ٢٤–٤٨ ساعة · الدفع عند الاستلام متاح',
      relatedProducts: 'منتجات قد تعجبك',
      backToShop: 'العودة للمتجر',
      notFoundTitle: 'المنتج غير موجود',
      notFoundBody: 'قد يكون هذا المنتج قد أزيل أو تغير رابطه.',
      quickView: 'عرض التفاصيل',
    },
    shop: {
      title: 'جميع المنتجات',
      subtitle: 'كتالوج باسلون الكامل عبر خمسة أقسام منتقاة',
      allCategories: 'الكل',
      searchLabel: 'بحث',
      searchPlaceholder: 'ابحث باسم المنتج أو الرمز...',
      sortLabel: 'الترتيب',
      sortFeatured: 'المميزة',
      sortNewest: 'الأحدث',
      sortPopular: 'الأكثر شعبية',
      sortPriceAsc: 'السعر: من الأقل إلى الأعلى',
      sortPriceDesc: 'السعر: من الأعلى إلى الأقل',
      resultsCount: 'منتج متاح',
      clearFilters: 'مسح الفلاتر',
      noResultsTitle: 'لم يتم العثور على منتجات',
      noResultsBody: 'جرب البحث بكلمات أخرى أو اختر قسماً مختلفاً.',
    },
    categoriesPage: {
      title: 'أقسام المتجر',
      subtitle: 'تصفح المجموعات حسب الفئة لاختيار ما يناسبك',
      exploreCategory: 'تصفح المنتجات',
      itemsAvailable: 'منتجات',
    },
    wishlistPage: {
      title: 'قائمة المفضلة',
      subtitle: 'القطع التي قمت بحفظها للعودة إليها لاحقاً',
      emptyTitle: 'قائمة المفضلة فارغة',
      emptyBody: 'احفظ منتجاتك المفضلة هنا لسهولة الوصول إليها لاحقاً.',
      browseShop: 'تصفح المتجر',
      moveToCart: 'نقل إلى السلة',
      remove: 'إزالة',
    },
    cart: {
      title: 'سلة التسوق',
      drawerTitle: 'سلتك',
      subtitle: 'راجع القطع المختارة قبل إتمام الطلب',
      emptyTitle: 'سلة التسوق فارغة',
      emptyBody: 'لم تقم بإضافة أي منتجات إلى سلتك بعد.',
      continueShopping: 'متابعة التسوق',
      subtotal: 'المجموع الفرعي',
      shipping: 'رسوم التوصيل',
      freeShipping: 'مجاني',
      freeShippingProgress: 'أضف للتوصيل المجاني:',
      freeShippingUnlocked: 'مؤهل للتوصيل المجاني!',
      total: 'الإجمالي النهائي',
      checkoutButton: 'إتمام الطلب',
      viewCartButton: 'عرض السلة',
      remove: 'حذف',
      colorLabel: 'اللون',
      sizeLabel: 'المقاس',
    },
    checkout: {
      title: 'إتمام الطلب',
      subtitle: 'أدخل بيانات التوصيل لتأكيد طلبك',
      demoNotice:
        'وضع العرض التجريبي (Demo Mode) — لا تتم معالجة أي مدفوعات حقيقية حتى يتم ربط بوابة دفع وخادم خلفي.',
      customerSection: 'بيانات المستلم',
      fullName: 'الاسم الكامل',
      fullNamePlaceholder: 'مثال: زيد كريم الجاف',
      phone: 'رقم الهاتف',
      phonePlaceholder: '0750 123 4567',
      city: 'المدينة / المحافظة',
      cityPlaceholder: 'اختر المدينة',
      address: 'العنوان الكامل',
      addressPlaceholder: 'الحي، الشارع، أقرب نقطة دالة',
      notes: 'ملاحظات الطلب (اختياري)',
      notesPlaceholder: 'الوقت المفضل للتوصيل أو طلب تغليف هدية...',
      paymentSection: 'طريقة الدفع',
      codTitle: 'الدفع عند الاستلام (Cash on Delivery)',
      codDesc: 'ادفع نقداً لمندوب التوصيل عند استلام وفحص طلبك.',
      bankTitle: 'تحويل بنكي (خيار تجريبي)',
      bankDesc: 'خيار تجريبي لمعاينة إجراءات التحويل البنكي في النموذج.',
      bankDetails: 'بيانات الحساب التجريبي: مصرف إقليم كردستان · IBAN: IQ00 BASL 0000 1234 5678',
      orderSummary: 'ملخص الطلب',
      placeOrder: 'تأكيد الطلب',
      processing: 'جاري تسجيل الطلب...',
      errors: {
        nameRequired: 'يرجى إدخال الاسم الكامل (٣ أحرف على الأقل).',
        phoneInvalid: 'يرجى إدخال رقم هاتف عراقي صحيح.',
        cityRequired: 'يرجى اختيار المدينة.',
        addressRequired: 'يرجى إدخال العنوان التفصيلي.',
        emptyCart: 'سلة التسوق فارغة.',
      },
      confirmation: {
        kicker: 'تم تأكيد الطلب',
        title: 'شكراً لتسوقك من باسلون كوميرس',
        subtitle: 'تم تسجيل طلبك بنجاح وهو الآن قيد المراجعة والتجهيز.',
        orderNumberLabel: 'رقم الطلب',
        estimatedDeliveryLabel: 'موعد التوصيل المتوقع',
        paymentMethodLabel: 'طريقة الدفع',
        trackOrderCta: 'تتبع الطلب',
        continueShoppingCta: 'العودة للمتجر',
        demoDisclaimer: 'ملاحظة: هذا طلب تجريبي محفوظ محلياً في متصفحك فقط.',
      },
      cities: [
        'أربيل',
        'السليمانية',
        'دهوك',
        'حلبجة',
        'كركوك',
        'بغداد',
        'البصرة',
        'النجف',
        'كربلاء',
        'نينوى (الموصل)',
      ],
    },
    tracking: {
      title: 'تتبع الطلب',
      subtitle: 'أدخل رقم طلبك للاطلاع على حالة الشحنة الحالية',
      inputLabel: 'رقم الطلب',
      inputPlaceholder: 'مثال: BSL-2026-1041',
      searchCta: 'بحث',
      sampleOrdersLabel: 'أرقام طلبات تجريبية للمعاينة:',
      notFoundTitle: 'لم يتم العثور على الطلب',
      notFoundBody: 'تأكد من صحة رقم الطلب وحاول مجدداً.',
      orderDate: 'تاريخ الطلب',
      estimatedDelivery: 'التوصيل المتوقع',
      destination: 'وجهة التوصيل',
      itemsTitle: 'المنتجات المشمولة',
      steps: {
        pending: 'تم الاستلام',
        confirmed: 'تم التأكيد',
        preparing: 'قيد التجهيز',
        shipped: 'تم الشحن',
        delivered: 'تم التسليم',
        cancelled: 'ملغي',
      },
    },
    about: {
      kicker: 'استوديو باسلون الإبداعي',
      title: 'بساطة فاخرة بمعايير التجارة العالمية',
      lead: 'باسلون كوميرس هو المشروع الرسمي الثالث ضمن محفظة أعمال استوديو باسلون الإبداعي — منصة تجارة إلكترونية ثلاثية اللغات.',
      storyTitle: 'فلسفة التصميم والانتقاء',
      storyBody1:
        'نؤمن بأن التسوق الإلكتروني يجب أن يمنح شعوراً بالهدوء والوضوح. بعيداً عن الفوضى البصرية، نختار كل قطعة استناداً إلى جودة خاماتها، استدامتها وجمالها العملي.',
      storyBody2:
        'صُممت المنصة لتدعم الكردية السورانية، العربية والإنجليزية بشكل كامل مع مراعاة دقيقة لاتجاه القراءة والخطوط في كل شاشة.',
      studioBadge: 'المشروع الثالث · BASLUNE Creative Studio',
      pillarsTitle: 'ركائزنا الأساسية',
      pillars: [
        {
          title: 'الوضوح أولاً',
          body: 'واجهة هادئة خالية من المشتتات تضع المنتج وتفاصيله في الصدارة.',
        },
        {
          title: 'هندسة متعددة اللغات',
          body: 'ترجمة كاملة ومضبوطة لثلاث لغات مع دعم RTL وLTR سلس.',
        },
        {
          title: 'جاهزية للتوسع',
          body: 'بنية برمجية نظيفة قابلة للربط الفوري مع قواعد البيانات وبوابات الدفع.',
        },
      ],
      metrics: [
        { value: '٢٢+', label: 'منتجاً منتقى' },
        { value: '٣', label: 'لغات متكاملة' },
        { value: '١٠', label: 'مدن توصيل' },
        { value: '٢٤-٤٨ س', label: 'سرعة التوصيل' },
      ],
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'يسعد فريق باسلون بالرد على استفساراتكم وطلباتكم الخاصة.',
      infoTitle: 'معلومات الاستوديو والمتجر',
      showroomLabel: 'العنوان',
      showroomValue: 'شارع إمباير، أربيل، إقليم كردستان',
      hoursLabel: 'ساعات العمل',
      hoursValue: 'السبت – الخميس · ٠٩:٠٠ صباحاً – ٠٧:٠٠ مساءً',
      emailLabel: 'البريد الإلكتروني',
      phoneLabel: 'الهاتف',
      formTitle: 'أرسل رسالة',
      nameLabel: 'الاسم',
      emailFieldLabel: 'البريد الإلكتروني',
      subjectLabel: 'الموضوع',
      messageLabel: 'الرسالة',
      submitCta: 'إرسال الرسالة',
      successMessage: 'شكراً لتواصلك! تم استلام رسالتك (نموذج تجريبي).',
      validationError: 'يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح.',
    },
    footer: {
      brandDesc: 'منصة تجارة إلكترونية فاخرة ومتعددة اللغات تقدم مقتنيات مختارة بعناية.',
      shopHeading: 'المتجر',
      studioHeading: 'الاستوديو',
      careHeading: 'خدمة العملاء',
      currencyLabel: 'العملة: الدينار العراقي (IQD)',
      rights: '© ٢٠٢٦ BASLUNE Commerce. جميع الحقوق محفوظة.',
      credit: 'تصميم وتطوير: BASLUNE Creative Studio',
    },
    admin: {
      demoBanner: 'وضع العرض التجريبي (DEMO MODE) — البيانات محفوظة محلياً في المتصفح فقط',
      loginTitle: 'دخول لوحة تحكم الإدارة',
      loginSubtitle: 'إدارة المنتجات، المخزون، الطلبات وإحصائيات المتجر التجريبية',
      emailLabel: 'البريد الإلكتروني',
      passwordLabel: 'كلمة المرور',
      loginButton: 'تسجيل الدخول',
      demoFillButton: 'تعبئة بيانات الدخول التجريبية',
      loginError: 'بيانات الدخول غير صحيحة. استخدم زر التعبئة التجريبية.',
      backToStore: 'العودة إلى المتجر',
      logout: 'تسجيل الخروج',
      nav: {
        overview: 'نظرة عامة',
        products: 'المنتجات',
        inventory: 'المخزون',
        orders: 'الطلبات',
        customers: 'العملاء',
        reports: 'تقارير المبيعات',
        settings: 'الإعدادات',
      },
      kpi: {
        totalRevenue: 'إجمالي الإيرادات التجريبية',
        totalOrders: 'إجمالي الطلبات',
        totalProducts: 'إجمالي المنتجات',
        lowStockAlerts: 'تنبيهات انخفاض المخزون',
      },
      overview: {
        recentOrders: 'أحدث الطلبات',
        categoryBreakdown: 'توزيع المنتجات حسب القسم',
        orderNumber: 'الطلب',
        customer: 'العميل',
        date: 'التاريخ',
        total: 'الإجمالي',
        status: 'الحالة',
      },
      productsTab: {
        title: 'إدارة المنتجات',
        addProduct: 'إضافة منتج جديد',
        editProduct: 'تعديل المنتج',
        deleteConfirm: 'هل أنت متأكد من حذف هذا المنتج؟',
        saveProduct: 'حفظ المنتج',
        cancel: 'إلغاء',
        nameEn: 'الاسم (إنجليزي)',
        nameCkb: 'الاسم (كردي)',
        nameAr: 'الاسم (عربي)',
        descEn: 'وصف مختصر (إنجليزي)',
        descCkb: 'وصف مختصر (كردي)',
        descAr: 'وصف مختصر (عربي)',
        category: 'القسم',
        priceIqd: 'السعر (IQD)',
        stock: 'الكمية بالمخزون',
        sku: 'رمز SKU',
        imageAsset: 'الصورة المختارة',
        actions: 'إجراءات',
        edit: 'تعديل',
        delete: 'حذف',
      },
      inventoryTab: {
        title: 'إدارة المخزون',
        subtitle: 'تحديث كميات المنتجات مباشرة في الكتالوج',
        adjustStock: 'تعديل الكمية',
        status: 'حالة المخزون',
      },
      ordersTab: {
        title: 'إدارة الطلبات',
        subtitle: 'تحديث حالة الشحن ومراجعة تفاصيل الطلبات',
        updateStatus: 'تحديث الحالة',
        payment: 'الدفع',
        city: 'المدينة',
      },
      customersTab: {
        title: 'قائمة العملاء',
        subtitle: 'ملخص العملاء المستخرج من الطلبات المسجلة',
        name: 'الاسم',
        phone: 'الهاتف',
        city: 'المدينة',
        ordersCount: 'الطلبات',
        totalSpent: 'إجمالي الإنفاق',
      },
      reportsTab: {
        title: 'تقارير المبيعات (تجريبي)',
        subtitle: 'ملخص الأداء بناءً على الطلبات التجريبية المحلية',
        avgOrderValue: 'متوسط قيمة الطلب',
        deliveredOrders: 'الطلبات المكتملة',
        codShare: 'نسبة الدفع عند الاستلام',
        topProducts: 'أعلى المنتجات إيراداً',
        unitsSold: 'القطع المباعة',
        revenue: 'الإيرادات',
      },
      settingsTab: {
        title: 'إعدادات المتجر الأساسية',
        subtitle: 'تعديل رسوم التوصيل، شريط الإعلان ومعلومات التواصل',
        storeName: 'اسم المتجر',
        supportEmail: 'بريد الدعم',
        supportPhone: 'هاتف الدعم',
        freeShippingThreshold: 'حد التوصيل المجاني (IQD)',
        standardShipping: 'رسوم التوصيل القياسية (IQD)',
        showAnnouncement: 'إظهار شريط الإعلان العلوي',
        saveSettings: 'حفظ الإعدادات',
        savedMessage: 'تم حفظ الإعدادات بنجاح.',
        resetDemoData: 'إعادة ضبط البيانات التجريبية',
        resetDone: 'تمت استعادة البيانات الافتراضية.',
      },
    },
  },

  en: {
    dir: 'ltr',
    langName: 'EN',
    announcement: {
      text: 'Complimentary delivery on orders over 250,000 IQD across Kurdistan & Iraq',
      cta: 'Shop Now',
    },
    nav: {
      home: 'Home',
      shop: 'Shop',
      categories: 'Categories',
      about: 'About',
      trackOrder: 'Track Order',
      contact: 'Contact',
      wishlist: 'Wishlist',
      cart: 'Cart',
      admin: 'Admin',
      searchPlaceholder: 'Search products, categories, or SKU...',
      searchButton: 'Search',
      menu: 'Menu',
      close: 'Close',
    },
    hero: {
      kicker: 'Autumn / Winter 2026 · BASLUNE Studio',
      title: 'Quiet luxury crafted for modern everyday living',
      subtitle:
        'A curated collection across tailored fashion, precision electronics, architectural interiors, and botanical skincare.',
      primaryCta: 'Explore Collection',
      secondaryCta: 'Browse Categories',
      editorialCaption: 'Third official portfolio release by BASLUNE Creative Studio',
    },
    home: {
      categoriesTitle: 'Curated Departments',
      categoriesSubtitle: 'Five distinct worlds united by restraint, material integrity, and permanence',
      viewAllCategories: 'All Categories',
      collectionTitle: 'The Edit',
      collectionSubtitle: 'Considered essentials priced transparently in Iraqi Dinar',
      tabTrending: 'Trending',
      tabBestSellers: 'Best Sellers',
      tabNewArrivals: 'New Arrivals',
      viewAllProducts: 'View All Products',
      campaignKicker: 'Signature Gift Atelier',
      campaignTitle: 'Every order arrives wrapped in our archival linen box',
      campaignBody:
        'Finished with woven champagne ribbon and a heavyweight cotton note card, tailored for effortless gifting across every city.',
      campaignCta: 'Shop Gift-Ready Pieces',
      campaignSecondaryCta: 'Our Studio Story',
      advantagesTitle: 'The BASLUNE Standard',
      advantages: [
        {
          title: 'Verified Provenance',
          description: 'Every piece undergoes material inspection prior to dispatch.',
        },
        {
          title: 'Express Dispatch',
          description: 'Same-day courier in Erbil and 24–48h delivery nationwide.',
        },
        {
          title: 'Archival Packaging',
          description: 'Signature rigid presentation boxes included with every order.',
        },
        {
          title: 'Trilingual Concierge',
          description: 'Dedicated client support in Sorani Kurdish, Arabic, and English.',
        },
      ],
      newsletterTitle: 'Join the BASLUNE Journal',
      newsletterSubtitle: 'Receive private invitations to seasonal drops and studio editions.',
      newsletterPlaceholder: 'Enter your email address...',
      newsletterButton: 'Subscribe',
      newsletterSuccess: 'Thank you. Your email has been registered.',
      newsletterInvalid: 'Please enter a valid email address.',
    },
    product: {
      addToCart: 'Add to Bag',
      addedToCart: 'Added to Bag',
      outOfStock: 'Out of Stock',
      lowStock: 'Low Stock',
      inStock: 'In Stock',
      leftInStock: 'left in stock',
      addToWishlist: 'Save to Wishlist',
      removeFromWishlist: 'Saved in Wishlist',
      selectColor: 'Color',
      selectSize: 'Size',
      quantity: 'Quantity',
      material: 'Materials & Craft',
      sku: 'SKU',
      rating: 'Rating',
      reviews: 'reviews',
      description: 'Product Details',
      shippingNote: '24–48h nationwide courier · Cash on Delivery available',
      relatedProducts: 'Complementary Pieces',
      backToShop: 'Back to Shop',
      notFoundTitle: 'Product Not Found',
      notFoundBody: 'This item is no longer available or the URL may be incorrect.',
      quickView: 'View Details',
    },
    shop: {
      title: 'All Products',
      subtitle: 'Complete BASLUNE catalog across five curated departments',
      allCategories: 'All',
      searchLabel: 'Search',
      searchPlaceholder: 'Search by product name or SKU...',
      sortLabel: 'Sort by',
      sortFeatured: 'Featured',
      sortNewest: 'Newest',
      sortPopular: 'Most Popular',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      resultsCount: 'pieces available',
      clearFilters: 'Clear Filters',
      noResultsTitle: 'No matching pieces found',
      noResultsBody: 'Try adjusting your search keywords or selecting another category.',
    },
    categoriesPage: {
      title: 'Departments',
      subtitle: 'Explore BASLUNE Commerce by curated category',
      exploreCategory: 'Explore Department',
      itemsAvailable: 'pieces',
    },
    wishlistPage: {
      title: 'Saved Wishlist',
      subtitle: 'Pieces curated for your next order',
      emptyTitle: 'Your wishlist is empty',
      emptyBody: 'Save pieces you admire while browsing to revisit them anytime.',
      browseShop: 'Explore Shop',
      moveToCart: 'Move to Bag',
      remove: 'Remove',
    },
    cart: {
      title: 'Shopping Bag',
      drawerTitle: 'Your Bag',
      subtitle: 'Review your selected pieces before proceeding to checkout',
      emptyTitle: 'Your shopping bag is empty',
      emptyBody: 'Explore the catalog to add curated essentials to your bag.',
      continueShopping: 'Continue Shopping',
      subtotal: 'Subtotal',
      shipping: 'Delivery',
      freeShipping: 'Complimentary',
      freeShippingProgress: 'Add for complimentary delivery:',
      freeShippingUnlocked: 'Complimentary delivery unlocked',
      total: 'Total',
      checkoutButton: 'Proceed to Checkout',
      viewCartButton: 'View Bag',
      remove: 'Remove',
      colorLabel: 'Color',
      sizeLabel: 'Size',
    },
    checkout: {
      title: 'Checkout',
      subtitle: 'Enter your delivery details to complete your demonstration order',
      demoNotice:
        'DEMO CHECKOUT — No real payments are processed. Orders are stored locally in your browser until a live backend and payment provider are connected.',
      customerSection: 'Recipient Information',
      fullName: 'Full Name',
      fullNamePlaceholder: 'e.g. Karwan Ahmed Rasheed',
      phone: 'Phone Number',
      phonePlaceholder: '0750 123 4567',
      city: 'City / Governorate',
      cityPlaceholder: 'Select city',
      address: 'Full Delivery Address',
      addressPlaceholder: 'District, street, building or nearest landmark',
      notes: 'Order Notes (Optional)',
      notesPlaceholder: 'Preferred delivery window or gift message...',
      paymentSection: 'Payment Method',
      codTitle: 'Cash on Delivery',
      codDesc: 'Pay in cash upon courier arrival and inspection.',
      bankTitle: 'Bank Transfer (Demo Option)',
      bankDesc: 'Simulated bank transfer option for demonstration workflows.',
      bankDetails: 'Demo Account: Kurdistan International Bank · IBAN: IQ00 BASL 0000 1234 5678',
      orderSummary: 'Order Summary',
      placeOrder: 'Place Demo Order',
      processing: 'Confirming order...',
      errors: {
        nameRequired: 'Please enter your full name (at least 3 characters).',
        phoneInvalid: 'Please enter a valid Iraqi phone number.',
        cityRequired: 'Please select a delivery city.',
        addressRequired: 'Please provide your full street address.',
        emptyCart: 'Your bag is empty.',
      },
      confirmation: {
        kicker: 'Order Confirmed',
        title: 'Thank you for shopping with BASLUNE Commerce',
        subtitle: 'Your demonstration order has been registered and queued for preparation.',
        orderNumberLabel: 'Order Reference',
        estimatedDeliveryLabel: 'Estimated Delivery',
        paymentMethodLabel: 'Payment Method',
        trackOrderCta: 'Track This Order',
        continueShoppingCta: 'Return to Storefront',
        demoDisclaimer: 'Note: This is a demonstration order saved locally in your browser.',
      },
      cities: [
        'Erbil',
        'Sulaymaniyah',
        'Duhok',
        'Halabja',
        'Kirkuk',
        'Baghdad',
        'Basra',
        'Najaf',
        'Karbala',
        'Nineveh (Mosul)',
      ],
    },
    tracking: {
      title: 'Order Tracking',
      subtitle: 'Enter your order reference to inspect real-time demo shipment progress',
      inputLabel: 'Order Reference',
      inputPlaceholder: 'e.g. BSL-2026-1041',
      searchCta: 'Track Order',
      sampleOrdersLabel: 'Sample demo references:',
      notFoundTitle: 'Order Not Found',
      notFoundBody: 'Please verify your order reference code and try again.',
      orderDate: 'Order Date',
      estimatedDelivery: 'Estimated Delivery',
      destination: 'Destination',
      itemsTitle: 'Order Items',
      steps: {
        pending: 'Received',
        confirmed: 'Confirmed',
        preparing: 'Preparing',
        shipped: 'Dispatched',
        delivered: 'Delivered',
        cancelled: 'Cancelled',
      },
    },
    about: {
      kicker: 'BASLUNE Creative Studio',
      title: 'Architectural restraint meets international digital retail',
      lead: 'BASLUNE Commerce is the third official portfolio project of BASLUNE Creative Studio — engineered as a benchmark trilingual storefront.',
      storyTitle: 'Editorial Philosophy',
      storyBody1:
        'Digital commerce should feel calm, tactile, and respectful of attention. Rather than overwhelming visitors with banners and clutter, every product is framed with gallery clarity and honest material specifications.',
      storyBody2:
        'Architected natively for Central Kurdish (Sorani), Arabic, and English, the platform adapts typography, directional rhythm, and spatial balance seamlessly across RTL and LTR.',
      studioBadge: 'Third Portfolio Release · BASLUNE Creative Studio',
      pillarsTitle: 'Studio Principles',
      pillars: [
        {
          title: 'Clarity Over Clutter',
          body: 'Disciplined typography and warm travertine neutrals place focus directly on craft.',
        },
        {
          title: 'Native Trilingualism',
          body: 'Complete RTL Sorani & Arabic paired with editorial LTR English throughout every flow.',
        },
        {
          title: 'Production Architecture',
          body: 'Modular TypeScript state ready for seamless API and payment gateway integration.',
        },
      ],
      metrics: [
        { value: '22+', label: 'Curated Products' },
        { value: '3', label: 'Complete Languages' },
        { value: '10', label: 'Delivery Cities' },
        { value: '24–48h', label: 'Courier Speed' },
      ],
    },
    contact: {
      title: 'Contact Atelier',
      subtitle: 'Have an inquiry regarding sizing, private orders, or studio collaborations? Reach our team below.',
      infoTitle: 'Studio & Showroom',
      showroomLabel: 'Address',
      showroomValue: 'Empire Boulevard, Erbil, Kurdistan Region',
      hoursLabel: 'Hours',
      hoursValue: 'Saturday – Thursday · 09:00 – 19:00',
      emailLabel: 'Email',
      phoneLabel: 'Telephone',
      formTitle: 'Send a Message',
      nameLabel: 'Your Name',
      emailFieldLabel: 'Email Address',
      subjectLabel: 'Subject',
      messageLabel: 'Message',
      submitCta: 'Send Message',
      successMessage: 'Thank you. Your inquiry has been recorded (demo form).',
      validationError: 'Please complete all required fields with valid information.',
    },
    footer: {
      brandDesc:
        'A luxury minimalist multilingual e-commerce platform presenting curated objects for modern living.',
      shopHeading: 'Storefront',
      studioHeading: 'Studio',
      careHeading: 'Client Services',
      currencyLabel: 'Currency: Iraqi Dinar (IQD)',
      rights: '© 2026 BASLUNE Commerce. All rights reserved.',
      credit: 'Created by BASLUNE Creative Studio',
    },
    admin: {
      demoBanner: 'DEMO MODE — Local browser persistence only; not connected to live production servers',
      loginTitle: 'Merchant Admin Portal',
      loginSubtitle: 'Demonstration storefront operations, catalog, inventory, and orders',
      emailLabel: 'Admin Email',
      passwordLabel: 'Password',
      loginButton: 'Sign In',
      demoFillButton: 'Fill Demo Credentials',
      loginError: 'Invalid credentials. Use the Fill Demo Credentials button to sign in.',
      backToStore: 'Back to Storefront',
      logout: 'Sign Out',
      nav: {
        overview: 'Overview',
        products: 'Products',
        inventory: 'Inventory',
        orders: 'Orders',
        customers: 'Customers',
        reports: 'Sales Reports',
        settings: 'Settings',
      },
      kpi: {
        totalRevenue: 'Demo Gross Revenue',
        totalOrders: 'Total Orders',
        totalProducts: 'Active Products',
        lowStockAlerts: 'Low Stock Alerts',
      },
      overview: {
        recentOrders: 'Recent Orders',
        categoryBreakdown: 'Catalog Distribution by Category',
        orderNumber: 'Order',
        customer: 'Customer',
        date: 'Date',
        total: 'Total',
        status: 'Status',
      },
      productsTab: {
        title: 'Product Catalog Management',
        addProduct: 'Add New Product',
        editProduct: 'Edit Product',
        deleteConfirm: 'Remove this product from the demo catalog?',
        saveProduct: 'Save Product',
        cancel: 'Cancel',
        nameEn: 'Name (English)',
        nameCkb: 'Name (Kurdish)',
        nameAr: 'Name (Arabic)',
        descEn: 'Short Description (English)',
        descCkb: 'Short Description (Kurdish)',
        descAr: 'Short Description (Arabic)',
        category: 'Category',
        priceIqd: 'Price (IQD)',
        stock: 'Stock Quantity',
        sku: 'SKU Code',
        imageAsset: 'Catalog Image Asset',
        actions: 'Actions',
        edit: 'Edit',
        delete: 'Delete',
      },
      inventoryTab: {
        title: 'Inventory Control',
        subtitle: 'Live stock adjustments synchronized with the storefront catalog',
        adjustStock: 'Stock Level',
        status: 'Status',
      },
      ordersTab: {
        title: 'Order Management',
        subtitle: 'Inspect customer orders and update fulfillment statuses',
        updateStatus: 'Fulfillment Status',
        payment: 'Payment',
        city: 'City',
      },
      customersTab: {
        title: 'Customer Directory',
        subtitle: 'Aggregated customer records derived from demonstration orders',
        name: 'Customer',
        phone: 'Phone',
        city: 'City',
        ordersCount: 'Orders',
        totalSpent: 'Total Spent',
      },
      reportsTab: {
        title: 'Sales Reports (Demo)',
        subtitle: 'Revenue and fulfillment analytics computed from local demo orders',
        avgOrderValue: 'Average Order Value',
        deliveredOrders: 'Delivered Orders',
        codShare: 'Cash on Delivery Share',
        topProducts: 'Top Products by Revenue',
        unitsSold: 'Units Sold',
        revenue: 'Revenue',
      },
      settingsTab: {
        title: 'Store Settings',
        subtitle: 'Configure shipping thresholds, announcement visibility, and contact details',
        storeName: 'Storefront Name',
        supportEmail: 'Support Email',
        supportPhone: 'Support Phone',
        freeShippingThreshold: 'Free Delivery Threshold (IQD)',
        standardShipping: 'Standard Delivery Fee (IQD)',
        showAnnouncement: 'Display Top Announcement Bar',
        saveSettings: 'Save Settings',
        savedMessage: 'Store settings updated.',
        resetDemoData: 'Reset Demo Data',
        resetDone: 'Catalog, orders, and settings restored to defaults.',
      },
    },
  },
};
